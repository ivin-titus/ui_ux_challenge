"use client";

import { useState } from "react";

interface AvatarProps {
  src: string | null;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  editable?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-20 h-20 text-xl",
  xl: "w-32 h-32 text-3xl",
};

export function Avatar({
  src,
  name,
  size = "md",
  onClick,
  editable = false,
}: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const baseClasses = `
    ${sizeClasses[size]}
    rounded-full overflow-hidden flex items-center justify-center
    font-semibold select-none shrink-0
    ${onClick ? "cursor-pointer" : ""}
    ${
      editable
        ? "ring-2 ring-transparent hover:ring-slate-300 dark:hover:ring-slate-600"
        : ""
    }
  `;

  return (
    <div
      className={`relative group ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {src ? (
        <img
          src={src}
          alt={`${name}'s avatar`}
          className={`${baseClasses} object-cover`}
        />
      ) : (
        <div
          className={`${baseClasses} bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 text-slate-600 dark:text-slate-300`}
        >
          {initials}
        </div>
      )}

      {editable && (
        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

interface AvatarViewerProps {
  src: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AvatarViewer({
  src,
  name,
  isOpen,
  onClose,
}: AvatarViewerProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white hover:text-slate-300 transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <img
        src={src}
        alt={`${name}'s avatar`}
        className="max-w-full max-h-full rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
