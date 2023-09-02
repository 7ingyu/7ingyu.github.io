import React, { useEffect, useState, MouseEvent, ComponentType } from 'react';
import { Collapse } from 'bootstrap';
import {Landing, About, Project} from './components';
import projects from './data/projects.json';

const components: { [key: string]: React.ComponentType } = {
  Landing, About
};

const App = () => {
  const [ collapses, setCollapses ] = useState<Collapse[]>([]);

  useEffect(() => {
    const els = document.querySelectorAll('.collapse');
    const cols = [...els].map(collapseEl => new Collapse(collapseEl, {toggle: false}));
    cols.forEach(col => col.show())
    setCollapses(cols);
  }, [])

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, i: number) => {
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
            const Component: ComponentType = components[name];
            return (
              <li
                key={`li-${i}-${name.toLowerCase()}`}
                className="nav-collapse list-group-item"
              >
                <Component />
              </li>
            )
          })}
          {projects.map((proj, idx) => (
            <li
            key={`li-project-${idx}}`}
            className="nav-collapse list-group-item"
          >
            <Project {...{idx, ...proj}} />
          </li>
          ))}
        </ul>
      </main>
      <footer>
        {/* Contact Info Here*/}
      </footer>
    </div>
  );
};

export default App;
