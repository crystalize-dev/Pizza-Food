import React from "react";
import SectionHeaders from "./SectionHeaders";

export default function ContactUs() {
  return (
    <section className="text-center my-8">
      <SectionHeaders subHeader={"Dont't hesitate"} mainHeader={"Contact us"} />
      <div className="mt-8">
        <a className="text-4xl underline text-gray-500" href="tel:+79772954630">
          +7 (977) 295 46 30
        </a>
      </div>
    </section>
  );
}
