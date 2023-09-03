import React, { useEffect, useState, MouseEvent, ComponentType } from 'react';
import { Collapse } from 'bootstrap';
import {Landing, About, Project} from './components';
import projects from './data/projects.json';

const components: { [key: string]: React.ComponentType } = {
  Landing, About
};

const App = () => {
  return (
    <div>
      <header className='container'>
        <h1>
          <a
            href={`#landing`}
          >
            Tea Portfolio
          </a>
        </h1>
      </header>
      <main>
        <ul className='list-group fixed-bottom'>
          {projects.map((proj, idx) => (
            <li
              key={`li-project-${idx}}`}
              className="nav-collapse"
              style={{maxHeight: `calc(100vh - ${2 * (projects.length - 1)}rem)`}}
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
