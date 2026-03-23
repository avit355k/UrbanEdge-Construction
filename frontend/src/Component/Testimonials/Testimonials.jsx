import React from 'react'

const testimonials = [
  {
    name: "john Doe",
    role: "DEV",
    img: "/images/client1.jpg",
  },
  {
    name: "Mohit",
    role: "Developer",
    img: "/images/client2.jpg",
  },
  {
    name: "Rani",
    role: "CEO",
    img: "/images/client3.jpg",
  },
];

const Testimonials = () => {
  return (
      <section className='bg-white py-10 px-12'>
        <h2 className='text-2xl text-pink-500 font-bold tracking-wide text-center mb-2'>Testimonials</h2>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center leading-tight">
          What people are saying about us
        </h2>
        <p className='text-center tracking-wider font-medium text-gray-800 mt-4 leading-relaxed'>
          Our commitment to excellence and customer satisfaction has earned us a reputation for delivering high-quality projects on time and within budget. Here are some testimonials from our valued clients
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition"
            >

              {/* Stars */}
              <div className="flex text-yellow-400 mb-4 text-lg">
                ★★★★★
              </div>

              {/* Text */}
              <p className="text-gray-700 leading-relaxed">
                We recently partnered with SAASA for our construction project, and the experience
                was outstanding. Their team demonstrated exceptional professionalism, attention
                to detail, and commitment to quality. From planning to execution.
              </p>

              {/* Divider */}
              <div className="border-t border-gray-300 my-6"></div>

              {/* Profile */}
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
  )
}

export default Testimonials