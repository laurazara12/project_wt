import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx"; 
import { useAuth } from "../../hooks/useAuth";
import { ROLES } from "../../../../server/config/constants";
import Login from "../../components/Login";

const LoginProfessor = () => {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/logout");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = (user) => {
    const { email, password } = user;
    fetch("http://localhost:3000/auth/professor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          login(data.token, ROLES.PROFESSOR, data.user);
          navigate("/dashboard/professor");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <div className="flex-grow flex flex-col items-center text-gray-200 font-helvetica p-6 mt-24">
        <h1 className="text-5xl font-bold mb-6 pb-10">Professor Login</h1>
        <Login onLogin={handleLogin} userType="professor" />
      </div>
      <Footer />
    </div>
  );
};

export default LoginProfessor;