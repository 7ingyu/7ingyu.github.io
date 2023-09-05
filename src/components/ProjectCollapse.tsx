import { MouseEvent, RefObject, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Timeline } from 'react-gsap';
import { ProjectProps } from './Project';
import ProjectScroll from './ProjectScroll';
import ProjectContent from './ProjectContent';

interface References {
  bg: RefObject<HTMLDivElement>;
  header: RefObject<HTMLHeadingElement>;
  link: RefObject<HTMLAnchorElement>;
  // content: RefObject<HTMLDivElement>;
}

type ProjectTimelineProps = ProjectProps & {
  handleClick: () => void,
  // timeline: RefObject<Timeline>,
  open: boolean
};

const ProjectCollapse = forwardRef((
  { handleClick, open, idx, name, color, ...props }: ProjectTimelineProps,
  ref
) => {

  const references: References = {
    header: useRef(null),
    link: useRef(null),
    bg: useRef(null)
  };

  useImperativeHandle(ref, () => (references));

  const handleHeaderClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    handleClick();
  }

  // useEffect(() => {
  //   const container = document.querySelector(`project-container-${idx}-${name.toLowerCase()}`) as HTMLElement;
  //   if (collapsed) {
  //     container?.style.setProperty('position', 'fixed');
  //   }
  // }, [collapsed])

  return (
    <>
      <h2
        className='project-header m-0 p-0'
        ref={references.header}
        style={{
          backgroundColor: `var(--bs-${color})`,
          zIndex: !open ? idx + 1 : 100,
        }}
        id={`toggle-${idx}-${name.toLowerCase()}`}
      >
        <a
          ref={references.link}
          href={`#${name.toLowerCase()}`}
          onClick={handleHeaderClick}
          aria-controls={`collapse-${idx}-${name.toLowerCase()}`}
          aria-expanded={open}
          style={{
            backgroundColor: `var(--bs-${color})`,
          }}
        >
          <span >{name}</span>
        </a>
      </h2>
      <section
        id={`project-${idx}-${name}-bg`}
        ref={references.bg}
        className="project-bg"
        style={{
          // backgroundColor: `var(--bs-${color})`,
          backgroundColor: 'red',
          zIndex: idx
        }}
      >
        {/* {open
          ? <ProjectScroll {...{idx, name, color, ...props}} />
          : <ProjectContent {...{idx, name, color, ...props}} />
        } */}
        <ProjectScroll {...{open, idx, name, color, ...props}} />
      </section>
    </>
  );
});

export default ProjectCollapse;