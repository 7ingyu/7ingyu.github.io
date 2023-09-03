import { useState, useEffect, MouseEvent, forwardRef, useRef, MutableRefObject, useImperativeHandle, RefObject } from 'react';
import { Collapse } from 'react-bootstrap';
import { ProjectProps } from './Project';

interface References {
  section: RefObject<HTMLElement>;
  header: RefObject<HTMLAnchorElement>;
  container: RefObject<HTMLDivElement>;
  content: RefObject<HTMLDivElement>;
  img: RefObject<HTMLDivElement>;
}

type ContentProp = ProjectProps & {
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>
}

const ProjectContent = forwardRef(({
  idx,
  name,
  img,
  url,
  // title,
  // teamsize,
  desc,
  tech,
  color,
  setAnimation
}: ContentProp, ref) => {

  const [ open, setOpen ] = useState<boolean>(false);

  const references: References = {
    section: useRef(null),
    header: useRef(null),
    container: useRef(null),
    content: useRef(null),
    img: useRef(null),
  }

  useImperativeHandle(ref, () => (references));

  const enterCallbacks = {
    onEnter: () => {
      console.log('enter')
      if (references.img.current) references.img.current.style.overflow = 'hidden';
    },
    onEntering: (_el) => {

    },
    onEntered: (_el) => {
      console.log('entered');
      if (references.img.current) references.img.current.style.removeProperty('overflow');
    }
  };

  return (
    <section
      ref={references.section}
      id={`project-${idx}-${name.toLowerCase()}`}
      style={{ backgroundColor: `var(--bs-${color})` }}
    >
      <a
        id={`toggle-${idx}-${name.toLowerCase()}`}
        className={`collapse-toggle${open ? ' sticky-top' : ''}`}
        ref={references.header}
        href={`#${name.toLowerCase()}`}
        style={{ backgroundColor: `var(--bs-${color})` }}
        onClick={() => setOpen(!open)}
        aria-controls={`collapse-${idx}-${name.toLowerCase()}`}
        aria-expanded={open}
      >
        <span>{name}</span>
      </a>
      <Collapse
        in={open}
        {...enterCallbacks}
      >
        <div
          className="position-relative"
          ref={references.container}
          id={`collapse-${idx}-${name.toLowerCase()}`}
        >

          <div
            className={`project-img-container`}
            ref={references.img}
          >
            <div>
              <a href={url}>
                <picture>
                  <source media="(max-width: 768px)" srcSet={`${img}-sm.png`} />
                  <img className="project-img" src={`${img}.png`} alt={`screenshot of ${name} application`} />
                </picture>
              </a>
            </div>
          </div>

          <div ref={references.content}>
            <h3><a href={url}>{url}</a></h3>
            <h4>
              {tech.map((item, i) =>
                <span
                  key={`project-${idx}-tech-${i}-${item}`}
                  className="badge bg-primary"
                >
                  {item}
                </span>
              )}
            </h4>
            {desc.map((p, i) => (
              <p key={`project-${idx}-desc-${i}`}>{p}</p>
            ))}
          </div>

        </div>
      </Collapse>
    </section>
  );
});

export default ProjectContent;