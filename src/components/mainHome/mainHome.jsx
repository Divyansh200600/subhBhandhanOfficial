import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Dashboard from '../homeComps/home/home'; 
import Events from '../homeComps/events/event';
import Profile from '../homeComps/profile/profile';
import Settings from '../homeComps/settings/setting';

// Import the company logo image
import companyLogo from '../../assets/shubhLogo.png';

// Import icons from Heroicons
import { HomeIcon, CalendarIcon, UserIcon, CogIcon } from '@heroicons/react/outline';

const NavBar = () => {
  const linkClasses = isActive => `transition-colors duration-300 ${isActive ? 'text-green-400' : 'text-white hover:text-black'}`;

  return (
    <>
      {/* PC Navigation Bar */}
      <div className="hidden md:flex justify-between items-center fixed top-0 w-full z-10 bg-gradient-to-r from-purple-400 to-blue-400 py-4 px-8 shadow-lg">
        <div className="flex items-center">
          <img src={companyLogo} alt="Company Logo" className="h-14 w-14 mr-2" />
          <span className="text-white text-4xl font-bold"> शुभ बंधन</span>
        </div>
        <div className="flex space-x-8">
          <NavLink to="/home" className={({ isActive }) => linkClasses(isActive)}>
            Dashboard
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => linkClasses(isActive)}>
            Events
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => linkClasses(isActive)}>
            Profile
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => linkClasses(isActive)}>
            Settings
          </NavLink>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="flex md:hidden flex-col fixed top-0 w-full z-10 bg-gradient-to-r from-purple-600 to-blue-500 py-4 px-4 shadow-lg">
        <div className="flex items-center justify-center mb-2">
          <img src={companyLogo} alt="Company Logo" className="h-8 w-8" />
          <span className="text-white text-2xl font-bold ml-2"> शुभ बंधन</span>
        </div>
      </div>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="flex md:hidden justify-around items-center fixed bottom-0 w-full z-10 bg-gradient-to-r from-purple-600 to-blue-500 py-4 px-8 shadow-lg">
        <NavLink to="/" className={({ isActive }) => linkClasses(isActive)}>
          <HomeIcon className="h-6 w-6" />
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => linkClasses(isActive)}>
          <CalendarIcon className="h-6 w-6" />
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => linkClasses(isActive)}>
          <UserIcon className="h-6 w-6" />
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => linkClasses(isActive)}>
          <CogIcon className="h-6 w-6" />
        </NavLink>
      </div>

      {/* Main Content Area */}
      <div className="pt-20 pb-16 md:pt-16 md:pb-0">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </>
  );
};

export default NavBar;
