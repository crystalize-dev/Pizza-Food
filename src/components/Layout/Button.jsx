import React from "react";

export default function Input({ children, ...props }) {
  const { className, type, ...otherProps } = props;
  const submitStyles =
    " border-0 w-fit gap-2 hover:bg-transparent hover:text-primary hover:border-primary !rounded-full bg-primary text-white disabled:cursor-wait disabled:bg-zinc-500 disabled:!border-zinc-500 disabled:!text-white";
  const buttonStyles = " ";
  const defaultStyles =
    "flex w-full text-center items-center justify-center text-gray-700 font-semibold transition-all border-2 rounded-xl border-solid border-transparent px-4 py-2";
  return (
    <button
      className={
        type === "button"
          ? defaultStyles + buttonStyles + " " + className
          : defaultStyles + submitStyles + " " + className
      }
      {...otherProps}
    >
      {children}
    </button>
  );
}
