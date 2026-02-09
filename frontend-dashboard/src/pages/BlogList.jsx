import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await axios.put("http://localhost:5000/api/posts", {
          id: editingId,
          title,
          content,
        });
        alert("Blog updated");
      } else {
        await axios.post("http://localhost:5000/api/posts", { title, content });
        alert("Blog created");
      }
      setTitle("");
      setContent("");
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      alert("Action failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete("http://localhost:5000/api/posts", { data: { id } });
      alert("Blog deleted");
      fetchBlogs();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const startEdit = (blog) => {
    setEditingId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Manage Blogs</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Content</label>
            <textarea
              className="w-full border p-2 rounded h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Update Blog" : "Create Blog"}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setContent("");
              }}
              className="ml-2 text-gray-600 hover:underline"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 border-b">Title</th>
                <th className="p-4 border-b">Created At</th>
                <th className="p-4 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">
                    <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                      {blog.title}
                    </Link>
                  </td>
                  <td className="p-4 border-b">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b text-right space-x-2">
                    <button
                      onClick={() => startEdit(blog)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlogList;
