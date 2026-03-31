import React, { useState, useEffect } from "react";
import { API, token } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ShowService = () => {

  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  //  Fetch services from API
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API}/services`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });

      setServices(res.data.data || res.data);

    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Error fetching services");
    }
  };

  // Call on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Delete Service
  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await axios.delete(`${API}/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });
      toast.success("Service deleted successfully!");
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Error deleting service");
    }
  };


  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Services</h2>
        <button className="bg-pink-500 hover:bg-yellow-400 text-white font-bold px-4 py-2 rounded cursor-pointer"
          onClick={() => navigate("/admin/services/create")}>
          CREATE
        </button>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mb-4" />

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden border border-gray-300">
        <table className="w-full text-left">

          {/* Table Head */}
          <thead className="border-b border-gray-300">
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
            {services.length > 0 ? (
              services.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-gray-300 odd:bg-gray-100 font-medium"
                >
                  <td className="p-3 truncate">{service.id}</td>
                  <td className="p-3 max-w-50">
                    <p className="truncate">
                      {service.title}
                    </p>
                  </td>
                  <td className="p-3">{service.slug}</td>
                  <td className="p-3">
                    {
                      (service.status == 1) ? "Active" : "Inactive"
                    }
                  </td>
                  <td className="p-3 space-x-2">

                    <button onClick={() => navigate(`/admin/services/edit/${service.id}`)}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-3 py-1 rounded cursor-pointer">
                      EDIT
                    </button>

                    <button onClick={() => deleteService(service.id)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-3 py-1 rounded cursor-pointer">
                      DELETE
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No services found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ShowService;