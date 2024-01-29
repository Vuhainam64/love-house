// Breadcrumb.jsx

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
 

  const pathSegments = location.pathname.split('/').filter((segment) => segment !== '');
  const breadcrumbItems = [{ label: 'Home', path: '/' }];

  pathSegments.forEach((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    breadcrumbItems.push({ label: segment, path });
  });

  return (
    <nav className="bg-[#f6f6f6] mr-10 pl-40 w-full h-10 flex items-center">
      <ol className="list-reset flex ml-6">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <li>
                <span className="mx-2 text-neutral-500 dark:text-neutral-400 ">{'>'}</span>
              </li>
            )}
            <li>
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-baseOrange dark:text-baseOrange">{item.label}</span>
              ) : (
                <NavLink
                  to={item.path}
                  className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
