import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { API, projectImageURL } from '../../Api/Api';

const ProjectDetails = () => {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch project details
    const fetchProject = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await axios.get(`${API}/project-details/${id}`);
            setProject(res.data.data || res.data);
        } catch (err) {
            console.error(err);
            setError('Failed to load project details.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchProject();
        }
    }, [id, fetchProject]);

    // Loading state
    if (loading) {
        return (
            <div className="p-10 text-center">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="p-10 text-center text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    // No project found
    if (!project) {
        return (
            <div className="p-10 text-center">
                <p>No project found.</p>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
            {/* Project Image */}
            <img
                src={
                    project?.image
                        ? `${projectImageURL}${project.image}`
                        : '/fallback.jpg'
                }
                alt={project?.title || 'Project Image'}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow"
            />

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold mt-6">
                {project?.title}
            </h1>

            {/* Short Description */}
            <p className="mt-4 text-gray-700">
                {project?.short_description}
            </p>

            {/* Content Section */}
            <div className="flex flex-col md:flex-row gap-8 mt-6">
                {/* Left Info */}
                <div className="md:w-1/3 border-gray-200 p-4 rounded-lg  shadow-sm">
                    <h2 className="text-xl md:text-2xl font-semibold">
                        Project Details
                    </h2>

                    <p className="mt-3 text-gray-700">
                        <strong>Location:</strong> {project?.location || 'N/A'}
                    </p>

                    <p className="mt-2 text-gray-700">
                        <strong>Construction Type:</strong>{' '}
                        {project?.construction_type || 'N/A'}
                    </p>
                </div>

                {/* Right Content */}
                <div
                    className="md:w-2/3 text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(project?.content || ''),
                    }}
                />
            </div>
        </div>
    );
};

export default ProjectDetails;