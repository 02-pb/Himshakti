import React from "react";

/**
 * Toast Component
 * @param {string} message - Message to display
 * @param {"success" | "error" | "warning"} type - Toast type
 */

export default function Toast({
  message,
  type = "success",
}) {
  if (!message) return null;

  return (
    <div className={`toast ${type}`}>
      <span>
        {type === "success" && "✅"}
        {type === "error" && "❌"}
        {type === "warning" && "⚠️"}
      </span>

      <span>{message}</span>
    </div>
  );
}