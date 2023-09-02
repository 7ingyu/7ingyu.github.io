import { useState, useEffect, MouseEvent } from 'react';
import { Collapse } from 'bootstrap';

interface ProjectProps {
  "idx": number;
  "name": string;
  "img": string;
  "url": string;
  // "title": string;
  // "teamsize": number;
  "desc": Array<string>;
  "tech": Array<string>;
}

const Project = ({
  idx,
  name,
  img,
  url,
  // title,
  // teamsize,
  desc,
  tech,
}: ProjectProps) => {
  const collapseId = `collapse-${idx}-${name.toLowerCase()}`;

  const [ collapse, setCollapse ] = useState<Collapse | null>(null);

  useEffect(() => {
    const el = document.querySelector('#' + collapseId);
    if (el) setCollapse(new Collapse(el, {toggle: false}));
  }, [collapseId])

  const handleCollapse = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    collapse?.toggle();
  }

  return (
    <section>
      <a
        className="nav-collapse-toggle"

        href={`#${name.toLowerCase()}`}
        onClick={handleCollapse}
      >
        <span>{name}</span>
      </a>
      <div className="collapse" id={collapseId}>
        <div className="container">
          <div className="row">
            <div className={`col-12 col-md-6 order-${idx % 2 ? 1 : 2}`}>
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
            <div className={`col-12 col-md-6 order-${idx % 2 ? 2 : 1} position-relative overflow-hidden`}>
              <div>
                <a href={url}>
                  <picture>
                    <source media="(max-width: 768px)" srcSet={`${img}-sm.png`} />
                    <img className="project-img" src={`${img}.png`} alt={`screenshot of ${name} application`} />
                  </picture>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;