"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import toast from "react-hot-toast";

import "./viewblogs.css";

export default function ViewBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] =
    useState(true);
    const [deleteId, setDeleteId] =
  useState<string | null>(null);

const [deleteLoading, setDeleteLoading] =
  useState(false);

  // FETCH BLOGS
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

  useEffect(() => {
    fetchBlogs();
  }, []);

const deleteBlog = async () => {
  if (!deleteId) return;

  try {
    setDeleteLoading(true);

    const res = await fetch(
      `/api/blogs/${deleteId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success("Blog deleted");

      setDeleteId(null);

      fetchBlogs();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);

    toast.error(
      "Something went wrong"
    );
  } finally {
    setDeleteLoading(false);
  }
};

  return (
    <div className="viewblogs-page">

      {/* HEADER */}
      <div className="viewblogs-header">

        <div>
          <h1>All Blogs</h1>

          <p>
            Manage all published blogs
          </p>
        </div>

        <Link
          href="/admin/blogs"
          className="add-blog-btn"
        >
          Add Blog
        </Link>

      </div>

      {/* TABLE */}
      <div className="viewblogs-table-wrapper">

        <table className="viewblogs-table">

          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Slug</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {!loading &&
              blogs.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="no-blogs"
                  >
                    No blogs found
                  </td>
                </tr>
              )}

            {blogs.map((blog: any) => (
              <tr key={blog._id}>

                {/* IMAGE */}
                <td>
                  <img
                    src={
                      blog.featuredImage
                        ?.url
                    }
                    alt={blog.title}
                    className="blog-table-image"
                  />
                </td>

                {/* TITLE */}
                <td className="blog-title-cell">
                  {blog.title}
                </td>

                {/* CATEGORY */}
                <td>
                  {blog.category}
                </td>

                {/* SLUG */}
                <td>
                  {blog.slug}
                </td>

                {/* DATE */}
                <td>
                  {new Date(
                    blog.createdAt
                  ).toLocaleDateString()}
                </td>

                {/* ACTIONS */}
                <td>

                  <div className="blog-actions">

                    <Link
                      href={`/admin/blogs/edit/${blog._id}`}
                      className="blog-action-btn"
                    >
                      <FaEdit />
                    </Link>

                  <button
  className="blog-action-btn delete"
  onClick={() =>
    setDeleteId(blog._id)
  }
>
  <FaTrash />
</button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
      {/* DELETE MODAL */}
{deleteId && (
  <div className="delete-modal-overlay">

    <div className="delete-modal">

      <h2>Delete Blog</h2>

      <p>
        Are you sure you want to
        delete this blog?
      </p>

      <div className="delete-modal-actions">

        <button
          className="cancel-delete-btn"
          onClick={() =>
            setDeleteId(null)
          }
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn"
          onClick={deleteBlog}
          disabled={deleteLoading}
        >
          {deleteLoading
            ? "Deleting..."
            : "Delete"}
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}