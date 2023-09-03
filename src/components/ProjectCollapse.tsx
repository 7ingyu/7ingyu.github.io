import { MouseEventHandler, MouseEvent, RefObject, forwardRef, useImperativeHandle, useRef, useState, LegacyRef, useEffect } from 'react';
import { Tween, Timeline, ScrollTrigger } from 'react-gsap';
import { ProjectProps } from './Project';
import ProjectContent from './ProjectContent';
import projects from '@/data/projects.json';

interface References {
  section: RefObject<HTMLElement>;
  bg: RefObject<HTMLDivElement>;
  header: RefObject<HTMLAnchorElement>;
  content: LegacyRef<ScrollTrigger>;
}

type ProjectTimelineProps = ProjectProps & {
  handleClick: MouseEventHandler<HTMLAnchorElement>,
  timeline: RefObject<Timeline>
};

const ProjectCollapse = forwardRef((
  { timeline, handleClick, idx, name, color, ...props }: ProjectTimelineProps,
  ref
) => {

  const scrolltrigger: RefObject<ScrollTrigger> = useRef(null);
  const [ collapsed, setCollapsed ] = useState<boolean>(true);

  const references: References = {
    section: useRef(null),
    header: useRef(null),
    bg: useRef(null),
    content: useRef(null)
  };

  useImperativeHandle(ref, () => (references));

  useEffect(() => {
    scrolltrigger.current?.getGSAP().disable();
  })

  const handleHeaderClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (collapsed) {
      scrolltrigger.current?.getGSAP().enable();
    } else {
      scrolltrigger.current?.getGSAP().disable();
    }
    handleClick(event);
    setCollapsed(!collapsed);
  }

  return (
    <>
      <section
        ref={references.section}
        id={`project-${idx}-${name.toLowerCase()}`}
        style={{
          backgroundColor: `var(--bs-${color})`,
        }}
      >
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
      </section>
    </>
  );
});

export default ProjectCollapse;