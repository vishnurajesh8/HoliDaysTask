import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-500 to-yellow-500 text-white mt-16">
      <div className="container mx-auto py-8 px-4">
        <p className="text-center">&copy; {new Date().getFullYear()} Holi Vibes. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;