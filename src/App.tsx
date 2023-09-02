import React, { useEffect, useState } from 'react';
// import { Tween, Timeline, ScrollTrigger } from 'react-gsap';
import {Nav, Animation, Landing, About, Project} from './components';
import projects from './data/projects.json';

const components: { [key: string]: React.ComponentType } = {
  Landing, About, Project
};

const App = () => {

  const [ page, setPage ] = useState<string>('Landing');
  const [ Component, setComponent ] = useState<React.ComponentType<P>>(Landing);

  useEffect(() => {
    setComponent(components[page]);
  }, [page]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, pageName: string) => {
    e.preventDefault();
    setPage(pageName);
  };

  return (
    <div>
      <header className='container'>
        <h1>
          <a
            aria-current={page === 'Landing' ? 'page' : false}
            href={`#landing`}
            onClick={(e) => handleClick(e, 'Landing')}
          >
            Tea Portfolio
          </a>
        </h1>
      </header>
      <nav>
        <ul className='list-group'>
          {Object.keys(components).map((name, i) => (
            <li
              key={`li-${i}-${name.toLowerCase()}`}
              className="nav-collapse list-group-item"
            >
              <a
                className="nav-collapse-toggle"
                aria-current={page === name ? 'page' : false}
                href={`#${name.toLowerCase()}`}
                onClick={(e) => handleClick(e, name)}
              >
                <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default App;
