import React from "react";
import Image from "next/image";
import Right from "../icons/Right";
import Button from "../../components/Layout/Button";

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

        <div className="flex gap-4 items-center">
          <Button>
            Order now
            <Right />
          </Button>

          <div className="cursor-pointer flex group border-none gap-1 items-center text-gray-600">
            Learn more
            <Right />
          </div>
        </div>
      </div>

      <div className="relative">
        <Image
          src={"/pizza.png"}
          alt={"pizza"}
          className="w-full"
          width={250}
          height={250}
        />
      </div>
    </section>
  );
}
