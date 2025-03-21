import { ArrowRight } from "lucide-react";
import React from "react";

export default function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/glowing-filament-ignites-ideas-innovative-solutions-generated-by-ai_188544-9614.jpg?t=st=1742540375~exp=1742543975~hmac=6d8e677b8b4cdeaab8e41b5b214ff108c29a61424136e03d9f03716d32a48ecb&w=2000)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Revolutionize Your Business with{" "}
            <span className="text-primary">AI Solutions</span>
          </h1>
          <p className="text-lg text-gray-100 mb-8">
            Leverage the power of Artificial Intelligence to automate processes,
            gain insights, and drive smarter decisions. We deliver custom AI
            models tailored to your unique business needs.
          </p>
          <div className="flex gap-4 items-center justify-center">
            <button className="btn btn-primary flex items-center gap-2">
              Get Started <ArrowRight size={20} />
            </button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
