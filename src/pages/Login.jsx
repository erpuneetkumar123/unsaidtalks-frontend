import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import logo from "../assets/unsaid.png"; // ✅ logo import
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if (res.data.role === "ADMIN") navigate("/admin");
      else navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-700">
      <div className="w-[360px] bg-slate-900 text-white rounded-xl shadow-lg p-6">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="UnsaidTalks" className="h-10 object-contain" />
        </div>

        <input
          className="w-full mb-3 p-2 rounded bg-slate-100 text-black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type={show ? "text" : "password"}
          className="w-full mb-2 p-2 rounded bg-slate-100 text-black"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center gap-2 mb-4 text-sm">
          <input type="checkbox" onChange={() => setShow(!show)} />
          <span>Show password</span>
        </div>

        <button
          onClick={submit}
          className="w-full bg-amber-600 hover:bg-amber-700 transition p-2 rounded font-semibold"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4">
          New user?{" "}
          <Link to="/register" className="text-amber-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
