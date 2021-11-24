import React, { useState } from 'react';
import Head from 'next/head'
import { RiMenu3Line } from "react-icons/ri"
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import Particles from "react-tsparticles";
import particlesOptions from "../assets/particlesOptions"

export default function Home() {
  const [hide, setHide] = useState(true);

  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <main className="h-screen" id="particles-js">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
      </Head>

      {/* @ts-ignore */}
      <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particlesOptions} style={{ height: "100vh"}} className="absolute bottom-0 z-10"/>

      <button className="absolute right-8 top-8" onClick={() => setHide(!hide)} style={{ pointerEvents: "none"}}><RiMenu3Line size={40} color={hide ? "#ccff02" : "black"}/></button>

      <section className="flex h-4/5 bg-cover bg-black bg-no-repeat">
        <div className='flex-grow flex justify-center items-center md:items-stretch pt-24 px-4 md:p-24'>
          <img src="/image.jpg" className='z-20 h-96 w-96 md:h-auto md:w-auto object-cover'/>
        </div>
        <div className={`w-full md:w-80 bg-neon-pink ${hide ? "hidden" : "block"}`}>
        </div>
      </section>
      <section className="flex h-1/5">
        <AudioPlayer />
      </section>
    </main>
  )
}
