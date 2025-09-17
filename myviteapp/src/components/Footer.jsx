import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-purple-500 shadow-lg text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex space-x-4 justify-center">
          <a href="/" className="hover:text-blue-300">Dashboard</a>
          <a href="/salary-table" className="hover:text-blue-300">Salary Table</a>
          <a href="/leavestatus" className="hover:text-blue-300">Leave Status</a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;