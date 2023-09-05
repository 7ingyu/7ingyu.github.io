import { RefObject, useRef, useState, useEffect, useCallback } from 'react';
import { Tween, Timeline, PlayState } from 'react-gsap';
import ProjectCollapse from './ProjectCollapse';
import ProjectScroll from './ProjectScroll';
import projects from '@/data/projects.json';
import { headerKeys, linkKeys, bgKeys } from '@/utils';
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

const Project = () => {
  const [ open, setOpen ] = useState<Array<boolean>>(projects.map(() => false));
  // const [ animating, setAnimating ] = useState<Array<boolean>>(projects.map(() => false));
  const [ toAnimate, setToAnimate ] = useState<Array<number>>([]);

  const nav: RefObject<Array<Timeline | null>> = useRef([]);
  const scroll: RefObject<Array<Timeline | null>> = useRef([]);

  const handleClick = (idx: number) => {
    // close any other tabs if necessary
    const openTab = open.indexOf(true);
    const queue = [];
    if (openTab !== idx && openTab >= 0) {
      queue.push(openTab);
    }
    queue.push(idx);
    setToAnimate(queue);
  };

  useEffect(() => {
    const handleCollapse = (idx: number, bool: boolean) => {
      const arr = [...open];
      arr[idx] = bool;
      setOpen(arr);
      const queue = [...toAnimate];
      if (queue[0] === idx) {
        queue.shift();
        setToAnimate(queue);
      }
    };
    const animate = (idx: number) => {
      const progress = nav.current?.[idx]?.getGSAP().totalProgress();
      const next = nav.current?.[idx]?.getGSAP().nextLabel();
      const isPaused = nav.current?.[idx]?.getGSAP().paused();
      // console.log({ progress, next, isPaused });
      if (progress === 1) {
        // console.log('at end -> resetting and playing')
        nav.current?.[idx]?.getGSAP().totalProgress(0).tweenTo('opened').then(() => handleCollapse(idx, true));
        scroll.current?.[idx]?.getGSAP().totalProgress(0).tweenTo('opened');
      } else if (progress === 0) {
        // console.log('playing from start to opened')
        nav.current?.[idx]?.getGSAP().tweenTo('opened').then(() => handleCollapse(idx, true));
        scroll.current?.[idx]?.getGSAP().tweenTo('opened');
      } else if (progress && isPaused) {
        // console.log('opened -> now closing')
        nav.current?.[idx]?.getGSAP().play().then(() => handleCollapse(idx, false));
        scroll.current?.[idx]?.getGSAP().play();
      } else if (progress > 0 && next == 'opened') {
        // console.log('was opening -> now reversing to start')
        nav.current?.[idx]?.getGSAP().reverse().then(() => handleCollapse(idx, false));
        scroll.current?.[idx]?.getGSAP().reverse();
      } else if (progress > 0 && next == 'end') {
        // console.log('was closing -> now re-opening')
        nav.current?.[idx]?.getGSAP().tweenTo('opened').then(() => handleCollapse(idx, true));
        scroll.current?.[idx]?.getGSAP().tweenTo('opened');
      }
    };
    if (toAnimate.length) animate(toAnimate[0]);
  }, [toAnimate, open])

  return (
    <>
      <nav>
        {projects.map(({color, ...props}, idx) => (
          <Timeline
            ref={el => nav.current?.push(el)}
            key={`nav-timeline-${idx}`}
            target={<ProjectCollapse {...{
              handleClick, toAnimate, open, idx, color, ...props}} />}
            labels={[
              {label: 'start', position: 0},
              {label: 'opened', position: 2},
              {label: 'end', position: 4}
            ]}
            playState={PlayState.pause}
          >
            {/* Header gets large */}
            <Tween target="header" position="0" duration={1} from={headerKeys({idx, color})[0]} to={headerKeys({idx, color})[1]} />
            <Tween target="link" position="0" duration={1} from={linkKeys()[0]} to={linkKeys()[1]} />

            {/* Header shrinks to top as bg expands */}
            <Tween target="header" position="1" duration={1} to={headerKeys({idx, color})[2]} />
            <Tween target="link" position="1" duration={1} to={linkKeys()[2]} />

            {/* Switch states */}
            <Tween target="header" position="2" duration={0} to={headerKeys({idx, color})[3]} />

            {/* Header slides down */}
            <Tween target="header" position="3" duration={0.5} to={headerKeys({idx, color})[4]} />
            <Tween target="link" position="3" duration={0.5} to={linkKeys()[0]} />

            <Tween target="header" position="4" duration={0} to={headerKeys({idx, color})[0]} />
          </Timeline>
        ))}
      </nav>
      <main>
        {projects.map(({color, name, ...props}, idx) => (
          <Timeline
            ref={el => scroll.current?.push(el)}
            key={`nav-timeline-${idx}`}
            target={
              <section
                id={`project-${idx}-${name.toLowerCase()}-bg`}
                className="project-bg"
                style={{
                  // backgroundColor: `var(--bs-${color})`,
                  backgroundColor: 'black',
                  zIndex: open[idx] ? 1 : 0
                }}
              >
                {/* {open
                  ? <ProjectScroll {...{idx, name, color, ...props}} />
                  : <ProjectContent {...{idx, name, color, ...props}} />
                } */}
                <ProjectScroll {...{open: open[idx], idx, color, name, ...props}} />
              </section>
            }
            labels={[
              {label: 'start', position: 0},
              {label: 'opened', position: 2},
              {label: 'end', position: 4}
            ]}
            playState={PlayState.pause}
          >
            <Tween target="bg" to={bgKeys({idx})[0]} position="0" duration={0} />
            {/* Header shrinks to top as bg expands */}
            <Tween to={bgKeys({idx})[1]} position="1" duration={0} />
            <Tween target="bg" to={bgKeys({idx})[1]} position="1" duration={0} />
            <Tween target="bg" to={bgKeys({idx})[1]} position="2" duration={0} />
            {/* Header slides down */}
            <Tween target="bg" to={bgKeys({idx})[0]} position="3" duration={0.6} />
          </Timeline>
        ))}
      </main>
    </>
  );
};

export default Project;