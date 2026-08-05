"use client";

import Image from "next/image";
import Link from "next/link";
import "./BlogSection.css";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface BlogType {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  featuredImage?: {
    url: string;
  };
  createdAt: string;
  author?: string;
}

export default function BlogSection() {

  const [blogs, setBlogs] =
    useState<BlogType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const sliderRef =
    useRef<HTMLDivElement>(null);

const cardRef =
  useRef<HTMLAnchorElement>(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  /* =========================
     FETCH BLOGS
  ========================= */
  useEffect(() => {

    const fetchBlogs = async () => {

      try {

        const res =
          await fetch("/api/blogs");

        const data = await res.json();

        if (data.success) {

          // latest 5 blogs only
          setBlogs(data.blogs.slice(0, 5));

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchBlogs();

  }, []);

  // duplicate for smooth loop
  const loopedBlogs = [...blogs, ...blogs];

  /* =========================
     AUTO SLIDE
  ========================= */
  useEffect(() => {

    if (!blogs.length) return;

    const interval = setInterval(() => {

      moveSlide(activeIndex + 1);

    }, 4000);

    return () => clearInterval(interval);

  }, [activeIndex, blogs]);

  /* =========================
     MOVE SLIDE
  ========================= */
  const moveSlide = (
    newIndex: number
  ) => {

    const cardWidth =
      cardRef.current?.offsetWidth || 0;

    const gap =
      window.innerWidth <= 600
        ? 0
        : 35;

    let realIndex = newIndex;

    if (realIndex >= blogs.length) {

      realIndex = 0;

    }

    setActiveIndex(realIndex);

    gsap.to(sliderRef.current, {

      x: -(
        realIndex *
        (cardWidth + gap)
      ),

      duration: 0.7,
      ease: "power3.out",

    });

  };

  return (
    <section className="blogsec">

      <div className="blogsec-container">

        {/* Heading */}
        <div className="blogsec-headingwrap">

          <p className="blogsec-smallheading">
            LATEST BLOGS
          </p>

          <h2 className="blogsec-heading">
            Latest News & Articles
            From Our Blog
          </h2>

        </div>

        {/* Slider */}
        <div className="blogsec-sliderwrap">

      {loading ? (

  <div className="blogsec-slider blogsec-skeletonwrap">

    {[1, 2, 3].map((item) => (

      <div
        className="blogsec-item blogsec-skeletoncard"
        key={item}
      >

        <div className="blogsec-skeleton-img"></div>

        <div className="blogsec-content">

          <div className="blogsec-skeleton-category"></div>

          <div className="blogsec-skeleton-title"></div>

          <div className="blogsec-skeleton-title short"></div>

          <div className="blogsec-skeleton-meta"></div>

        </div>

      </div>

    ))}

  </div>

) : (

            <div
              className="blogsec-slider"
              ref={sliderRef}
            >

              {loopedBlogs.map(
                (blog, index) => (

                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="blogsec-item"
                    key={index}
                    ref={cardRef}
                  >

                    <div className="blogsec-imgwrap">

                      <Image
                        src={
                          blog
                            .featuredImage
                            ?.url ||
                          "/images/blog-placeholder.jpg"
                        }
                        alt={blog.title}
                        width={500}
                        height={350}
                        className="blogsec-img"
                      />

                    </div>

                    <div className="blogsec-content">

                      <p className="blogsec-category">
                        {blog.category}
                      </p>

                      <h3 className="blogsec-title">
                        {blog.title}
                      </h3>

                      <div className="blogsec-meta">

                        <span>
                          {new Date(
                            blog.createdAt
                          ).toLocaleDateString()}
                        </span>

                        <div className="blogsec-dot"></div>

                        <span>
                          {blog.author ||
                            "Admin"}
                        </span>

                      </div>

                    </div>

                  </Link>

                )
              )}

            </div>

          )}

        </div>

        {/* Dots */}
        {!loading && blogs.length > 0 && (

          <div className="blogsec-sliderdots">

            {blogs.map((_, index) => (

              <button
                key={index}
                className={`blogsec-sliderdot ${
                  activeIndex === index
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  moveSlide(index)
                }
              ></button>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}