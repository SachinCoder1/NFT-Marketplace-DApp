import React from "react";

export default function Input({
  id,
  type = "text",
  placeholder,
  label,
  onChange,
  //   value,
}) {
  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col w-full">
        <label
          for={id}
          className="block text-gray-700 text-base font-semibold mb-2"
        >
          {label}
        </label>
        <input
          type={type}
          name={id}
          id={id}
          className="leading-tight block w-full px-3 py-2 text-base font-normal text-gray-700 bg-slate-50 -clip-padding border-b-2 border-solid border-gray-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-green-500"
          placeholder={placeholder}
          //   value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}
