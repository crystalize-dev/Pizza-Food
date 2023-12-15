import React from "react";
import Button from "../Layout/Button";

export default function MenuItem() {
  return (
    <div className="bg-gray-200 rounded-lg p-8 text-center hover:shadow-black/20 hover:shadow-md gover hover:bg-white transition-all">
      <div className="text-center">
        <img
          src="/pizza.png"
          alt="pizza"
          className="max-h-24 max-h-auto block mx-auto"
        />
      </div>
      <h4 className="my-3 text-xl font-semibold">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">Some description ok, yes?</p>
      <Button className="mx-auto mt-4">Add to cart $12</Button>
    </div>
  );
}
