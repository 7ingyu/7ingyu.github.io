import { forwardRef, useRef, useImperativeHandle, RefObject } from 'react';
import { ProjectProps } from './Project';
import projects from '@/data/projects.json';

interface References {
  container: RefObject<HTMLDivElement>;
  content: RefObject<HTMLDivElement>;
  desc: RefObject<HTMLDivElement>;
  img: RefObject<HTMLDivElement>;
  badges: RefObject<Array<HTMLSpanElement | null>>;
  preview: RefObject<HTMLDivElement>;
}

const ProjectContent = forwardRef(({
  idx,
  name,
  img,
  // url,
  color,
  // title,
  // teamsize,
  desc,
  tech
}: ProjectProps, ref) => {

  const references: References = {
    container: useRef(null),
    content: useRef(null),
    desc: useRef(null),
    preview: useRef(null),
    img: useRef(null),
    badges: useRef([])
  }

  useImperativeHandle(ref, () => (references));

  return (
    <>
      <div
        className={`project-img-container`}
        ref={references.img}
      >
        <div>
          {/* <a href={url}> */}
            <picture>
              <source media="(max-width: 768px)" srcSet={`${img}-sm.png`} />
              <img className="project-img img-fluid" src={`${img}.png`} alt={`screenshot of ${name} application`} />
            </picture>
          {/* </a> */}
        </div>
      </div>

      <div
        ref={references.content}
        className="project-content-container"
        style={{ height: `calc(100vh - ${(projects.length - idx) * 2}rem - 6rem)` }}
      >
        <div
          className='container'
        >

          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <div className='project-preview-img position-relative w-100 h-100'>
                <div ref={references.preview} className="position-absolute top-0 w-100 h-100">
                  <picture>
                    <source media="(max-width: 768px)" srcSet={`${img}-sm.png`} />
                    <img className="project-img img-fluid" src={`${img}.png`} alt={`screenshot of ${name} application`} />
                  </picture>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6 ps-md-3 mb-3'>
              <div
                className="project-desc-card"
                ref={references.desc}
              >
                <div className="card-body">
                  {desc.map((p, i) => (
                    <p key={`project-${idx}-desc-${i}`}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="d-flex align-items-center justify-content-center mb-5">
              {tech.map((item, i) =>
                <span
                  key={`project-${idx}-tech-${i}-${item}`}
                  className="badge m-1"
                  style={{backgroundColor: `var(--bs-${color})`}}
                  ref={el => references.badges.current?.push(el)}
                >
                  {item}
                </span>
              )}
            </div>
          </div>

        </div>
        {/* <h3><a href={url}>{url}</a></h3> */}
      </div>

    </>
  );
});

export default ProjectContent;