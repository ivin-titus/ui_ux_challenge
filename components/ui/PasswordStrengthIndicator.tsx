"use client";

import { getPasswordStrength } from "@/lib/utils/validation";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const strength = getPasswordStrength(password);

  return (
    <div className="space-y-2">
      {/* Strength bar */}
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"
          >
            <div
              className="h-full rounded-full transition-all duration-300 animate-strength"
              style={{
                width: index < strength.score ? "100%" : "0%",
                backgroundColor: strength.color,
              }}
            />
          </div>
        ))}
      </div>

      {/* Label and feedback */}
      <div className="flex items-center justify-between text-xs">
        <span style={{ color: strength.color }} className="font-medium">
          {strength.label}
        </span>
        {strength.feedback.length > 0 && (
          <span className="text-slate-500 dark:text-slate-400">
            {strength.feedback[0]}
          </span>
        )}
      </div>
    </div>
  );
}
