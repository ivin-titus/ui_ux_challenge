"use client";

import { useState, useRef, useTransition } from "react";
import { Button, Input, TextArea, useToast } from "@/components/ui";
import { Avatar } from "./Avatar";
import {
  updateProfile,
  updateAvatar,
  deleteAvatar,
} from "@/lib/actions/profile";

interface ProfileEditorProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentBio: string;
  currentAvatar: string | null;
}

const BIO_LIMIT = 300;
const NAME_LIMIT = 50;

export function ProfileEditor({
  isOpen,
  onClose,
  currentName,
  currentBio,
  currentAvatar,
}: ProfileEditorProps) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(currentName);
  const [bio, setBio] = useState(currentBio);
  const [avatar, setAvatar] = useState(currentAvatar);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 500KB)
    if (file.size > 500 * 1024) {
      showToast("Image must be under 500KB", "error");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file", "error");
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setAvatar(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  const handleSave = async () => {
    setError("");

    startTransition(async () => {
      // Update avatar if changed
      if (avatar !== currentAvatar) {
        const avatarResult = await updateAvatar(avatar);
        if (!avatarResult.success) {
          setError(avatarResult.error ?? "Failed to update avatar");
          return;
        }
      }

      // Update profile
      const profileResult = await updateProfile(name, bio);
      if (!profileResult.success) {
        setError(profileResult.error ?? "Failed to update profile");
        return;
      }

      showToast("Profile updated!", "success");
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
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
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <Avatar
              src={avatar}
              name={name || "User"}
              size="xl"
              editable
              onClick={handleAvatarClick}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleAvatarClick}
                disabled={isPending}
              >
                Change photo
              </Button>
              {avatar && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveAvatar}
                  disabled={isPending}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <Input
              label="Display name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={NAME_LIMIT}
              disabled={isPending}
            />
            <div className="flex justify-end">
              <span className="text-xs text-slate-400">
                {name.length}/{NAME_LIMIT}
              </span>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1">
            <TextArea
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              className="min-h-[100px]"
              disabled={isPending}
            />
            <div className="flex justify-end">
              <span
                className={`text-xs ${
                  bio.length > BIO_LIMIT
                    ? "text-red-500"
                    : bio.length > BIO_LIMIT * 0.9
                    ? "text-amber-500"
                    : "text-slate-400"
                }`}
              >
                {bio.length}/{BIO_LIMIT}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-800">
          <Button variant="ghost" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
