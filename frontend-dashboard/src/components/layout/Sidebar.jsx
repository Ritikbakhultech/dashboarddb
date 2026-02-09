import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-60 bg-gray-800 text-white min-h-screen p-4">
      <ul className="space-y-3">
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/blogs">Blogs</Link>
        </li>

        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/contacts">Contacts</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
