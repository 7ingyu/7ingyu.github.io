import { MouseEvent, RefObject, forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { ProjectProps } from './Project';
import techLinks from '@/data/tech.json';

interface References {
  badges: RefObject<HTMLDivElement>;
  header: RefObject<HTMLHeadingElement>;
  link: RefObject<HTMLDivElement>;
  // content: RefObject<HTMLDivElement>;
}

type ProjectTimelineProps = ProjectProps & {
  handleClick: (idx: number) => void,
  // timeline: RefObject<Timeline>,
  open: Array<boolean>,
  toAnimate: Array<number>,
};

const ProjectCollapse = forwardRef((
  { handleClick, toAnimate, open, idx, name, color, tech }: ProjectTimelineProps,
  ref
) => {
  const [ zIndex, setZIndex ] = useState<number>(0);
  const links: { [key:string]: string } = techLinks;

  const references: References = {
    header: useRef(null),
    link: useRef(null),
    badges: useRef(null),
  };

  useImperativeHandle(ref, () => (references));

  const handleHeaderClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleClick(idx);
  }

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
        <div
          className=""
          ref={references.link}
          onClick={handleHeaderClick}
          aria-controls={`collapse-${idx}-${name.toLowerCase()}`}
          aria-expanded={open[idx]}
          style={{
            backgroundColor: `var(--bs-${color})`,
          }}
        >
          <div className='container h-100'>
            <div className="position-relative d-flex align-items-center justify-content-between h-100">
              <div className='d-flex align-items-center justify-content-center h-100 py-1'>
                <a
                  href={`#${name.toLowerCase()}`}
                  className="badge bg-white text-black"
                >
                  {name}
                </a>
              </div>
              <div ref={references.badges} className="d-flex align-items-center h-100">
                {tech.map((item, i) =>
                  <a
                    key={`project-${idx}-tech-${i}-${item}`}
                    href={links?.[item.toLowerCase()] || '#'}
                    className="badge bg-white m-1 h-100"
                    style={{color: `var(--bs-${color})`}}
                    // ref={el => references.badges.current?.push(el)}
                  >
                    <img className="badge-image" src={`${item.toLowerCase()}.png`} alt={item} title={item} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </h2>
    </>
  );
});

export default ProjectCollapse;