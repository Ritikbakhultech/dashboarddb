import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loginUser } from "../api/authApi";
import { setToken } from "../utils/cookie";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Page load pe agar remember me ka data ho to auto fill
  useEffect(() => {
    const savedEmail = Cookies.get("email");
    const savedPassword = Cookies.get("password");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);

      /* DUMMY LOGIN 
         Email: ritik@gmail.com
         Password: ritik123 */
    
      if (email === "ritik@gmail.com" && password === "ritik123") {
        // dummy token set
        setToken("dummy-login-token");

        if (remember) {
          Cookies.set("email", email, { expires: 7 });
          Cookies.set("password", password, { expires: 7 });
        } else {
          Cookies.remove("email");
          Cookies.remove("password");
        }

        navigate("/dashboard");
        return; 
      }

      
    
      const res = await loginUser({ email, password });

      // token save
      setToken(res.data.token);

      if (remember) {
        Cookies.set("email", email, { expires: 7 });
        Cookies.set("password", password, { expires: 7 });
      } else {
        Cookies.remove("email");
        Cookies.remove("password");
      }

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <label>Remember Me</label>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
