import React from "react";
import Footer from "../components/Footer.jsx"; // Adjust the path if necessary

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <div className="flex-grow flex flex-col items-center text-gray-200 font-helvetica p-6 mt-24"> {/* Increased top margin to mt-24 */}
        <h1 className="text-5xl font-bold mb-4 p-3">Welcome</h1>
        <div className="max-w-3xl p-5 w-full grid grid-cols-1 md:grid-cols-2 gap-14">
          <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mt-4">As a Student:</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Register and log in using the <span className="font-semibold">@stud.ase.ro</span> email prefix.</li>
              <li>Once you're logged in, select the professor you want to request for your dissertation.</li>
              <li>After being selected by the coordinating professor, you can upload your signed request.</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mt-4">As a Professor:</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Register and log in using the <span className="font-semibold">@csie.ase.ro</span> email prefix.</li>
              <li>After logging in, you can start your own session.</li>
              <li>Upon receiving requests from students, you can choose to accept or reject them.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;