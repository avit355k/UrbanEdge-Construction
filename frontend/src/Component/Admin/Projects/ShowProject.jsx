import React, { useEffect, useState } from 'react';
import { API, token } from "../../../Api/Api";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

const ShowProject = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    //fetch Projects from API
    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${API}/projects`, {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
            });

            setProjects(res.data.data || res.data);

        } catch (error) {
            console.error("Error fetching projects:", error);
            toast.error("Error fetching projects");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    //delete project
    const deleteProject = async (id) => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;

        try {
            await axios.delete(`${API}/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
            });
            toast.success("Project deleted successfully!");
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Error deleting project");
        }
    };

    return (
        <div className='p-6'>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Projects</h2>
                <button className="bg-pink-500 hover:bg-yellow-400 text-white font-bold px-4 py-2 rounded cursor-pointer"
                    onClick={() => navigate("/admin/projects/create")}>
                    CREATE
                </button>
            </div>

            {/* Divider */}
            <hr className="border-gray-300 mb-4" />
            {/* Projects Table */}
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
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <tr key={project.id} className="border-b border-gray-300 odd:bg-gray-100 font-medium">
                                    <td className="p-3 truncate">{project.id}</td>
                                    <td className="p-3 max-w-50">
                                        <p className="truncate">
                                            {project.title}
                                        </p>
                                    </td>
                                    <td className="p-3">{project.slug}</td>
                                    <td className="p-3">
                                        {project.status ? "Active" : "Inactive"}
                                    </td>
                                    <td className="p-3 space-x-2">

                                        <button onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-3 py-1 rounded cursor-pointer">
                                            EDIT
                                        </button>

                                        <button onClick={() => deleteProject(project.id)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-3 py-1 rounded cursor-pointer">
                                            DELETE
                                        </button>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-3 text-center">
                                    No projects found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowProject; 