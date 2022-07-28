import React from "react";

export default function Heading3({ title, className }) {
  return (
    <h2
      className={`text-4xl font-bold leading-normal my-6 text-center text-blue-500 ${className}`}
    >
      <span className="border-b-[1px] border-gray-400 "> {title} </span>
    </h2>
  );
}
