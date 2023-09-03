import { forwardRef, useRef, useImperativeHandle, RefObject } from 'react';
import { ProjectProps } from './Project';

interface References {
  container: RefObject<HTMLDivElement>;
  content: RefObject<HTMLDivElement>;
  img: RefObject<HTMLDivElement>;
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
}: ProjectProps, ref) => {

  const references: References = {
    container: useRef(null),
    content: useRef(null),
    img: useRef(null),
  }

  useImperativeHandle(ref, () => (references));

  return (
    <div
      className="position-relative project-content-container"
      ref={references.container}
      id={`collapse-${idx}-${name.toLowerCase()}`}
    >

      <div
        className={`project-img-container`}
        ref={references.img}
      >
        <div>
          <a href={url}>
            {/* <picture>
              <source media="(max-width: 768px)" srcSet={`${img}-sm.png`} />
              <img className="project-img" src={`${img}.png`} alt={`screenshot of ${name} application`} />
            </picture> */}
          </a>
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
    </div>
  );
});

export default ProjectContent;