import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage.jsx";
import SignupPage from "./page/SignupPage";
import NotFoundPage from "./page/NotFoundPage";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import Layout from "./layout/layout.jsx";
import AddProblem from "./page/AddProblem.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import { Toaster } from "react-hot-toast";
import ProblemTablePage from "./page/ProblemTablePage.jsx";
import ContactPage from "./page/ContactPage.jsx";
import ProblemPage from "./page/ProblemPage.jsx";
import ProfilePage from "./page/ProfilePage.jsx";
// import LogoutButton from "./components/LogoutButton.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <Loader className="h-10 w-10 animate-spin text-neutral" />
      </div>
    );
  }

  return (
    <div className=" mx-5">
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />

          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to="/" />}
          />

          <Route
            path="/problem"
            element={authUser ? <ProblemTablePage /> : <Navigate to="/" />}
          />
          <Route
            path="/problem/:id"
            element={authUser ? <ProblemPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/" />}
          />

          {/* Admin Route */}
          <Route element={<AdminRoute />}>
            <Route
              path="/add-problem"
              element={authUser ? <AddProblem /> : <Navigate to="/" />}
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
