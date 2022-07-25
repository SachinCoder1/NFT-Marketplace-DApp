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
    <div className="flex justify-center my-4">
      <div className="flex flex-col w-full">
        <label
          for={id}
          className="form-label inline-block mb-1.5 text-gray-700"
        >
          {label}
        </label>
        <input
          type={type}
          name={id}
          id={id}
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-orange-500"
          placeholder={placeholder}
          //   value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}
