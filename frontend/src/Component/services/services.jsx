import React from 'react'

const services = [
  {
    title: 'Building Construction',
    description: 'Building construction is a broad and essential sector within the construction industry that focuses on the creation of structures designed for human occupancy and use.',
    img: "/images/construction4.jpg"
  },
  {
    title: 'Residential Construction',
    description: 'Residential construction is a fundamental sector within the construction industry, dedicated to creating living spaces that meet the diverse needs of individuals and families.',
    img: "/images/construction7.jpg"
  },
  {
    title: 'Corporate Construction',
    description: 'Corporate construction is a specialized sector within the construction industry that focuses on developing and constructing buildings and facilities designed for business operations.',
    img: "/images/engineer-4925135_1280.jpg"
  }
];

const Services = () => {
  return (
    <section className='bg-gray-100 py-10 px-8'>
      <h2 className='text-xl text-pink-500 font-bold tracking-wide text-center mb-2'>Our Services</h2>

      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center leading-tight">
        Our construction services
      </h2>
      <p className='text-center tracking-wider font-medium text-gray-800 mt-4 leading-relaxed'>
        We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-8'>

        {services.map((service, index) => (
          <div key={index} className='relative h-80 rounded-3xl overflow-hidden group cursor-pointer'>
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-full object-cover"
            />
           

            <div
              className="absolute bottom-0 left-0 w-full p-6 text-white
                bg-linear-to-t from-black via-black/70 to-transparent
                transform transition-all duration-500
                translate-y-[70%] group-hover:translate-y-0"
            >

              <h3 className="text-xl font-bold mb-3">
                {service.title}
              </h3>

              {/* Hidden Content (shows on hover) */}
              {service.description && (
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition duration-500">
                  <p className="text-normal text-gray-200">
                    {service.description}
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
    </section>
  )
}

export default Services;