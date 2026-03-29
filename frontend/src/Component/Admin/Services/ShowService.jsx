import React from "react";

const ShowService = () => {
  // Dummy data (replace with API later)
  const services = [
    {
      id: 3,
      name: "Building Construction",
      slug: "building-construction",
      status: "Active",
    },
    {
      id: 2,
      name: "Residential Construction",
      slug: "residential-construction",
      status: "Active",
    },
    {
      id: 1,
      name: "Corporate Construction",
      slug: "corporate-construction",
      status: "Active",
    },
  ];

  return (
    <div className="p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Services</h2>
        <button className="bg-pink-500 hover:bg-yellow-400 text-white font-bold px-4 py-2 rounded cursor-pointer">
          CREATE
        </button>
      </div>

        {/*border line separating header and table*/}
        <hr className="text-gray-300" />

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full text-left">
          
          {/* Table Head */}
          <thead className="border-b">
            <tr className="text-gray-700">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className="border-b hover:bg-gray-100"
              >
                <td className="p-3">{service.id}</td>
                <td className="p-3">{service.name}</td>
                <td className="p-3">{service.slug}</td>
                <td className="p-3">{service.status}</td>
                <td className="p-3 space-x-2">
                  
                  <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-3 py-1 rounded cursor-pointer">
                    EDIT
                  </button>

                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-3 py-1 rounded cursor-pointer">
                    DELETE
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ShowService;