import React from "react";
import { AlertTriangle } from "lucide-react"; // Optional icon

const NotFoundPage = () => {
  return (
 <div className="min-h-screen w-full flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl border border-base-300 rounded-xl">
        <div className="card-body items-center text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-error" />
          <h1 className="text-5xl font-bold text-error">404</h1>
          <p className="text-lg text-base-content/70">Oops! Page Not Found</p>
          <a href="/" className="btn btn-primary">Go to Home</a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
