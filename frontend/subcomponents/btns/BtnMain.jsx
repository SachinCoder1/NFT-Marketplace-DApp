import React from "react";

export default function BtnMain({ icon, text, onClick, className }) {
  return (
    <button
      onClick={onClick}
      class={`relative mr-3 cursor-pointer hover:text-gray-100 rounded-md flex items-center justify-center gap-x-1 text-center border border-green-500 py-2 px-8 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white ${className}`}
    >
      {icon && icon} {text}
    </button>
  );
}
