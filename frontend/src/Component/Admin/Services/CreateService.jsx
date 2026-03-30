import React from "react";
import { useNavigate,Link } from "react-router-dom";

const CreateService = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="breadcrumbs text-sm font-bold">
                    <ul>
                        <li><Link to="/admin/services">Services</Link></li>
                        <li>Create</li>
                    </ul>
                </div>
                <button className="bg-pink-500 hover:bg-yellow-400 text-white font-bold px-4 py-2 rounded cursor-pointer"
                    onClick={() => navigate("/admin/services/")}>
                    Back
                </button>
            </div>

            {/* Divider */}
            <hr className="border-gray-300 mb-4" />


            {/* Form goes here */}
            <form className="space-y-4">
{/* Name */}
        <div>
          <label className="label font-medium">Name</label>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="label font-medium">Slug</label>
          <input
            type="text"
            placeholder="Slug"
            className="input input-bordered w-full"
          />
        </div>

            </form>    

        </div>
    );
};

export default CreateService;