import projects from '@/data/projects.json';

const bgKeys = ({ idx }: { idx: number }) => {
  return [
    // 0 start
    {
      height: '0px',
      top: `calc(100vh - ${(projects.length - idx -1) * 2}rem)`,
      overflow: 'hidden',
      position: 'relative',
    },
    // 1 completely expanded
    {
      height: `100vh`,
      top: '0rem',
      overflow: null,
      position: 'relative',
    },
    // 2 just there for scrolling purposes
    // {
    //   height: `6000px`,
    //   top: '0',
    //   overflow: null,
    //   position: 'relative',
    // }
  ]
};

export default bgKeys;