import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert(
        "Registered successfully. Please verify email (check backend console)."
      );
      navigate("/login");
    } catch (err) {
      alert(
        err?.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-700">
      <div className="w-[360px] bg-slate-900 text-white rounded-xl shadow-lg p-6">
        <div className="flex justify-center mb-4">
          <img src="C:\Users\ASUS\OneDrive\Desktop\todo-app\frontend\UnsaidTalks Logo.png" alt="UnsaidTalks" className="h-10" />
        </div>

        <input
          className="w-full mb-3 p-2 rounded bg-slate-100 text-black"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

