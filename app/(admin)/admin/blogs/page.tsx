"use client";

import { useRef, useState } from "react";
import slugify from "slugify";
import toast from "react-hot-toast";

import "./blogs.css";

export default function AddBlogPage() {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("Admin");

  const [image, setImage] = useState<File | null>(null);

  const imageRef = useRef<HTMLInputElement>(null);

  const editorRef = useRef<HTMLDivElement>(null);

  // AUTO SLUG
  const handleTitleChange = (value: string) => {
    setTitle(value);

    const generatedSlug = slugify(value, {
      lower: true,
      strict: true,
    });

    setSlug(generatedSlug);
  };

  // CLOUDINARY UPLOAD
  const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    return await res.json();
  };

  // TEXT EDITOR COMMANDS
  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();

    document.execCommand(command, false, value);
  };

  // LISTS
  const insertList = (type: "ul" | "ol") => {
    editorRef.current?.focus();

    document.execCommand(
      type === "ul"
        ? "insertUnorderedList"
        : "insertOrderedList",
      false
    );
  };

  // SUBMIT
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // FEATURED IMAGE UPLOAD
      const uploadedImage = image
        ? await uploadImage(image)
        : null;

      // CONTENT HTML
      const content =
        editorRef.current?.innerHTML || "";

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          slug,
          category,

          tags: tags
            .split(",")
            .map((tag) => tag.trim()),

          excerpt,

          author,

          featuredImage: uploadedImage
            ? {
                url: uploadedImage.url,
                public_id:
                  uploadedImage.public_id,
              }
            : null,

          content,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(
          "Blog created successfully"
        );

        // RESET
        setTitle("");
        setSlug("");
        setCategory("");
        setTags("");
        setExcerpt("");
        setImage(null);

        if (editorRef.current) {
          editorRef.current.innerHTML = "";
        }

        if (imageRef.current) {
          imageRef.current.value = "";
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminblog-page">

      {/* HEADER */}
      <div className="adminblog-header">
        <h1>Add Blog</h1>

        <p>
          Create and publish blog articles
        </p>
      </div>

      {/* TITLE + SLUG */}
      <div className="blog-form-grid">

        <div className="blog-form-group">
          <label>Blog Title</label>

          <input
            placeholder="Enter blog title"
            value={title}
            onChange={(e) =>
              handleTitleChange(e.target.value)
            }
          />
        </div>

        <div className="blog-form-group">
          <label>Generated Slug</label>

          <input
            value={slug}
            readOnly
          />
        </div>

      </div>

      {/* CATEGORY + TAGS */}
      <div className="blog-form-grid">

        <div className="blog-form-group">
          <label>Category</label>

          <input
            placeholder="Business"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />
        </div>

        <div className="blog-form-group">
          <label>Tags</label>

          <input
            placeholder="seo, trucking, logistics"
            value={tags}
            onChange={(e) =>
              setTags(e.target.value)
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
            setAuthor(e.target.value)
          }
        />
      </div>

      {/* EXCERPT */}
      <div className="blog-form-group">
        <label>Excerpt</label>

        <textarea
          placeholder="Short blog excerpt"
          value={excerpt}
          onChange={(e) =>
            setExcerpt(e.target.value)
          }
        />
      </div>

      {/* FEATURED IMAGE */}
      <div className="blog-form-group">
        <label>Featured Image</label>

        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(
              e.target.files?.[0] || null
            )
          }
        />

        {image && (
          <div className="blog-preview-wrapper">

            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="blog-image-preview"
            />

            <button
              type="button"
              className="remove-blog-image-btn"
              onClick={() => {
                setImage(null);

                if (imageRef.current) {
                  imageRef.current.value = "";
                }
              }}
            >
              ×
            </button>

          </div>
        )}
      </div>

      {/* CONTENT */}
      <h3 className="editor-heading">
        Content Editor
      </h3>
<div className="adminblog-toolbar">

  <button
    type="button"
    onClick={() => exec("bold")}
  >
    <b>B</b>
  </button>

  <button
    type="button"
    onClick={() => exec("italic")}
  >
    <i>I</i>
  </button>

  <button
    type="button"
    onClick={() => exec("underline")}
  >
    <u>U</u>
  </button>

  <button
    type="button"
    onClick={() => {
      const url = prompt("Enter URL");

      if (url) {
        exec("createLink", url);
      }
    }}
  >
    Link
  </button>

  <button
    type="button"
    onClick={() => insertList("ul")}
  >
    UL
  </button>

  <button
    type="button"
    onClick={() => insertList("ol")}
  >
    OL
  </button>

  <button
    type="button"
    onClick={() =>
      exec("formatBlock", "p")
    }
  >
    P
  </button>

  <button
    type="button"
    onClick={() =>
      exec("formatBlock", "h1")
    }
  >
    H1
  </button>

  <button
    type="button"
    onClick={() =>
      exec("formatBlock", "h2")
    }
  >
    H2
  </button>

  <button
    type="button"
    onClick={() =>
      exec("formatBlock", "h3")
    }
  >
    H3
  </button>

  <button
    type="button"
    onClick={() =>
      exec("formatBlock", "h4")
    }
  >
    H4
  </button>

  <button
    type="button"
    onClick={() =>
      exec("formatBlock", "h5")
    }
  >
    H5
  </button>

  <button
    type="button"
    onClick={() =>
      exec("formatBlock", "h6")
    }
  >
    H6
  </button>

</div>

    
      {/* EDITOR */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="adminblog-editor"
      />

      {/* SUBMIT */}
      <button
        className="blog-submit-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? "Creating..."
          : "Create Blog"}
      </button>

    </div>
  );
}