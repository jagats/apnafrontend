import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <main className="flex-grow pt-16 p-4 w-full">
        <Outlet /> {/* This renders Profile, Topics, Progress */}
      </main>
    </div>
  );
}