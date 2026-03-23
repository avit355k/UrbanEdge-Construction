import React from 'react'
import Hero from '../../Component/Home/Hero'
import About from '../../Component/Home/About'

import Testimonials from '../../Component/Testimonials/Testimonials'
import Services from '../../Component/services/services'
import Projects from '../../Component/Projects/Projects'
import Blog from '../../Component/Blog/Blog'


const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />

      <section className='bg-white py-10 px-12'>
        <h2 className='text-xl text-pink-500 font-bold tracking-wide text-center mb-2'>Why Choose Us</h2>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center leading-tight">
          Discover our wide variety of projects.
        </h2>
        <p className='text-center tracking-wider font-medium text-gray-800 mt-4 leading-relaxed'>
          Created in close partnership with our clients and collaborators, this approach merges industry expertise,
          decades of experience, innovation, and flexibility to consistently deliver excellence.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>

          <div className='relative h-80 rounded-3xl overflow-hidden border border-gray-200 p-6 text-start shadow-lg'>
            <div> <img src='\images\icon-1.svg' alt="" /></div>
            <h3 className='text-xl font-bold mt-4'>Cutting-Edge Solutions</h3>
            <p className='text-gray-600 text-normal mt-2'>Small actions create big impacts. It all begins and ends with each employee committing to safer work practices daily, ensuring they return home safely.</p>
          </div>

          <div className='relative h-80 rounded-3xl overflow-hidden border border-gray-200 p-6 text-start shadow-lg'>
            <div> <img src='\images\icon-2.svg' alt="" /></div>
            <h3 className='text-xl font-bold mt-4'>Reliable Project Delivery</h3>
            <p className='text-gray-600 text-normal mt-2'>We ensure every project is delivered on time with precision and quality. Our structured workflow and dedicated team guarantee consistent and dependable results.</p>
          </div>

          <div className='relative h-80 rounded-3xl overflow-hidden border border-gray-200 p-6 text-start shadow-lg'>
            <div> <img src='\images\icon-3.svg' alt="" /></div>
            <h3 className='text-xl font-bold mt-4'>Customer Satisfaction</h3>
            <p className='text-gray-600 text-normal mt-2'>We are committed to exceeding our clients' expectations and building long-term relationships based on trust and excellence.</p>
          </div>

        </div>
      </section>

      <Projects />
      <Testimonials />

      <Blog />
      <Blog />
    </>
  )
}

export default Home