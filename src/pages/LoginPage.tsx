import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Supbase-Client";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-2 text-center text-3xl font-bold">
          Tournament Manager
        </h1>

        <p className="mb-8 text-center text-gray-500">Login to continue</p>

        <div className="mb-4">
          <label className="font-semibold">Email</label>

          <input
            type="email"
            className="mt-2 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="font-semibold">Password</label>

          <input
            type="password"
            className="mt-2 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-lg bg-red-700 py-3 font-bold text-white hover:bg-red-800 disabled:opacity-50"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
}
