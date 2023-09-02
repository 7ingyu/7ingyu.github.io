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
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className={`col-12 col-md-6 order-${idx % 2 ? 1 : 2}`}>
            <h3><a href={url}>{name}</a></h3>
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
          <div className={`col-12 col-md-6 order-${idx % 2 ? 2 : 1}`}>
            <a href={url}>
              <img src={img} alt={`screenshot of ${name} application`} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;