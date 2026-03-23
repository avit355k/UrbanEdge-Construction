import React from 'react'
import Projects from '../../Component/Projects/Projects'

const ProjectPage = () => {
  return (
   <>
      <section className='relative h-100 w-full overflow-hidden'>
        {/* Background Image */}
        <img
          src="/images/hero.jpg"
          alt="construction"
          className="absolute inset-0 w-full h-full object-cover">
        </img>

        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center text-start h-full px-20 md:px-10 lg:px-20">

          {/* Small Heading */}
          <p className="text-amber-400 font-bold mb-2  text-2xl">
            Quality. Integrity. Value.
          </p>

          {/* Main Heading */}
          <h1 className="text-white font-medium leading-tight text-4xl md:text-6xl lg:text-6xl max-w-5xl">
            Our Projects
          </h1>

          {/* Description */}
          <p className="text-gray-50 mt-6 max-w-xl text-sm md:text-lg">
            We excel at transforming visions into reality
            through outstanding craftsmanship and precise.
          </p>

        </div>
      </section>

      <Projects />
   </>
  )
}

export default ProjectPage