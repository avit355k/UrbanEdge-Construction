import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API, imageURL } from '../../Api/Api';

const ServiceDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);

    const fetchService = async () => {
        try {
            const res = await axios.get(`${API}/service-details/${id}`);
            setService(res.data.data || res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchService();
    }, [id]);

    if (!service) return <p>Loading...</p>;

    return (
        <div className="p-10">
            <img src={`${imageURL}${service.image}`}
                alt={service.title}
                className="w-full h-96 object-cover rounded-xl"
            />

            <h1 className="text-3xl font-bold mt-6">{service.title}</h1>

            <p className="mt-4 text-gray-700">{service.short_description}</p>
            <div
                className="mt-6 text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: service.content }}
            />
        </div>
    );
};

export default ServiceDetails;