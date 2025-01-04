import React from "react";

const Footer = () => {
  return (
    <footer
      style={{ boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.2)" }}
      className="bg-gray-800 text-gray-400 text-xs py-2 w-full"
    >
      <div className="max-w-3xl mx-auto text-center">
        <p className="mb-1">
          This web application was developed by Zara Laura, class E1101, during the
          2024-2025 academic year at CSIE, ASE.
        </p>
        <p className="mb-1">
          Designed to streamline the dissertation registration process for students
          and professors.
        </p>
        <div className="mt-2 flex justify-center space-x-2">
          <a href="https://github.com/laurazara12/Dissertation-Registration-University-Project.git" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:underline">
            GitHub
          </a>
          <span>|</span>
          <a href="mailto:laurazara07@gmail.com" className="text-gray-300 hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;