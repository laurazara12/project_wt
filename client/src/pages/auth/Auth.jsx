import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx"; 

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <div className="flex-grow flex items-center justify-center pt-20"> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-3xl"> 
          {/* Log In Section */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md transition-shadow duration-300">
            <p className="font-bold text-xl bg-ocher1 rounded px-4 py-2 text-center mb-4">LOG IN</p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-lg transition duration-300 shadow-md hover:shadow-lg w-full mb-2"
              onClick={() => navigate("/student/login")}
            >
              LOG IN AS STUDENT
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-lg transition duration-300 shadow-md hover:shadow-lg w-full"
              onClick={() => navigate("/professor/login")}
            >
              LOG IN AS PROFESSOR
            </button>
          </div>

          {/* Sign Up Section */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md transition-shadow duration-300">
            <p className="font-bold text-xl bg-ocher1 rounded px-4 py-2 text-center mb-4">SIGN UP</p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-lg transition duration-300 shadow-md hover:shadow-lg w-full mb-2"
              onClick={() => navigate("/student/register")}
            >
              REGISTER AS STUDENT
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-lg transition duration-300 shadow-md hover:shadow-lg w-full"
              onClick={() => navigate("/professor/register")}
            >
              REGISTER AS PROFESSOR
            </button>
          </div>
        </div>
      </div>

      <Footer /> {/* Footer will remain at the bottom */}
    </div>
  );
};

export default Auth;