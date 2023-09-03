import { Tween, Timeline, ScrollTrigger } from 'react-gsap';
import ProjectContent from './ProjectContent';
import { useEffect, useState } from 'react';

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

const Project = (props: ProjectProps) => {
  const [ animation, setAnimation ] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log(animation);
  // }, [animation])

  return (
    <ScrollTrigger
      trigger="section"
      start="top center"
      end="8500px center"
      // markers={true}
      scrub={0.5}
    >
      <Timeline target={<ProjectContent {...props} setAnimation={setAnimation} />} enabled={animation} >
        <Tween from={{fontSize: '1rem'}} to={{fontSize: '3rem'}} target="header" position="1" />

        <Tween from={{ height: '100vh', width: '100vw' }} to={{ height: '100vh', width: '50%' }} target="img" position="2" />
        <Tween from={{ height: '100vh', width: '100vw' }} to={{ height: '100vh', width: '50%' }} target="content"/>
      </Timeline>
    </ScrollTrigger>
  );
};

export default Project;