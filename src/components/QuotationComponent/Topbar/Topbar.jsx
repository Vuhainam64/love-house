// Topbar.js
import React from 'react';


const Topbar = () => {
  return (
    <div className="topbar z-50 sticky top-0 scroll-smooth">
      
      <nav className="nav-links py-2 scroll-smooth bg-red-300">
        <ul className='text-xl flex justify-center space-x-10'>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#material">Material</a></li>
        </ul>
      
      </nav>
    </div>
  );
};

export default Topbar;
