import { removeToken } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <div className="h-14 bg-blue-600 text-white flex justify-between items-center px-4">
      <h1 className="font-bold">CMS Dashboard</h1>
      <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
        Logout
      </button>
    </div>
  );
};

export default Header;
