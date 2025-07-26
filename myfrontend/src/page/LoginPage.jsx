import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader2, Eye, EyeOff } from "lucide-react";
import CodeGif from "../components/CodeGif.jsx";

// Zod Schema
const LoginSchema = z.object({
  email: z.string().nonempty("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const { isLoggedIn, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
       await login(data);
      console.log("Login success:", data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center justify-center px-4 bg-base-100">
      {/* Left Column: Form */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm p-6 border border-base-300 rounded-xl shadow-md bg-base-200 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>

          {/* Email */}
          <div>
            <label className="label font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input input-bordered w-full"
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="label font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="input input-bordered w-full pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-info w-full mt-4"
            disabled={isLoggedIn}
          >
            {isLoggedIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Logging In...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Footer */}
          <div className="text-center">
            <p className="text-base-content/60">
              Don’t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Right Column: GIF */}
      <div className="hidden lg:flex justify-center items-center">
        <CodeGif />
      </div>
    </div>
  );
};

export default LoginPage;
