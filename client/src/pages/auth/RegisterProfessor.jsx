import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer"; 
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const RegisterProfessor = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/logout");
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/auth/professor/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${lastName} ${firstName}`,
        email,
        password,
      }),
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
          alert("Registration successful");
          navigate("/professor/login");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 pt-20"> {/* Padding added */}
      <div className="flex-grow flex flex-col items-center justify-center text-white">
        <div className="bg-gray-800 p-10 m-10 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold mb-8 text-center">Professor Registration</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              value={lastName}
              onChange={handleInputChange(setLastName)}
              placeholder="Last Name"
              className="w-full"
            />
            <Input
              type="text"
              value={firstName}
              onChange={handleInputChange(setFirstName)}
              placeholder="First Name"
              className="w-full"
            />
            <Input
              type="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              placeholder="example@csie.ase.ro"
              className="w-full"
            />
            <Input
              type="password"
              value={password}
              onChange={handleInputChange(setPassword)}
              placeholder="Password"
              className="w-full"
            />
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
              REGISTER
            </Button>
          </form>
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default RegisterProfessor;