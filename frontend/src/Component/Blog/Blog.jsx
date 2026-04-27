import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API, articleImageURL } from '../../Api/Api';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();


  //fetch latest blogs
  const fetchLatestBlogs = async () => {
    try {
      const res = await axios.get(`${API}/getlatestarticle`);
      if (res.data && res.data.data) {
        setBlogs(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

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
              src={`${articleImageURL}${blog.image}`}
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
                    {blog.slug}
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