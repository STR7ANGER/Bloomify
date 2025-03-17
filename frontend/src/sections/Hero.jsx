import React from 'react'
import pageBg from "../assets/backgrounds/page-bg.png";

const Hero = () => {
  return (
    <section>
        <div className="h-screen flex items-center justify-center bg-[url('./assets/backgrounds/page-bg.png')] bg-cover bg-center">
        <div className='flex flex-col items-center'>

        <h1 class="text-6xl tracking-[0.3em] text-[#F0394D]">Welcome to Bloomify</h1>
        {/* <p class="mt-4 text-lg">Your amazing tagline goes here.</p> */}
        </div>
        </div>
    </section>
  )
}

export default Hero
