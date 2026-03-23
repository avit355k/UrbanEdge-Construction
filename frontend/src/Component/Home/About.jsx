import React from 'react';

const About = () => {
  return (
    <section className="bg-white py-20 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left Image */}
        <div>
          <img
            src="/images/about-us.jpg"
            alt="about"
            className="rounded-3xl w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div>

          {/* Small Title */}
          <p className="text-pink-500 font-bold tracking-wide ">
            ABOUT US
          </p>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Crafting structures <br />
            that last a lifetime
          </h2>

          {/* Paragraph 1 */}
          <p className="text-gray-600 mt-6 leading-relaxed">
            Building enduring structures requires a comprehensive approach that combines advanced
            materials, resilient design, routine maintenance, and sustainable practices. By drawing
            on historical insights and utilizing modern technology.
          </p>

          {/* Paragraph 2 */}
          <p className="text-gray-600 mt-4 leading-relaxed">
            Designing structures that stand the test of time involves a seamless blend of cutting-edge
            materials, durable design, ongoing upkeep, and eco-friendly practices. By combining lessons
            from the past with the power of modern technology.
          </p>

        </div>

      </div>
    </section>
  );
};

export default About;