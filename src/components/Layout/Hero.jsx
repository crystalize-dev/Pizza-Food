import React from "react";
import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-6xl font-bold ">
          Everything
          <br />
          is better
          <br /> with a&nbsp;
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500">
          Pizza is a missing pieace that makes every day complete, a simple yet
          delicious joy in life
        </p>

        <div className="flex gap-1 items-center">
          <button className="uppercase text-sm whitespace-nowrap items-center group flex gap-1 bg-primary text-white px-4 py-2 rounded-full">
            Order now
            <Right />
          </button>
          <button className="flex group border-none gap-1 items-center text-gray-600">
            Learn more
            <Right />
          </button>
        </div>
      </div>

      <div className="relative">
        <Image
          src={"/pizza.png"}
          alt={"pizza"}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </section>
  );
}
