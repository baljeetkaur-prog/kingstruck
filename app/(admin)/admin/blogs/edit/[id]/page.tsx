"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useParams } from "next/navigation";

import slugify from "slugify";
import toast from "react-hot-toast";

import "../../blogs.css";

export default function EditBlogPage() {
  const params = useParams();

  const blogId = params.id;

  const [loading, setLoading] =
    useState(false);

  const [fetching, setFetching] =
    useState(true);

  const [title, setTitle] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [tags, setTags] =
    useState("");

  const [excerpt, setExcerpt] =
    useState("");

  const [author, setAuthor] =
    useState("Admin");

  const [image, setImage] =
    useState<File | null>(null);

const [existingImage, setExistingImage] =
  useState<any>(null);

  const imageRef =
    useRef<HTMLInputElement>(null);

  const editorRef =
    useRef<HTMLDivElement>(null);
    const [content, setContent] =
  useState("");
  

  /* =========================
     FETCH BLOG
  ========================= */
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `/api/blogs/${blogId}`
        );

        const data =
          await res.json();

        if (data.success) {
          const blog = data.blog;

          setTitle(blog.title);
          setSlug(blog.slug);

          setCategory(
            blog.category || ""
          );

          setTags(
            blog.tags?.join(", ") ||
              ""
          );

          setExcerpt(
            blog.excerpt || ""
          );

          setAuthor(
            blog.author || "Admin"
          );

          setExistingImage(
            blog.featuredImage
          );
          setContent(blog.content || "");

        }
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to fetch blog"
        );
      } finally {
        setFetching(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);
  useEffect(() => {
  if (editorRef.current) {
    editorRef.current.innerHTML =
      content;
  }
}, [content]);

  /* =========================
     AUTO SLUG
  ========================= */
  const handleTitleChange = (
    value: string
  ) => {
    setTitle(value);

    const generatedSlug =
      slugify(value, {
        lower: true,
        strict: true,
      });

    setSlug(generatedSlug);
  };

  /* =========================
     UPLOAD IMAGE
  ========================= */
  const uploadImage = async (
    file: File
  ) => {
    const formData =
      new FormData();

    formData.append("file", file);

    const res = await fetch(
      "/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    return await res.json();
  };

  /* =========================
     TEXT COMMANDS
  ========================= */
  const exec = (
    command: string,
    value?: string
  ) => {
    editorRef.current?.focus();

    document.execCommand(
      command,
      false,
      value
    );
  };

  const insertList = (
    type: "ul" | "ol"
  ) => {
    editorRef.current?.focus();

    document.execCommand(
      type === "ul"
        ? "insertUnorderedList"
        : "insertOrderedList",
      false
    );
  };

  /* =========================
     UPDATE BLOG
  ========================= */
  const handleUpdate = async () => {
    try {
      setLoading(true);

      let finalImage =
        existingImage;

      // NEW IMAGE
      if (image) {
        finalImage =
          await uploadImage(image);
      }

      const content =
        editorRef.current
          ?.innerHTML || "";

      const res = await fetch(
        `/api/blogs/${blogId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title,
            slug,
            category,

            tags: tags
              .split(",")
              .map((tag) =>
                tag.trim()
              ),

            excerpt,

            author,

            featuredImage:
              finalImage
                ? {
                    url:
                      finalImage.url,
                    public_id:
                      finalImage.public_id,
                  }
                : null,

            content,
          }),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        toast.success(
          "Blog updated successfully"
        );
      } else {
        toast.error(
          data.message
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="adminblog-page">
        Loading...
      </div>
    );
  }

  return (
    <div className="adminblog-page">

      {/* HEADER */}
      <div className="adminblog-header">
        <h1>Edit Blog</h1>

        <p>
          Update your blog article
        </p>
      </div>

      {/* TITLE + SLUG */}
      <div className="blog-form-grid">

        <div className="blog-form-group">
          <label>
            Blog Title
          </label>

          <input
            value={title}
            onChange={(e) =>
              handleTitleChange(
                e.target.value
              )
            }
          />
        </div>

        <div className="blog-form-group">
          <label>
            Generated Slug
          </label>

          <input
            value={slug}
            readOnly
          />
        </div>

      </div>

      {/* CATEGORY + TAGS */}
      <div className="blog-form-grid">

        <div className="blog-form-group">
          <label>
            Category
          </label>

          <input
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          />
        </div>

        <div className="blog-form-group">
          <label>Tags</label>

          <input
            value={tags}
            onChange={(e) =>
              setTags(
                e.target.value
              )
            }
          />
        </div>

      </div>

      {/* AUTHOR */}
      <div className="blog-form-group">
        <label>Author</label>

        <input
          value={author}
          onChange={(e) =>
            setAuthor(
              e.target.value
            )
          }
        />
      </div>

      {/* EXCERPT */}
      <div className="blog-form-group">
        <label>Excerpt</label>

        <textarea
          value={excerpt}
          onChange={(e) =>
            setExcerpt(
              e.target.value
            )
          }
        />
      </div>

      {/* IMAGE */}
      <div className="blog-form-group">

        <label>
          Featured Image
        </label>

        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(
              e.target
                .files?.[0] ||
                null
            )
          }
        />

        {(image ||
          existingImage) && (
          <div className="blog-preview-wrapper">

            <img
              src={
                image
                  ? URL.createObjectURL(
                      image
                    )
                  : existingImage?.url
              }
              alt="Preview"
              className="blog-image-preview"
            />

          </div>
        )}

      </div>

      {/* EDITOR */}
      <h3 className="editor-heading">
        Content Editor
      </h3>

      <div className="adminblog-toolbar">

        <button
          type="button"
          onClick={() =>
            exec("bold")
          }
        >
          <b>B</b>
        </button>

        <button
          type="button"
          onClick={() =>
            exec("italic")
          }
        >
          <i>I</i>
        </button>

        <button
          type="button"
          onClick={() =>
            exec("underline")
          }
        >
          <u>U</u>
        </button>

        <button
          type="button"
          onClick={() => {
            const url =
              prompt(
                "Enter URL"
              );

            if (url) {
              exec(
                "createLink",
                url
              );
            }
          }}
        >
          Link
        </button>

        <button
          type="button"
          onClick={() =>
            insertList("ul")
          }
        >
          UL
        </button>

        <button
          type="button"
          onClick={() =>
            insertList("ol")
          }
        >
          OL
        </button>

        <button
          type="button"
          onClick={() =>
            exec(
              "formatBlock",
              "p"
            )
          }
        >
          P
        </button>

        <button
          type="button"
          onClick={() =>
            exec(
              "formatBlock",
              "h1"
            )
          }
        >
          H1
        </button>

        <button
          type="button"
          onClick={() =>
            exec(
              "formatBlock",
              "h2"
            )
          }
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            exec(
              "formatBlock",
              "h3"
            )
          }
        >
          H3
        </button>

        <button
          type="button"
          onClick={() =>
            exec(
              "formatBlock",
              "h4"
            )
          }
        >
          H4
        </button>

        <button
          type="button"
          onClick={() =>
            exec(
              "formatBlock",
              "h5"
            )
          }
        >
          H5
        </button>

        <button
          type="button"
          onClick={() =>
            exec(
              "formatBlock",
              "h6"
            )
          }
        >
          H6
        </button>

      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="adminblog-editor"
      />

      {/* SUBMIT */}
      <button
        className="blog-submit-btn"
        onClick={handleUpdate}
        disabled={loading}
      >
        {loading
          ? "Updating..."
          : "Update Blog"}
      </button>

    </div>
  );
}