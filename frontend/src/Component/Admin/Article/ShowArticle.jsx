import React, { useEffect, useState } from 'react';
import { API, token } from "../../../Api/Api";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

const ShowArticle = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  //fetch Articles from API
  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${API}/articles`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });
      setArticles(res.data.data || res.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("Error fetching articles");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  //delete article
  const deleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await axios.delete(`${API}/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });
      toast.success("Article deleted successfully!");
      fetchArticles();
    }
    catch (error) {
      console.error("Error deleting article:", error);
      toast.error("Error deleting article");
    }
  };

  return (
    <div className='p-6'>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Articles</h2>
        <button className="bg-pink-500 hover:bg-yellow-400 text-white font-bold px-4 py-2 rounded cursor-pointer"
          onClick={() => navigate("/admin/articles/create")}>
          CREATE
        </button>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mb-4" />
      {/* table */}
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
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-gray-300 odd:bg-gray-100 font-medium">
                <td className="p-3 truncate">{article.id}</td>
                <td className="p-3 max-w-50">
                  <p className="truncate">
                    {article.title}
                  </p>
                </td>
                <td className="p-3">{article.slug}</td>
                <td className="p-3">
                  {article.status ? "Active" : "Inactive"}
                </td>
                <td className="p-3 space-x-2">

                  <button onClick={() => navigate(`/admin/articles/edit/${article.id}`)}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-3 py-1 rounded cursor-pointer">
                    EDIT
                  </button>

                  <button onClick={() => deleteArticle(article.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-3 py-1 rounded cursor-pointer">
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShowArticle