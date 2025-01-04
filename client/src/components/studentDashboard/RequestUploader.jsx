import { useState } from "react";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";

const RequestUploader = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("cerere", file);

    try {
      const response = await fetch("http://localhost:3000/final-request/student", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(`Upload failed: ${message}`);
      }
      
      const data = await response.json();
      console.log(data);
      setSuccessMessage("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(`Failed to upload the file: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Upload Request</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-2 mb-4 bg-gray-600 text-white rounded"
      />
      <Button
        className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-lg"
        onClick={handleSubmit}
      >
        {isLoading ? "Uploading..." : "Upload"}
      </Button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
    </div>
  );
};

export default RequestUploader;