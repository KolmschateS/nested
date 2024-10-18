import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-neutral-100">Nested</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;