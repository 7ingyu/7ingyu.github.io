import { RefObject, useRef, useState } from 'react';
import { Tween, Timeline, PlayState } from 'react-gsap';
import ProjectScroll from './ProjectScroll';
import projects from '@/data/projects.json';
import ProjectCollapse from './ProjectCollapse';

export interface ProjectProps {
  "idx": number;
  "name": string;
  "img": string;
  "url": string;
  // "title": string;
  // "teamsize": number;
  "desc": Array<string>;
  "tech": Array<string>;
  "color": string;
}

const Project = ({idx, name, ...props}: ProjectProps) => {
  const [ open, setOpen ] = useState<boolean>(false);
  const timeline: RefObject<Timeline> = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    const progress = timeline.current?.getGSAP().totalProgress();
    const isClosing = timeline.current?.getGSAP().reversed();
    if (!progress) {
      // At 0 & paused/play (start) -> play
      timeline.current?.getGSAP().play();
    } else if (progress === 1) {
      // at 1 & play (ended) -> reverse
      timeline.current?.getGSAP().reverse();
    } else if (progress && isClosing) {
      // > 0 and reverse (rewinding) => play
      timeline.current?.getGSAP().play();
    } else if (progress && !isClosing) {
      // > 0 and play (playing) -> reverse
      timeline.current?.getGSAP().reverse();
    }
    setTimeout(() => setOpen(!open), 1000);
  };

  return (
    <Timeline
      ref={timeline}
      target={<ProjectCollapse {...{handleClick, timeline, idx, name, ...props}} />}
      playState={PlayState.pause}
      totalProgress={0}
    >

      <Tween
        target="header"
        from={{
          height: '2rem',
          bottom: `${(projects.length - idx - 1) * 2}rem`,
          fontSize: '1rem',
        }}
        to={{
          height: `calc(100vh - ${(projects.length - idx - 1) * 2}rem)`,
          bottom: `${(projects.length - idx - 1) * 2}rem`,
          fontSize: '5rem',
        }}
        position="0"
        duration={1}
      />

      <Tween
        target="section"
        from={{
          height: '0vh',
        }}
        to={{
          height: `100vh`,
          overflow: null
        }}
        position="1"
        duration={0}
      />
      {/* <Tween
        target="bg"
        from={{
          height: '0vh',
          position: 'fixed'
        }}
        to={{
          height: `6000px`,
          position: 'static'
        }}
        position="1"
        duration={0}
      /> */}
      <Tween
        target="header"
        to={{
          height: '3rem',
          fontSize: '1.25rem',
          bottom: `calc(100vh - 3rem)`,
        }}
        position="1"
        duration={1}
      />
      <Tween
        from={{
          height: '0px',
          y: '100vh',
        }}
        to={{
          height: `6000px`,
          y: '0vh',
        }}
        position="1"
        duration={1}
      >
        <div
          id={`project-${idx}-${name}-bg`}
          // ref={references.bg}
        >
          {open && <ProjectScroll {...{handleClick, timeline, idx, name, ...props}} />}
        </div>
      </Tween>

    </Timeline>
  );
};

export default Project;