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
    const trigger = ScrollTrigger.create({
      animation: timeline.current?.getGSAP(),
      trigger: 'main',
      start: "top 10px",
      end: "+=6000px",
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
  }, [idx, name])

  useEffect(() => {
    if (open) {
      scrolltrigger?.enable(true);
    } else {
      scrolltrigger?.disable(true);
    }
  }, [scrolltrigger, open])

  return (
    <Timeline
      ref={timeline}
      target={<ProjectContent {...{idx, name, color, ...props}} />}
      playState={PlayState.pause}
    >
      <Tween target="img" position={1} duration={1} from={img[0]} to={img[1]} />
      <Tween target="img" position={2} duration={1} from={img[1]} to={img[0]} />
    </Timeline>
  );
};

export default ProjectScroll;
