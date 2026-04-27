import React, { useState, useEffect } from 'react'
import Aboutus from '../../Component/Home/About';
import Testimonials from '../../Component/Testimonials/Testimonials';
import { API, teamImageURL } from '../../Api/Api';
import axios from 'axios';

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch team members from the API
  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get(`${API}/getmembers`);
      setTeamMembers(res.data.data || res.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  }

  useEffect(() => {
    fetchTeamMembers();
  }, []);

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
          {teamMembers.map((member, index) => (
            <div key={index} className='relative  rounded-3xl overflow-hidden border border-gray-200 p-6 text-start shadow-lg'>
              <img
                src={`${teamImageURL}${member.image}`}
                alt={member.name}
                className='w-full h-64 object-cover rounded-3xl'
              />
              <h3 className='text-xl font-bold mt-4'>{member.name}</h3>
              <p className='text-gray-600 text-normal mt-2'>{member.position}</p>
            </div>
          ))};

        </div>
      </section>

      <Testimonials />
    </>
  )
}

export default AboutPage;