import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-sm text-gray-700 py-3 px-6 flex justify-between items-center w-full border-t border-gray-200">
      <div>
        Have Questions?{' '}
        <a href="mailto:admin@cloudbalance.com" className="text-blue-500 hover:underline">
          Talk to our team
        </a>
      </div>
      <div className="text-xs text-gray-500">
        CloudKeeper 2025 | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
