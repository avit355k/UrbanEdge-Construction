import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API, token } from "../../../Api/Api";

const AddMember = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    job_title: "",
    linkedin: "",
    image: null
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const res = await axios.post(`${API}/members`, data, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });

      console.log(res);

      toast.success("Member Created Successfully!");

      navigate("/admin/members");

    } catch (error) {
      console.error(error);
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach((errArr) => {
          errArr.forEach((msg) => toast.error(msg));
        });
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className='p-6'>{/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="breadcrumbs text-sm font-bold">
          <ul>
            <li><Link to="/admin/members">Members</Link></li>
            <li>Create</li>
          </ul>
        </div>
        <button className="bg-pink-500 hover:bg-yellow-400 text-white font-bold px-4 py-2 rounded cursor-pointer"
          onClick={() => navigate("/admin/members/")}>
          Back
        </button>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mb-4" />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/*  Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>
        {/* Job Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            name="job_title"
            placeholder="Job Title"
            value={formData.job_title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>
        {/* LinkedIn */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>
        {/* Image */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Image
          </label>

          <div className="flex items-center gap-3">
            {/* Hidden Input */}
            <input
              type="file"
              name="image"
              id="imageUpload"
              onChange={handleChange}
              className="hidden"
            />

            {/* Custom Button */}
            <label
              htmlFor="imageUpload"
              className="cursor-pointer bg-gray-200 border px-3 py-1 rounded-md hover:bg-gray-300 text-sm"
            >
              Choose File
            </label>

            {/* File Name */}
            <span className="text-sm text-gray-700">
              {formData.image ? formData.image.name : "No file chosen"}
            </span>
          </div>
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="preview"
              className="mt-2 h-20 rounded"
            />
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="bg-pink-500 hover:bg-yellow-400 transition text-white px-5 py-2 rounded-md font-semibold cursor-pointer"
          >
            Add Member
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddMember;