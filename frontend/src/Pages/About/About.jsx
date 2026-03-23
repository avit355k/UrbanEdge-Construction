import React from 'react'
import Aboutus from '../../Component/Home/About';
import Testimonials from '../../Component/Testimonials/Testimonials';

const AboutPage = () => {
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
            About Us
          </h1>

          {/* Description */}
          <p className="text-gray-50 mt-6 max-w-xl text-sm md:text-lg">
            We excel at transforming visions into reality
            through outstanding craftsmanship and precise.
          </p>

        </div>
      </section>

      <Aboutus />

      <section className="bg-gray-100 py-20 px-8">
        <h2 className='text-2xl text-pink-500 font-bold tracking-wide text-center mb-2'>Team</h2>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center leading-tight">
          Our Team
        </h2>
        <p className='text-center tracking-wider font-medium text-gray-800 mt-4 leading-relaxed'>
          We have a team of experienced professionals dedicated to delivering exceptional results.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
          <div className='relative  rounded-3xl overflow-hidden border border-gray-200 p-6 text-start shadow-lg'>
            <img
              src='/images/client1.jpg'
              alt="John Doe"
              className='w-full h-64 object-cover rounded-3xl'
            />
            <h3 className='text-xl font-bold mt-4'>Mark Doe</h3>
            <p className='text-gray-600 text-normal mt-2'>Senior Developer</p>
          </div>

           <div className='relative  rounded-3xl overflow-hidden border border-gray-200 p-6 text-start shadow-lg'>
            <img
              src='/images/client2.jpg'
              alt="John Doe"
              className='w-full h-64 object-cover rounded-3xl'
            />
            <h3 className='text-xl font-bold mt-4'>John Doe</h3>
            <p className='text-gray-600 text-normal mt-2'>Manager</p>
          </div>
           <div className='relative  rounded-3xl overflow-hidden border border-gray-200 p-6 text-start shadow-lg'>
            <img
              src='/images/client3.jpg'
              alt="John Doe"
              className='w-full h-64 object-cover rounded-3xl'
            />
            <h3 className='text-xl font-bold mt-4'>Rani Singh</h3>
            <p className='text-gray-600 text-normal mt-2'>Team Lead</p>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  )
}

export default AboutPage;