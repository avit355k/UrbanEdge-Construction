import React from 'react'

const blogs = [
  {
    title: 'Building X',
    description: 'Building X is a revolutionary construction project that combines cutting-edge technology, sustainable design, and innovative engineering to create a landmark structure that redefines urban living and sets new standards for architectural excellence.',
    img: "/images/blog1.avif"
  },
  {
    title: 'Engineering a Sustainable Future',
    description: 'Sustainability is embedded in our vision, culture, strategy, and business processes. We are committed to sustainable growth, and integrate Environment, Social and Governance (ESG) principles in all aspects of our business.',
    img: "/images/blog2.webp"
  },
  {
    title: 'Electronics X',
    description: 'Electronics X is a comprehensive platform that provides end-to-end solutions for the electronics industry. From design and prototyping to manufacturing and supply chain management, Electronics X offers a seamless experience for businesses looking to bring their electronic products to market efficiently and effectively.',
    img: "/images/blog3.avif"
  },

];

const Blog = () => {
  return (
    <div className='bg-gray-100 py-10 px-8'>
      <h2 className='text-2xl text-pink-500 font-bold tracking-wide text-center mb-2'>Blog & News</h2>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center leading-tight">
        Articles & blog posts
      </h2>
      <p className='text-center tracking-wider font-medium text-gray-800 mt-4 leading-relaxed'>
        We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>

        {blogs.map((blog, index) => (
          <div key={index} className='relative h-90 rounded-3xl overflow-hidden group cursor-pointer'>
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
           

            <div
              className="absolute bottom-0 left-0 w-full p-6 text-white
                bg-linear-to-t from-black via-black/70 to-transparent
                transform transition-all duration-500
                translate-y-[70%] group-hover:translate-y-0"
            >

              <h3 className="text-xl font-bold mb-3">
                {blog.title}
              </h3>

              {/* Hidden Content (shows on hover) */}
              {blog.description && (
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition duration-500">
                  <p className="text-normal text-gray-200">
                    {blog.description}
                  </p>

                  <button className="mt-4 bg-pink-500 px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-400 cursor-pointer">
                    READ MORE
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog;