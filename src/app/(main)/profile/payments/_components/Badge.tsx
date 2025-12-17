import React from "react";

const Badge = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full  font-medium ${
      color || "bg-yellow-100 text-yellow-800"
    }`}
  >
    {children}
  </span>
);

export default Badge;
