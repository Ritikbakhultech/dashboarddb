 import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../components/layout/DashboardLayout";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        const foundBlog = res.data.find((b) => b._id === id);
        setBlog(foundBlog);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <DashboardLayout>Loading...</DashboardLayout>;
  if (!blog) return <DashboardLayout>Blog not found</DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
        <Link to="/blogs" className="text-blue-500 hover:underline mb-4 inline-block">
          &larr; Back to Blogs
        </Link>
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Published on {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <div className="prose max-w-none whitespace-pre-wrap">
          {blog.content}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlogDetails;
