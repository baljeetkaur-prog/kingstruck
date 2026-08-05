"use client";

import Link from "next/link";
import Image from "next/image";

import {
  FiSearch,
  FiFacebook,
  FiInstagram,
} from "react-icons/fi";

import "./BlogDetailPage.css";

import {
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

interface BlogType {
  _id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  createdAt: string;

  featuredImage?: {
    url: string;
  };
}

export default function BlogDetailPage({
  blog,
}: {
  blog: BlogType;
}) {

  const [blogs, setBlogs] = useState<
    BlogType[]
  >([]);

  const [searchText, setSearchText] =
    useState("");

  const router = useRouter();

  /* =========================
     FETCH BLOGS
  ========================= */
  useEffect(() => {

    const fetchBlogs = async () => {

      try {

        const res = await fetch(
          "/api/blogs"
        );

        const data = await res.json();

        if (data.success) {
          setBlogs(data.blogs);
        }

      } catch (error) {
        console.log(error);
      }

    };

    fetchBlogs();

  }, []);

  /* =========================
     RECENT POSTS
  ========================= */
  const recentPosts = blogs
    .filter(
      (b) => b.slug !== blog.slug
    )
    .slice(0, 3);

  return (
    <>
      {/* BANNER */}
      <section className="blogdetailpg-banner">

        <div className="blogdetailpg-banner-overlay"></div>

        <div className="blogdetailpg-banner-content">

          <h1>{blog.title}</h1>

          <div className="blogdetailpg-breadcrumb">

            <Link href="/">
              Home
            </Link>

            <span>/</span>

            <Link href="/blogs">
              Blogs
            </Link>

            <span>/</span>

            <p>{blog.title}</p>

          </div>

        </div>

      </section>

      {/* SECTION */}
      <section className="blogdetailpg-section">

        <div className="blogdetailpg-container">

          {/* LEFT */}
          <div className="blogdetailpg-left">

            {/* IMAGE */}
            <div className="blogdetailpg-imagewrap">

              <Image
                src={
                  blog.featuredImage
                    ?.url ||
                  "/images/blog-placeholder.jpg"
                }
                alt={blog.title}
                width={1000}
                height={500}
                priority
              />

            </div>

            {/* META */}
            <div className="blogdetailpg-meta-row">

              <span className="blogdetailpg-category">
                {blog.category}
              </span>

              <span className="blogdetailpg-date">
             {new Date(
  blog.createdAt
).toLocaleDateString("en-GB")}
              </span>

            </div>

            {/* TITLE */}
            <h2 className="blogdetailpg-title">
              {blog.title}
            </h2>

            {/* DIVIDER */}
            <div className="blogdetailpg-divider"></div>

            {/* CONTENT */}
            <div
              className="blogdetailpg-content"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />

            {/* TAGS */}
            {blog.tags &&
              blog.tags.length > 0 && (

                <div className="blogdetailpg-tags">

                  <div className="blogdetailpg-tags-list">

                    {blog.tags.map(
                      (tag: string) => (

                        <span
                          key={tag}
                          className="blogdetailpg-tag"
                        >
                          {tag}
                        </span>

                      )
                    )}

                  </div>

                </div>

              )}

          </div>

          {/* SIDEBAR */}
          <div className="blogdetailpg-sidebar">

            {/* SEARCH */}
            <div className="blogdetailpg-widget">

              <h4 className="blogdetailpg-widget-title">
                Search
              </h4>

              <div className="blogdetailpg-search">

                <input
                  placeholder="Search blogs..."
                  value={searchText}
                  onChange={(e) =>
                    setSearchText(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {

                    if (
                      e.key === "Enter"
                    ) {

                      if (
                        !searchText.trim()
                      )
                        return;

                      router.push(
                        `/blogs?search=${encodeURIComponent(
                          searchText
                        )}`
                      );

                    }

                  }}
                />

                <button
                  onClick={() => {

                    if (
                      !searchText.trim()
                    )
                      return;

                    router.push(
                      `/blogs?search=${encodeURIComponent(
                        searchText
                      )}`
                    );

                  }}
                >
                  <FiSearch />
                </button>

              </div>

            </div>

            {/* RECENT POSTS */}
            <div className="blogdetailpg-widget">

              <h4 className="blogdetailpg-widget-title">
                Recent Posts
              </h4>

              <div className="blogdetailpg-recent">

                {recentPosts.map(
                  (post) => (

                    <Link
                      href={`/blogs/${post.slug}`}
                      key={post._id}
                      className="blogdetailpg-recent-item"
                    >

                      <Image
                        src={
                          post
                            .featuredImage
                            ?.url ||
                          "/images/blog-placeholder.jpg"
                        }
                        alt={post.title}
                        width={90}
                        height={90}
                      />

                      <div>

                        <span>
                          {new Date(
                            post.createdAt
                          ).toLocaleDateString()}
                        </span>

                        <h5>
                          {post.title}
                        </h5>

                      </div>

                    </Link>

                  )
                )}

              </div>

            </div>

            {/* FOLLOW */}
            <div className="blogdetailpg-widget">

              <h4 className="blogdetailpg-widget-title">
                Follow Us
              </h4>

              <div className="blogdetailpg-social">

                <Link
    href="https://www.facebook.com/kingstruckcenter"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FiFacebook />
  </Link>

  <Link
    href="https://www.instagram.com/kings_truckcenter/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FiInstagram />
  </Link>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}