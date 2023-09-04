import projects from '@/data/projects.json';

const bgKeys = ({ idx }: { idx: number }) => {
  return [
    // 0 start
    {
      height: '0px',
      top: `calc(100vh - ${(projects.length - idx -1) * 2}rem)`,
    },
    // 1 completely expanded
    {
      height: `6000px`,
      top: '3rem',
    },
  ]
};

export default bgKeys;