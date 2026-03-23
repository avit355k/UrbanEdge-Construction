import React from 'react'

const Hero = () => {
    return (
        <section className='relative h-screen w-full overflow-hidden'>
            {/* Background Image */}
            <img
                src="/images/hero.jpg"
                alt="construction"
                className="absolute inset-0 w-full h-full object-cover">
            </img>

            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">

                {/* Small Heading */}
                <p className="text-yellow-400 font-bold mb-4  text-lg">
                    Welcome Amazing Constructions
                </p>

                {/* Main Heading */}
                <h1 className="text-white font-bold leading-tight text-4xl md:text-6xl lg:text-6xl max-w-5xl">
                    Crafting dreams with <br />
                    precision and excellence.
                </h1>

                {/* Description */}
                <p className="text-gray-50 mt-6 max-w-3xl text-sm md:text-lg">
                    We excel at transforming visions into reality through outstanding craftsmanship and precise
                    attention to detail. With years of experience and a dedication to quality.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-md">
                        CONTACT NOW
                    </button>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-md">
                        VIEW PROJECTS
                    </button>
                </div>

            </div>
        </section>
    )
}

export default Hero