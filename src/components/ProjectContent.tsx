import { forwardRef, useRef, useImperativeHandle, RefObject } from 'react';
import { ProjectProps } from './Project';
import projects from '@/data/projects.json';

interface References {
  container: RefObject<HTMLDivElement>;
  content: RefObject<HTMLDivElement>;
  img: RefObject<HTMLDivElement>;
  badges: RefObject<Array<HTMLSpanElement | null>>;
}

const ProjectContent = forwardRef(({
  idx,
  name,
  img,
  url,
  // title,
  // teamsize,
  desc,
  tech
}: ProjectProps, ref) => {

  const references: References = {
    container: useRef(null),
    content: useRef(null),
    img: useRef(null),
    badges: useRef([])
  }

  useImperativeHandle(ref, () => (references));

  return (
    // <div className="project-bg" ref={references.bg}>

      <div
        className="project-content-container"
        ref={references.container}
        id={`project-container-${idx}-${name.toLowerCase()}`}
        style={{
          // height: `calc(100vh - ${(projects.length - idx - 1) * 2}rem - 3rem)`,
          // bottom: `${(projects.length - idx - 1) * 2}rem`
        }}
      >

        <div
          className={`project-img-container`}
          ref={references.img}
        >
          <div>
            <a href={url}>
              <picture>
                <source media="(max-width: 768px)" srcSet={`${img}-sm.png`} />
                <img className="project-img img-fluid" src={`${img}.png`} alt={`screenshot of ${name} application`} />
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
                ref={el => references.badges.current?.push(el)}
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
    // </div>
  );
});

export default ProjectContent;