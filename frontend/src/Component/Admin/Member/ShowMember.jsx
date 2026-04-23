import React, { useEffect, useState } from 'react';
import { API, token } from "../../../Api/Api";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

const ShowMember = () => {
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();

    //fetch Members from API
    const fetchMembers = async () => {
        try {
            const res = await axios.get(`${API}/members`, {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
            });
            setMembers(res.data.data || res.data);
        } catch (error) {
            console.error("Error fetching members:", error);
            toast.error("Error fetching members");
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    //delete member
    const deleteMember = async (id) => {
        if (!window.confirm("Are you sure you want to delete this member?")) return;
        try {
            await axios.delete(`${API}/members/${id}`, {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
            });
            toast.success("Member deleted successfully!");
            fetchMembers();
        } catch (error) {
            console.error("Error deleting member:", error);
            toast.error("Error deleting member");
        }
    };

    return (
        <div className='p-6'>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Members</h2>
                <button className="bg-pink-500 hover:bg-yellow-400 text-white font-bold px-4 py-2 rounded cursor-pointer"
                    onClick={() => navigate("/admin/members/create")}>
                    CREATE
                </button>
            </div>

            {/* Divider */}
            <hr className="border-gray-300 mb-4" />

            <div className="bg-white rounded-lg overflow-hidden border border-gray-300">
                <table className="w-full text-left">
                    {/* Table Head */}
                    <thead className="border-b border-gray-300">
                        <tr className="text-gray-700">
                            <th className="p-3">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Job Title</th>
                            <th className="p-3">Linkedin</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {members.length > 0 ? (
                            members.map((member) => (
                                <tr key={member.id} className="border-b border-gray-300 odd:bg-gray-100 font-medium">
                                    <td className="p-3 truncate">{member.id}</td>
                                    <td className="p-3 max-w-50">
                                        <p className="truncate">
                                            {member.name}
                                        </p>

                                    </td>
                                    <td className="p-3 truncate">{member.job_title}</td>
                                    <td className="p-3 truncate">{member.linkedin}</td>
                                    <td className="p-3 space-x-2">

                                        <button onClick={() => navigate(`/admin/members/edit/${member.id}`)}
                                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-3 py-1 rounded cursor-pointer">
                                            EDIT
                                        </button>
                                        <button  className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-3 py-1 rounded cursor-pointer"
                                            onClick={() => deleteMember(member.id)}>
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            ))) : (
                            <tr>
                                <td colSpan="5" className="p-3 text-center">No members found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ShowMember