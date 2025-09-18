import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-700 shadow-inner text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-6 justify-center">
          <a
            href="/"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Dashboard
          </a>
          <a
            href="/salary-table"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Salary Table
          </a>
          <a
            href="/leavestatus"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Leave Status
          </a>
        </div>

        <p className="text-center text-sm text-blue-200 mt-4">
          © {new Date().getFullYear()} Urban Council. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
