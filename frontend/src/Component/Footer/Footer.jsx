import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0f1720] text-white pt-16 pb-6 px-14">
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* Column 1 */}
          <div>
            <h2 className="text-yellow-400 font-bold text-xl mb-4">
              UrbanEdge <br /> Constructions
            </h2>
            <p className="text-gray-100 leading-relaxed">
              Our post-construction services gives you peace of mind knowing
              that we are still here for you even after.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-yellow-400 font-bold mb-4">
              Our Services
            </h3>
            <ul className="space-y-3 text-gray-100 font-semibold cursor-pointer">
              <li className='hover:text-pink-500'>Specialty Construction</li>
              <li className='hover:text-pink-500'>Commercial Construction</li>
              <li className='hover:text-pink-500'>Residential Construction</li>
              <li className='hover:text-pink-500'>Project Management</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-yellow-400 font-bold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-100 font-semibold cursor-pointer">
              <li className='hover:text-pink-500'>About Us</li>
              <li className='hover:text-pink-500'>Services</li>
              <li className='hover:text-pink-500'>Projects</li>
              <li className='hover:text-pink-500'>Blogs</li>
              <li className='hover:text-pink-500'>Contact us</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-yellow-400 font-bold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-100 font-semibold">
              <li>(888-000-0000)</li>
              <li>info@example.com</li>
              <li>
                B-18X, Rajaji Puram <br />
                Lucknow, Uttar Pradesh, <br />
                226017
              </li>
              <li>0522400XXXX</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 mt-10 pt-6 text-center text-gray-400 text-sm">
          Copyright © 2024 UrbanEdge Constructions. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;