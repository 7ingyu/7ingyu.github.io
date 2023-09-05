import { RefObject, useRef, useEffect, useState } from 'react';
import { Tween, Timeline, PlayState } from 'react-gsap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ProjectProps } from './Project';
import ProjectContent from './ProjectContent';
import { imgKeys } from '@/utils/animation';

// interface References {
//   section: RefObject<HTMLElement>;
//   bg: RefObject<HTMLDivElement>;
//   header: RefObject<HTMLAnchorElement>;
//   content: LegacyRef<ScrollTrigger>;
// }

type ProjectScrollProps = ProjectProps & {
  open: boolean
};

const ProjectScroll = ({ open, idx, name, color, ...props }: ProjectScrollProps) => {
  const timeline: RefObject<Timeline> = useRef(null);
  const [ scrolltrigger, setScrolltrigger ] = useState<ScrollTrigger | null>(null);

  const img = imgKeys();
  // const container = containerKeys({idx});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, [])

  useEffect(() => {
    // return;
    if (open && !scrolltrigger) {
      // console.log('scroll created');
      const trigger = ScrollTrigger.create({
        animation: timeline.current?.getGSAP(),
        trigger: 'main',
        start: "top 50px",
        // end: "+=6000px",
        fastScrollEnd: 3000,
        onToggle: self => console.log("toggled, isActive:", self.isActive),
        onUpdate: self => {
          console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
        },
        pin: true,
        // pinnedContainer: 'main',
        preventOverlaps: true,
        scrub: 0.5,
        snap: "labels",
      });
      setScrolltrigger(trigger);
    } else if (!open && !!scrolltrigger) {
      // console.log('scroll killed');
      scrolltrigger?.kill(true, true);
      setScrolltrigger(null);
    }
  }, [scrolltrigger, open])

  return (
    <Timeline
      ref={timeline}
      target={<ProjectContent {...{idx, name, color, ...props}} />}
      playState={PlayState.pause}
    >
      <Tween target="img" position={0} duration={0} to={img[0]} />
      <Tween target="preview" position={0} duration={0} to={{x: '-100vw'}} />
      <Tween target="desc" position={0} duration={0} to={{x: '100vw'}} />
      <Tween target="badges" position={0} duration={0} to={{y: '-100vh', opacity: 0}} />

      <Tween target="img" position={1} duration={1} to={img[1]} />
      <Tween target="preview" position={1} duration={0} to={{opacity: 1}} />
      <Tween target="desc" position={1} duration={0} to={{opacity: 1}} />
      <Tween target="badges" position={1} duration={0} to={{opacity: 1}} />

      <Tween target="desc" position={2} duration={1} to={{x: '0'}} />
      <Tween target="preview" position={2} duration={1} to={{x: '0'}} />

      <Tween target="badges" position={3} duration={4} to={{y: '0'}} stagger={0.5}/>
      <Tween target="badges" position={7} duration={1} from={{y: '0'}} to={{y: '0'}} />

      <Tween target="desc" position={8} duration={2} to={{opacity: 0}}/>
      <Tween target="preview" position={8} duration={2} to={{opacity: 0}}/>
      <Tween target="img" position={8} duration={2} to={img[2]} />
    </Timeline>
  );
};

export default ProjectScroll;
