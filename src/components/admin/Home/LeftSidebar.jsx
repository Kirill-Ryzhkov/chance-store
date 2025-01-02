import React from 'react';
import { Link } from 'react-router-dom';

export default function LeftSidebar() {
  const menuItems = [
    { name: 'cafe', link: '/admin/cafe' },
    { name: 'merch', link: '/admin/merch' }
  ];
  return (
    <div className="w-64 p-4 flex flex-col">
      <h2 className="text-3xl font-bold mb-4 regular-bold-font">Menu</h2>
      <ul className="text-2xl space-y-2 regular-not-bold-font">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.link}
              className="block px-2 py-2 underline"
            >
                {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}