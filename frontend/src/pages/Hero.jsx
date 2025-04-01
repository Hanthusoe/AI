import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { bgImg } from "../assets";

export default function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Revolutionize Your Business with{" "}
            <span className="text-primary">AI Solutions</span>
          </h1>
          <p className="text-4xl text-gray-400 mb-8">
            Leverage the power of Artificial Intelligence to automate processes,
            gain insights, and drive smarter decisions.
          </p>
          <div className="flex gap-4 items-center justify-center">
            <Link
              to="/solutions"
              className="btn btn-primary flex items-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            {/* <button className="btn-outline">Learn More</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
