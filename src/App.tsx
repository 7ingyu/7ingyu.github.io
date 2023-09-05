// import React, { useEffect, useState, MouseEvent, ComponentType } from 'react';
// import { Collapse } from 'bootstrap';
import {Landing, About, Project} from './components';
import projects from './data/projects.json';

// const components: { [key: string]: React.ComponentType } = {
//   Landing, About
// };

const App = () => {
  return (
    <div>
      <header className='container'>
        <h1 className="m-0 p-0">
          <a
            href={`#landing`}
          >
            Tea Portfolio
          </a>
        </h1>
      </header>
      {/* <main>
        {projects.map((proj, idx) => (
          idx && <Project {...{idx, ...proj}} key={`project-${idx}`}/>
        ))}
      </main> */}
      <Project />
      <footer>
        {/* Contact Info Here*/}
      </footer>
    </div>
  );
};

export default App;
