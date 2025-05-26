"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

type AnimationData = {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: any[];
  layers: any[];
  markers: any[];
};

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const About = () => {
  const [mounted, setMounted] = useState(false);
  const [animations, setAnimations] = useState<{
    developer: AnimationData | null;
  }>({
    developer: null,
  });

  useEffect(() => {
    setMounted(true);
    const loadAnimations = async () => {
      const devRes = await fetch("/animations/developer.json");
      const developer = await devRes.json();
      setAnimations({ developer });
    };
    loadAnimations();
  }, []);

  if(!mounted) return null;
  
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Animation - order-2 on mobile, order-1 on desktop */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
            {animations.developer && (
              <div className="w-full h-[400px]">
                <Lottie 
                  animationData={animations.developer} 
                  loop={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            )}
          </div>

          {/* Text content - order-1 on mobile, order-2 on desktop */}
          <div className="w-full text-center md:text-left md:w-1/2 space-y-6 order-1 md:order-2">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              About Me
            </h2>
            <div className="space-y-6 text-lg text-gray-300">
              <p className="leading-relaxed">
                I'm a final-year Information Technology student at GTBIT, set to
                graduate soon. Currently, I work as a Software Engineer at{" "}
                <a 
                  href="https://salescode.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className=" hover:text-purple-800 transition-colors duration-200 underline"
                >
                  Salescode.ai
                </a>
                , where I build scalable, data-driven solutions for
                sales intelligence. I enjoy solving complex problems and
                continuously strive to grow as a developer by combining academic
                knowledge with hands-on industry experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
