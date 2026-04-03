import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import axios from "axios";
import { API, token, imageURL } from "../../../Api/Api";

const EditService = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const editor = useRef(null);

    const [oldImage, setOldImage] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        short_description: "",
        content: "",
        image: null,
        status: "1",
    });
    const [isSlugEdited, setIsSlugEdited] = useState(false);
    // Generate slug from title
    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    //fetch service data
    const fetchService = async () => {
        try {
            const res = await axios.get(`${API}/services/${id}`, {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
            });

            const service = res.data.data || res.data;

            setFormData({
                title: service.title || "",
                slug: service.slug || "",
                short_description: service.short_description || "",
                content: service.content || "",
                image: null,
                status: service.status || "1",
            });

            setOldImage(service.image);

        } catch (error) {
            console.error("Error fetching service:", error);
            toast.error("Error fetching service");
        }
    };

    // Call on component mount
    useEffect(() => {
        fetchService();
    }, [id]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        }
        else if (name === "title") {
            setFormData((prev) => ({
                ...prev,
                title: value,
                slug: isSlugEdited ? prev.slug : generateSlug(value),
            }));
        }
        else if (name === "slug") {
            setIsSlugEdited(value !== "");
            setFormData({ ...formData, slug: value });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    };
    //update service
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        try {
            await axios.post(`${API}/services/${id}?_method=PUT`, data, {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
            });
            toast.success("Service Updated Successfully!");
            navigate("/admin/services");
        } catch (error) {
            console.error(error);
            console.log(error.response);
            if (error.response?.data?.errors) {
                Object.values(error.response.data.errors).forEach((errArr) => {
                    errArr.forEach((msg) => toast.error(msg));
                });
            } else {
                toast.error("Something went wrong!");
            }
        }

    }

    return (
        <div className='p-6'>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="breadcrumbs text-sm font-bold">
                    <ul>
                        <li><Link to="/admin/services">Services</Link></li>
                        <li>Edit</li>
                    </ul>
                </div>
                <button className="bg-pink-500 hover:bg-yellow-400 text-white font-bold px-4 py-2 rounded cursor-pointer"
                    onClick={() => navigate("/admin/services/")}>
                    Back
                </button>
            </div>

            {/* Divider */}
            <hr className="border-gray-300 mb-4" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Slug
                    </label>
                    <input
                        type="text"
                        name="slug"
                        placeholder="Slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                    />
                </div>

                {/* Short Description */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Short Description
                    </label>
                    <input
                        type="text"
                        name="short_description"
                        placeholder="Short Description"
                        value={formData.short_description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block mb-2 font-medium text-gray-700">
                        Content
                    </label>
                    <div className="border rounded-md">
                        <JoditEditor
                            ref={editor}
                            value={formData.content}
                            onChange={(content) =>
                                setFormData({ ...formData, content })
                            }
                            config={{
                                readonly: false,
                                height: 350,
                                toolbarAdaptive: false,
                            }}
                        />
                    </div>
                </div>

                {/*image */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Image
                    </label>

                    <div className="flex items-center gap-3">
                        <input type="file" name="image" id="imageUpload" onChange={handleChange} aria-label="Upload service image"
                            className="hidden" />

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

                    {/* OLD IMAGE */}
                    {oldImage && !formData.image && (
                        <img
                            src={`${imageURL}${oldImage}`}
                            alt="old"
                            className="h-24 mt-2 rounded-md"
                        />
                    )}

                    {/* NEW IMAGE PREVIEW */}
                    {formData.image && (
                        <img
                            src={URL.createObjectURL(formData.image)}
                            alt="new"
                            className="h-24 mt-2 rounded-md"
                        />
                    )}

                </div>
                {/* Status */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-yellow-400 transition text-white px-5 py-2 rounded-md font-semibold cursor-pointer"
                    >
                        Update Service
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditService;