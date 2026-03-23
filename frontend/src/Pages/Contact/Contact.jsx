import React from 'react';

const Contact = () => {
  return (
    <>
      {/* Hero Section */}
      <section className='relative h-100 w-full overflow-hidden'>
        <img
          src="/images/hero.jpg"
          alt="construction"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20">
          <p className="text-amber-400 font-bold mb-2 text-xl md:text-2xl">
            Quality. Integrity. Value.
          </p>

          <h1 className="text-white font-medium text-4xl md:text-6xl">
            Contact Us
          </h1>

          <p className="text-gray-200 mt-4 max-w-xl">
            We excel at transforming visions into reality through outstanding craftsmanship.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 py-16 px-4 md:px-16">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Left Info Box */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p>(888-000-0000)</p>
            <p>(222-123-12345)</p>

            <h3 className="text-xl font-bold mt-6 mb-2">You can write us</h3>
            <p>example@example.com</p>
            <p>info@example.com</p>

            <h3 className="text-xl font-bold mt-6 mb-2">Address</h3>
            <p>B-18X, Rajaji Puram</p>
            <p>Lucknow, Uttar Pradesh, 226017</p>
            <p>0522400XXXX</p>
          </div>

          {/* Right Form */}
          <div className="md:col-span-2 bg-white rounded-3xl shadow-lg p-8">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full border rounded-lg px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full border rounded-lg px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <input
                  type="text"
                  placeholder="Phone No."
                  className="w-full border rounded-lg px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Subject</label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border rounded-lg px-4 py-3 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  rows="5"
                  placeholder="Message"
                  className="w-full border rounded-lg px-4 py-3 outline-none"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <button className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600">
                  SUBMIT
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;