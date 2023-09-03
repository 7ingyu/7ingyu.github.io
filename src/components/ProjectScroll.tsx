import { MouseEventHandler, MouseEvent, RefObject, forwardRef, useImperativeHandle, useRef, useState, LegacyRef, useEffect } from 'react';
import { Tween, Timeline, ScrollTrigger } from 'react-gsap';
import { ProjectProps } from './Project';
import ProjectContent from './ProjectContent';
import projects from '@/data/projects.json';

// interface References {
//   section: RefObject<HTMLElement>;
//   bg: RefObject<HTMLDivElement>;
//   header: RefObject<HTMLAnchorElement>;
//   content: LegacyRef<ScrollTrigger>;
// }

// type ProjectScrollProps = ProjectProps & {
//   handleClick: MouseEventHandler<HTMLAnchorElement>,
//   timeline: RefObject<Timeline>
// };

const ProjectScroll = (
// forwardRef((
  { idx, name, color, ...props }: ProjectProps,
  // ref
) => {

  // const scrolltrigger: RefObject<ScrollTrigger> = useRef(null);
  // const [ collapsed, setCollapsed ] = useState<boolean>(true);

  // const references: References = {
  //   section: useRef(null),
  //   header: useRef(null),
  //   bg: useRef(null),
  //   content: useRef(null)
  // };

  // useImperativeHandle(ref, () => (references));

  // useEffect(() => {
  //   scrolltrigger.current?.getGSAP().disable();
  // })

  // const handleHeaderClick = (event: MouseEvent<HTMLAnchorElement>) => {
  //   if (collapsed) {
  //     scrolltrigger.current?.getGSAP().enable();
  //   } else {
  //     scrolltrigger.current?.getGSAP().disable();
  //   }
  //   handleClick(event);
  //   setCollapsed(!collapsed);
  // }

  return (
      <ScrollTrigger
        // ref={scrolltrigger}
        trigger={`#project-${idx}-${name}-bg`}
        start="top 300px"
        end="6000px bottom"
        markers={true}
        scrub={0.5}
        // pin={true}
      >
        <Timeline target={<ProjectContent {...{idx, name, color, ...props}} />} >
          <Tween
            target="img"
            from={{
              width: '100%',
            }}
            to={{
              width: '50%',
            }}
          />
                    {/* <Tween
            target="container"
            from={{
              height: '0px'
            }}
            to={{
              height: `calc(100vh - ${(projects.length - idx - 1) * 2}rem - 3rem)`
            }}
            position="0"
            duration={0}
          /> */}
          {/* <Tween
            target="badges"
            from={{ y: '10px', opacity: '0' }}
            to={{ x: '0px', opacity: '1' }}
            stagger={0.1}
            position="0"
          /> */}
        </Timeline>
      </ScrollTrigger>
  );
};

export default ProjectScroll;