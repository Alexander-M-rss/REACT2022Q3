import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

type pageTitles = 'Main Page' | 'About Us' | 'Not Found';

export const links = {
  main: {
    to: '/',
    title: 'Main',
  },
  about: {
    to: '/about',
    title: 'About Us',
  },
};

interface Ilink {
  to: string;
  title: string;
}

interface IHeaderProps {
  title: pageTitles;
  links: Ilink[];
}

function Header({ title, links }: IHeaderProps) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <nav>
        <ul className="nav__list">
          {links.map((link) => {
            return (
              <li key={link.to}>
                <Link className="link" to={link.to}>
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
