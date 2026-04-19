import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API, projectImageURL } from '../../Api/Api';
import { useNavigate } from 'react-router-dom';


// const projects = [
//   {
//     title: 'Heavy Civil Infrastructure',
//     description: 'Our expertise is in the design, engineering and construction of projects in segments crucial to the economy like Metros, Nuclear, Hydel, Ports, Special Bridges, Tunnels and Defence.',
//     img: "/images/project1.webp"
//   }, 

//   {
//     title: 'Hydrocarbon Offshore',
//     description: 'Delivering world-class EPCIC solutions across the offshore energy value chain — from concept to commissioning. With advanced engineering, modern fabrication facilities, and a versatile marine fleet',
//     img: "/images/project2.webp"
//   },
//   {
//     title: 'Water & Effluent Treatment',
//     description: 'Water is life. The growing pressure on water resources due to rise in population,climate change, pollution and other challenges have had a major impact on our social, economic and environmental wellbeing.',
//     img: "/images/project3.webp"
//   },
//   {
//     title: 'Offshore Wind',
//     description: 'Offshore Wind delivers end-to-end solutions that harness wind power efficiently and sustainably. Explore our expertise across development, fabrication, installation, and maintenance to power a greener tomorrow.',
//     img: "/images/project4.webp"
//   }
// ];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  //fetch latest projects
  const fetchLatestProjects = async () => {
    try {
      const res = await axios.get(`${API}/getlatestproject`);
      if (res.data && res.data.data) {
        setProjects(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchLatestProjects();
  }, []);


  return (
    <section className='bg-gray-100 py-10 px-8'>
      <h2 className='text-2xl text-pink-500 font-bold tracking-wide text-center mb-2'>Our Projects</h2>

      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center leading-tight">
        Discover our diverse range of projects
      </h2>
      <p className='text-center tracking-wider font-medium text-gray-800 mt-4 leading-relaxed'>
        We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-8'>

        {projects.map((project, index) => (
          <div key={index} className='relative h-80 rounded-3xl overflow-hidden group cursor-pointer'>
            <img
              src={`${projectImageURL}${project.image}`}
              alt={project.title}
              className="w-full h-full object-cover"
            />


            <div
              className="absolute bottom-0 left-0 w-full p-6 text-white
                bg-linear-to-t from-black via-black/70 to-transparent
                transform transition-all duration-500
                translate-y-[70%] group-hover:translate-y-0"
            >

              <h3 className="text-xl font-bold mb-3">
                {project.title}
              </h3>

              {/* Hidden Content (shows on hover) */}
              {project.short_description && (
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition duration-500">
                  <p className="text-normal text-gray-200">
                    {project.short_description}
                  </p>

                  <button  onClick={() => navigate(`/project/${project.id}`)}
                   className="mt-4 bg-pink-500 px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-400 cursor-pointer">
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

export default Projects;