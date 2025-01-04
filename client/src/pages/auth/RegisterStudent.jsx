import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const RegisterStudent = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("Informatica Economica");
  const [year, setYear] = useState(2);
  const [studentClass, setStudentClass] = useState("IE-2A");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/logout");
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/auth/student/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${lastName} ${firstName}`,
        email,
        password,
        major,
        studentClass,
        year,
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
          navigate("/student/login");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 pt-20"> {/* Added padding-top here */}
      <div className="flex-grow flex flex-col items-center justify-center text-white ">
        <div className="bg-gray-800 p-10 m-10 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold mb-8 text-center">Student Registration</h1>
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
              placeholder="Email"
              className="w-full"
            />
            <Input
              type="password"
              value={password}
              onChange={handleInputChange(setPassword)}
              placeholder="Password"
              className="w-full"
            />
            <select
              className="bg-gray-700 text-white p-2 rounded w-full"
              value={major}
              onChange={handleInputChange(setMajor)}
            >
              <option value="Informatica Economica">Informatica Economica</option>
              <option value="Cibernetica si Economie Cantitativa">Cibernetica si Economie Cantitativa</option>
              <option value="Statistica Aplicata si Data science">Statistica Aplicata si Data science</option>
              <option value="Baze de date">Baze de date</option>
              <option value="E-Business">E-Business</option>
              <option value="Securitatea Informatica">Securitatea Informatica</option>
            </select>
            <div className="flex space-x-2">
              <select
                className="bg-gray-700 text-white p-2 rounded w-1/2"
                value={year}
                onChange={handleInputChange((val) => setYear(parseInt(val)))}
              >
                <option value={2}>Year 2</option>
                <option value={3}>Year 3</option>
              </select>
              <Input
                type="text"
                value={studentClass}
                onChange={handleInputChange(setStudentClass)}
                placeholder="Class"
                className="w-1/2"
              />
            </div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
              Register
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterStudent;