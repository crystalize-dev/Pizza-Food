import React from "react";

export default function MenuItem() {
  return (
    <div className="bg-gray-200 rounded-lg p-4 text-center hover:shadow-black/20 hover:shadow-md gover hover:bg-white transition-all">
      <div className="text-center">
        <img
          src="/pizza.png"
          alt="pizza"
          className="max-h-24 max-h-auto block mx-auto"
        />
      </div>
      <h4 className="my-3 text-xl font-semibold">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">Some description ok, yes?</p>
      <button className="bg-primary mt-4 text-white rounded-full py-2 px-8">
        Add to cart $12
      </button>
    </div>
  );
}
