import { MouseEvent, RefObject, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Timeline } from 'react-gsap';
import { ProjectProps } from './Project';
import ProjectScroll from './ProjectScroll';

interface References {
  section: RefObject<HTMLElement>;
  bg: RefObject<HTMLDivElement>;
  header: RefObject<HTMLHeadingElement>;
  link: RefObject<HTMLAnchorElement>;
  // content: RefObject<HTMLDivElement>;
}

type ProjectTimelineProps = ProjectProps & {
  handleClick: () => void,
  timeline: RefObject<Timeline>
};

const ProjectCollapse = forwardRef((
  { handleClick, idx, name, color, ...props }: ProjectTimelineProps,
  ref
) => {

  const [ collapsed, setCollapsed ] = useState<boolean>(true);

  const references: References = {
    section: useRef(null),
    header: useRef(null),
    link: useRef(null),
    bg: useRef(null)
  };

  useImperativeHandle(ref, () => (references));

  const handleHeaderClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    handleClick();
    setTimeout(() => setCollapsed(!collapsed), 1000);
  }

  return (
    <>
      <h2
        className='project-header m-0 p-0'
        ref={references.header}
        style={{
          backgroundColor: `var(--bs-${color})`,
          zIndex: collapsed ? idx + 1 : 100,
        }}
        id={`toggle-${idx}-${name.toLowerCase()}`}
      >
        <a
          ref={references.link}
          href={`#${name.toLowerCase()}`}
          onClick={handleHeaderClick}
          aria-controls={`collapse-${idx}-${name.toLowerCase()}`}
          aria-expanded={!collapsed}
          style={{
            backgroundColor: `var(--bs-${color})`,
          }}
        >
          <span >{name}</span>
        </a>
      </h2>
      <section
        id={`project-${idx}-${name}-section`}
        ref={references.bg}
        className="project-section bg-primary"
        style={{zIndex: idx}}
      >
        <ProjectScroll {...{handleClick, idx, name, color, ...props}} />
      </section>
    </>
  );
});

export default ProjectCollapse;