import React from "react";

export default function Input({
  label = "Default label",
  withLabel = false,
  ...props
}) {
  const { className, ...otherProps } = props;
  return (
    <label className="relative w-full h-fit flex flex-col-reverse">
      <input
        className="w-full outline outline-2 text-font-semibold focus:outline-primary hover:outline-black/80 disabled:outline-black/20 outline-black/40 disabled:cursor-not-allowed bg-transparent disabled:text-gray-400 rounded-lg px-4 py-2 transition-all"
        {...otherProps}
      />
      {withLabel && (
        <p className="text-sm text-gray-400 transition-all">{label}</p>
      )}
    </label>
  );
}
