import { useState } from "react";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    onLogin({ email, password });
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-800 p-4">
      <form
        className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-sm" // Updated to rounded-xl for larger rounding
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-200">
          Log In
        </h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="mb-4 w-full text-black rounded-xl" 
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="mb-6 w-full text-black rounded-xl" 
        />
        <Button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition duration-300" type="submit">
          LOGIN
        </Button>
      </form>
    </div>
  );
};

export default Login;