import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button.jsx";

const NavBar = () => {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const handleRedirectHome = () => {
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col sm:flex-row justify-between items-center py-2 px-6 sm:py-4 sm:px-8 bg-gray-800 text-white font-helvetica font-bold shadow-lg">
      <div className="flex-1 text-center">
        <h1 className="text-2xl cursor-pointer" onClick={handleRedirectHome}>
          Dissertation Registration
        </h1>
      </div>
      <div className="flex-1 text-center">
        {isLoggedIn ? (
          <Button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded transition duration-300"
            onClick={handleLogout}
          >
            LOG OUT
          </Button>
        ) : (
          <Button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded transition duration-300"
            onClick={handleLogin}
          >
            SIGN IN
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavBar;