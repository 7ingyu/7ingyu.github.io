import { MouseEvent, RefObject, forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { ProjectProps } from './Project';

interface References {
  bg: RefObject<HTMLDivElement>;
  header: RefObject<HTMLHeadingElement>;
  link: RefObject<HTMLAnchorElement>;
  // content: RefObject<HTMLDivElement>;
}

type ProjectTimelineProps = ProjectProps & {
  handleClick: (idx: number) => void,
  // timeline: RefObject<Timeline>,
  open: Array<boolean>,
  toAnimate: Array<number>,
};

const ProjectCollapse = forwardRef((
  { handleClick, toAnimate, open, idx, name, color }: ProjectTimelineProps,
  ref
) => {
  const [ zIndex, setZIndex ] = useState<number>(0);

  const references: References = {
    header: useRef(null),
    link: useRef(null),
    bg: useRef(null)
  };

  useImperativeHandle(ref, () => (references));

  const handleHeaderClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    handleClick(idx);
  }

  // useEffect(() => {
  //   const container = document.querySelector(`project-container-${idx}-${name.toLowerCase()}`) as HTMLElement;
  //   if (collapsed) {
  //     container?.style.setProperty('position', 'fixed');
  //   }
  // }, [collapsed])

  useEffect(() => {
    let z = 0
    const current = open.indexOf(true);
    let [ opening, closing ] = [-1, -1];
    if (toAnimate.length > 1) {
      [ closing, opening ] = toAnimate;
    } else if (toAnimate.length) {
      opening = toAnimate[0]
    }
    if ((open[idx] && closing !== idx) || opening === idx) {
      z = 100;
    } else if (opening > -1) {
      if (idx > opening) z = 100;
    } else if (opening === -1) {
      if (idx > current) z = 100;
    }
    setZIndex(z);
  }, [open, toAnimate, idx])

  return (
    <>
      <h2
        className='project-header m-0 p-0'
        ref={references.header}
        style={{
          backgroundColor: `var(--bs-${color})`,
          zIndex,
        }}
        id={`toggle-${idx}-${name.toLowerCase()}`}
      >
        <a
          ref={references.link}
          href={`#${name.toLowerCase()}`}
          onClick={handleHeaderClick}
          aria-controls={`collapse-${idx}-${name.toLowerCase()}`}
          aria-expanded={open[idx]}
          style={{
            backgroundColor: `var(--bs-${color})`,
          }}
        >
          <span >{name}</span>
        </a>
      </h2>
    </>
  );
});

export default ProjectCollapse;