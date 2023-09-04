import { RefObject, useRef } from 'react';
import { Tween, Timeline, PlayState } from 'react-gsap';
import ProjectCollapse from './ProjectCollapse';
// import projects from '@/data/projects.json';
import { headerKeys, linkKeys, bgKeys } from '@/utils/animation';
// import gsap from 'gsap';

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

const Project = ({idx, name, color, ...props}: ProjectProps) => {
  // const [ open, setOpen ] = useState<boolean>(false);

  const timeline: RefObject<Timeline> = useRef(null);
  // const tween1: RefObject<Tween> = useRef(null);
  // const tween2: RefObject<Tween> = useRef(null);

  const header = headerKeys({idx, color});
  const link = linkKeys();
  const bg = bgKeys({idx});

  const handleClick = () => {
    const progress = timeline.current?.getGSAP().totalProgress();
    const next = timeline.current?.getGSAP().nextLabel();
    const isPaused = timeline.current?.getGSAP().paused();
    console.log({ progress, next, isPaused });
    // const isClosing = timeline.current?.getGSAP().reversed();
    // const headerEl = document.querySelector(`#toggle-${idx}-${name.toLowerCase()}`) as HTMLElement;
    if (progress === 1) {
      //animation ended, reset
      console.log('at end -> resetting and playing')
      timeline.current?.getGSAP().totalProgress(0).tweenTo('opened');
    } else if (progress === 0) {
      console.log('playing from start to opened')
      timeline.current?.getGSAP().tweenTo('opened');
    } else if (progress && isPaused) {
      console.log('opened -> now closing')
      timeline.current?.getGSAP().play();
    } else if (progress > 0 && next == 'opened') {
      console.log('was opening -> now reversing to start')
      timeline.current?.getGSAP().reverse();
    } else if (progress > 0 && next == 'end') {
      console.log('was closing -> now re-opening')
      timeline.current?.getGSAP().tweenTo('opened');
    }
    // setTimeout(() => setOpen(!open), 1000);
  };

  return (
    <Timeline
      ref={timeline}
      target={<ProjectCollapse {...{
        handleClick, timeline, idx, name, color, ...props}} />}
      labels={[
        {label: 'start', position: 0},
        {label: 'opened', position: 2},
        {label: 'end', position: 4}
      ]}
      playState={PlayState.pause}
    >
      {/* Header gets large */}
      <Tween target="header" from={header[0]} to={header[1]} position="0" duration={1} />
      <Tween target="link" from={link[0]} to={link[1]} position="0" duration={1} />

      {/* Header shrinks to top as bg expands */}
      <Tween target="header" to={header[2]} position="1" duration={1} />
      <Tween target="link" to={link[2]} position="1" duration={1} />
      <Tween target="bg" from={bg[0]} to={bg[1]} position="1" duration={0} />

      {/* Header is now transparent */}
      <Tween target="header" to={header[3]} position="2" duration={0} />

      {/* Header slides down */}
      <Tween target="header" to={header[4]} position="3" duration={0.5} />
      <Tween target="link" to={link[0]} position="3" duration={0.5} />
      <Tween target="bg" to={bg[0]} position="3" duration={0.5} />

      {/* <Tween target="header" to={header[0]} position="4" duration={0} /> */}
    </Timeline>
  );
};

export default Project;