import React, { PropsWithRef, useEffect, useState } from 'react';
import { Collapse } from 'bootstrap';
// import { Tween, Timeline, ScrollTrigger } from 'react-gsap';
import {Nav, Animation, Landing, About, Project} from './components';
import projects from './data/projects.json';

const components: { [key: string]: React.ComponentType } = {
  Landing, About
};

const App = () => {
  const [ collapses, setCollapses ] = useState<Collapse[]>([]);

  useEffect(() => {
    const els = document.querySelectorAll('.collapse');
    const cols = [...els].map(collapseEl => new Collapse(collapseEl, {toggle: false}));
    cols.forEach(col => col.hide())
    setCollapses(cols);
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, i: number) => {
    e.preventDefault();
    collapses[i].toggle();
  }

  return (
    <div>
      <header className='container'>
        <h1>
          <a
            href={`#landing`}
            onClick={(e) => handleClick(e, 0)}
          >
            Tea Portfolio
          </a>
        </h1>
      </header>
      <main>
        <ul className='list-group'>
          {Object.keys(components).map((name, i) => {
            const Component: React.ComponentType = components[name];
            return (
              <li
                key={`li-${i}-${name.toLowerCase()}`}
                className="nav-collapse list-group-item"
              >
                <a
                  className="nav-collapse-toggle"

                  href={`#${name.toLowerCase()}`}
                  onClick={(e) => handleClick(e, i)}
                >
                  <span>{name}</span>
                </a>
                <div className="collapse">
                  <Component />
                </div>
              </li>
            )
          })}
          {projects.map((proj, idx) => (
            <li
            key={`li-project-${idx}}`}
            className="nav-collapse list-group-item"
          >
            <a
              className="nav-collapse-toggle"
              href={`#project-${proj.name.toLowerCase()}`}
              onClick={(e) => handleClick(e, idx + Object.keys(components).length)}
            >
              <span>{proj.name}</span>
            </a>
            <div className="collapse">
              <Project {...{idx, ...proj}} />
            </div>
          </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
