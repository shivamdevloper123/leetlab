import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

const LogoutButton = ({ children }) => {
  const navigate = useNavigate()

  const { logout , authUser } = useAuthStore();

  if(!authUser){
    console.log("auth user in logout button",authUser)
  }
  const onLogout = async () => {
    await logout();
    navigate("/login")
  };

  return (
    <button className="btn btn-primary " onClick={onLogout}>
      {children}
    </button>
  );
};

export default LogoutButton;
