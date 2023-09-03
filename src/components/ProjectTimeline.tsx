import { MouseEventHandler, MouseEvent, RefObject, forwardRef, useImperativeHandle, useRef, useState, LegacyRef } from 'react';
import { Tween, Timeline, ScrollTrigger } from 'react-gsap';
import { ProjectProps } from './Project';
import ProjectContent from './ProjectContent';
// import projects from '@/data/projects.json';

interface References {
  section: RefObject<HTMLElement>;
  pin: RefObject<HTMLDivElement>;
  header: RefObject<HTMLAnchorElement>;
  content: LegacyRef<ScrollTrigger>;
}

type ProjectTimelineProps = ProjectProps & {
  handleClick: MouseEventHandler<HTMLAnchorElement>,
  timeline: RefObject<Timeline>
};

const ProjectTimeline = forwardRef((
  { timeline, handleClick, idx, name, color, ...props }: ProjectTimelineProps,
  ref
) => {
  const [ collapsed, setCollapsed ] = useState<boolean>(true);

  const references: References = {
    section: useRef(null),
    header: useRef(null),
    pin: useRef(null),
    content: useRef(null)
  };

  useImperativeHandle(ref, () => (references));

  const handleHeaderClick = (event: MouseEvent<HTMLAnchorElement>) => {
    handleClick(event);
    setCollapsed(!collapsed);
  }

  return (
    <section
      ref={references.section}
      id={`project-${idx}-${name.toLowerCase()}`}
      style={{
        backgroundColor: `var(--bs-${color})`,
      }}
    >
      {/* <div
        ref={references.pin}
        className='pin'
        style={{
          backgroundColor: `var(--bs-${color})`,
        }}
      > */}
        <a
          id={`toggle-${idx}-${name.toLowerCase()}`}
          className='project-header'
          ref={references.header}
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
        <ScrollTrigger
          ref={references.content}
          trigger="container"
          start="top top"
          end="bottom bottom"
          markers={true}
          scrub={0.5}
          // pin={timeline.current?.getGSAP().progress() ? true : false}
        >
          <Timeline target={<ProjectContent {...{idx, name, color, ...props}} />} >
            {/* <Tween
              target="container"
            /> */}
          </Timeline>
        </ScrollTrigger>
      {/* </div> */}
    </section>
  );
});

export default ProjectTimeline;