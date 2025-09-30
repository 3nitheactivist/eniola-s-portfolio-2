"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProjectCard({ project, isExpanded, onExpand }) {
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsTextOverflowing(isOverflowing);
    }
  }, [project.description]);

  return (
    <div
      className="bg-white dark:bg-gray-700 shadow overflow-hidden sm:rounded-lg flex flex-col h-full
      transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
    >
      {project.imageUrl && (
        <div className="w-full h-48 relative overflow-hidden">
          {project.isInDevelopment && (
            <div className="absolute top-2 left-2 z-10">
              <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider bg-yellow-100 text-yellow-800 dark:bg-yellow-300/20 dark:text-yellow-200 rounded">
                In Development
              </span>
            </div>
          )}
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGRjpGQC1RUV9oYGRmSVFfXV1dXV1dXV1dXV3/2wBDARUXFyAeIBohICAfHR0gXTAtIF1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300"
          />
        </div>
      )}
      <div className="px-4 py-5 sm:px-6 flex-grow flex flex-col">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <div
          ref={textRef}
          className={`mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300 ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {project.description}
        </div>
        {isTextOverflowing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm mt-2"
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
      <div className="border-t border-gray-200 dark:border-gray-600 px-4 py-5 sm:p-0 mt-auto">
        <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-600">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Tech Stack
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
      {project.techStack.join(", ")}
    </dd>
  </div>
  {project.credentials && (
    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Credentials
      </dt>
      <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 space-y-1">
        <div>Email: <code>{project.credentials.email}</code></div>
        <div>Password: <code>{project.credentials.password}</code></div>
        <div>Role: <code>{project.credentials.role}</code></div>
      </dd>
    </div>
  )}
          {project.link && (
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Link
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                
                <a
                  href={project.link}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.isInDevelopment ? "Preview (In Development)" : "View Project"}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
