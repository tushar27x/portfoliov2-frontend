"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

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

const Landing = () => {
  const [mounted, setMounted] = useState(false);
  const [animations, setAnimations] = useState<{
    gear: AnimationData | null;
  }>({
    gear: null,
  });

  useEffect(() => {
    setMounted(true);
    const loadAnimations = async () => {
      const gearRes = await fetch("/animations/gear.json");
      const gear = await gearRes.json();
      setAnimations({ gear });
    };
    loadAnimations();
  }, []);

  if(!mounted) return null;

  return (
    <div className='min-h-screen flex flex-col justify-center items-center text-white relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none' />
      
      {/* Gear animation - Top Left */}
      {animations.gear && (
        <div className='absolute -top-[15%] -left-[20%] md:-top-[20%] md:-left-[10%] w-64 h-64 md:w-[500px] md:h-[500px] opacity-30 animate-float'>
          <Lottie 
            animationData={animations.gear} 
            loop={true}
            style={{ 
              width: '100%', 
              height: '100%',
              filter: 'invert(1) sepia(1) saturate(5) hue-rotate(210deg) brightness(0.5) contrast(1.0)',
            }}
          />
        </div>
      )}

      {/* Gear animation - Bottom Right */}
      {animations.gear && (
        <div className='absolute -bottom-[15%] -right-[15%] md:-bottom-[20%] md:-right-[10%] w-64 h-64 md:w-[500px] md:h-[500px] opacity-25 animate-float-slow'>
          <Lottie 
            animationData={animations.gear} 
            loop={true}
            style={{ 
              width: '100%', 
              height: '100%',
              filter: 'invert(1) sepia(1) saturate(5) hue-rotate(210deg) brightness(0.5) contrast(1.0)',
            }}
          />
        </div>
      )}

      <div className='relative z-20 text-center space-y-4 max-w-4xl mx-auto px-4'>
        <h1 className='text-6xl md:text-7xl font-extrabold tracking-tight'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient-x'>
            Tushar Sharma
          </span>
        </h1>
        <h3 className='text-2xl md:text-3xl font-medium text-gray-300'>
          <span className='relative'>
            Full Stack Developer
            <span className='absolute -inset-1 blur-lg bg-blue-500/20 -z-10 rounded-full' />
          </span>
        </h3>
      </div>
    </div>
  )
}

export default Landing