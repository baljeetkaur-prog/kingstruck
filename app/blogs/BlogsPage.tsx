"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./BlogsPage.css";

import {
  FiSearch,
  FiFacebook,
  FiInstagram,
  FiArrowRight,
} from "react-icons/fi";

import { useRouter } from "next/navigation";

interface BlogType {
  _id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  excerpt: string;
  featuredImage?: {
    url: string;
  };
  createdAt: string;
}

export default function BlogsPage({
  initialSearch,
}: {
  initialSearch: string;
}) {

  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] =
    useState(initialSearch);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [category, setCategory] =
    useState("");

  const router = useRouter();

  const blogsPerPage = 8;

  /* =========================
     FETCH BLOGS
  ========================= */
  useEffect(() => {

    const fetchBlogs = async () => {

      try {

        const res = await fetch("/api/blogs");

        const data = await res.json();

        if (data.success) {
          setBlogs(data.blogs);
        }

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    };

    fetchBlogs();

  }, []);

  /* =========================
     DYNAMIC CATEGORIES
  ========================= */
  const categories = useMemo(() => {

    const allCategories = blogs.map(
      (blog) => blog.category
    );

    return [...new Set(allCategories)];

  }, [blogs]);

  /* =========================
     DYNAMIC TAGS
  ========================= */
const allTags = useMemo(() => {

  const tags = blogs.flatMap(
    (blog) => blog.tags || []
  );

  return [...new Set(tags)].slice(0, 10);

}, [blogs]);

  /* =========================
     FILTER BLOGS
  ========================= */
  const filteredBlogs = useMemo(() => {

    return blogs.filter((blog) => {

      const matchesSearch =
        `${blog.title} ${blog.category} ${blog.excerpt}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory = category
        ? blog.category === category
        : true;

      return (
        matchesSearch &&
        matchesCategory
      );

    });

  }, [blogs, search, category]);

  const totalPages = Math.ceil(
    filteredBlogs.length / blogsPerPage
  );

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <>
      {/* BANNER */}
      <section className="blogspg-banner">

        <div className="blogspg-banner-overlay"></div>

        <div className="blogspg-banner-content">

          <h1>Blogs</h1>

          <div className="blogspg-breadcrumb">

            <Link href="/">
              Home
            </Link>

            <span>/</span>

            <p>Blogs</p>

          </div>

        </div>

      </section>

      {/* BLOGS SECTION */}
      <section className="blogspg-section">

        <div className="blogspg-container">

          {/* LEFT */}
          <div className="blogspg-left">

            {loading ? (

              <div className="blogspg-loading">
                Loading blogs...
              </div>

            ) : paginatedBlogs.length > 0 ? (

              <>
                <div className="blogspg-grid">

                  {paginatedBlogs.map((blog) => (

                    <div
                      className="blogspg-card"
                      key={blog._id}
                    >

                      <div className="blogspg-imagewrap">

                        <Image
                          src={
                            blog.featuredImage
                              ?.url ||
                            "/images/blog-placeholder.jpg"
                          }
                          alt={blog.title}
                          width={600}
                          height={400}
                        />

                      </div>

                      <div className="blogspg-content">

                        <div className="blogspg-meta">

                          <span>
                            {new Date(
                              blog.createdAt
                            ).toLocaleDateString()}
                          </span>

                          <div className="blogspg-dot"></div>

                          <p>
                            {blog.category}
                          </p>

                        </div>

                        <h3>
                          {blog.title}
                        </h3>

                        <p className="blogspg-excerpt">
                          {blog.excerpt}
                        </p>

                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="blogspg-readmore"
                        >
                          Read More
                          <FiArrowRight />
                        </Link>

                      </div>

                    </div>

                  ))}

                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (

                  <div className="blogspg-pagination">

                    {[...Array(totalPages)].map(
                      (_, index) => (

                        <button
                          key={index}
                          onClick={() =>
                            setCurrentPage(
                              index + 1
                            )
                          }
                          className={
                            currentPage ===
                            index + 1
                              ? "active"
                              : ""
                          }
                        >
                          {index + 1}
                        </button>

                      )
                    )}

                  </div>

                )}

              </>

            ) : (

              <div className="blogspg-noblogs">

                <h3>No Blogs Found</h3>

                <p>
                  Try searching with
                  different keywords.
                </p>

              </div>

            )}

          </div>

          {/* SIDEBAR */}
          <div className="blogspg-sidebar">

            {/* SEARCH */}
            <div className="blogspg-widget">

              <h4 className="blogspg-widget-title">
                Search
              </h4>

              <div className="blogspg-search">

                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={search}
                  onChange={(e) => {

                    setSearch(
                      e.target.value
                    );

                    setCurrentPage(1);

                  }}
                  onKeyDown={(e) => {

                    if (
                      e.key === "Enter"
                    ) {

                      router.push(
                        `/blogs?search=${encodeURIComponent(
                          search
                        )}`
                      );

                    }

                  }}
                />

                <button
                  onClick={() => {

                    router.push(
                      `/blogs?search=${encodeURIComponent(
                        search
                      )}`
                    );

                  }}
                >
                  <FiSearch />
                </button>

              </div>

            </div>

            {/* RECENT POSTS */}
            <div className="blogspg-widget">

              <h4 className="blogspg-widget-title">
                Recent Posts
              </h4>

              <div className="blogspg-recent">

                {blogs
                  .slice(0, 6)
                  .map((blog) => (

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="blogspg-recent-item"
                      key={blog._id}
                    >

                      <Image
                        src={
                          blog
                            .featuredImage
                            ?.url ||
                          "/images/blog-placeholder.jpg"
                        }
                        alt={blog.title}
                        width={90}
                        height={90}
                      />

                      <div>

                        <span>
                          {new Date(
                            blog.createdAt
                          ).toLocaleDateString()}
                        </span>

                        <h5>
                          {blog.title}
                        </h5>

                      </div>

                    </Link>

                  ))}

              </div>

            </div>

            {/* CATEGORIES */}
            <div className="blogspg-widget">

              <h4 className="blogspg-widget-title">
                Categories
              </h4>

              <div className="blogspg-categories">

                <button
                  className={
                    category === ""
                      ? "active"
                      : ""
                  }
                  onClick={() => {

                    setCategory("");

                    setCurrentPage(1);

                  }}
                >
                  All
                </button>

                {categories.map((cat) => (

                  <button
                    key={cat}
                    className={
                      category === cat
                        ? "active"
                        : ""
                    }
                    onClick={() => {

                      setCategory(cat);

                      setCurrentPage(1);

                    }}
                  >
                    {cat}
                  </button>

                ))}

              </div>

            </div>

            {/* TAGS */}
            <div className="blogspg-widget">

              <h4 className="blogspg-widget-title">
                Popular Tags
              </h4>

              <div className="blogspg-tags">

                {allTags.map((tag) => (

                  <span key={tag}>
                    {tag}
                  </span>

                ))}

              </div>

            </div>

            {/* FOLLOW */}
            <div className="blogspg-widget">

              <h4 className="blogspg-widget-title">
                Follow Us
              </h4>

             <div className="blogspg-social">

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