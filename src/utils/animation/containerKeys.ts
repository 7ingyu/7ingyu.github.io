import projects from '@/data/projects.json';

const containerKeys = ({ idx }: { idx: number }) => {
  return [
    // before animation
    {
      position: 'relative',
      height: `calc(100vh - ${(projects.length - idx -1) * 2}rem - 3rem)`,
      top: '0px',
    },
    // pin page
    {
      position: 'fixed',
      height: `calc(100vh - ${(projects.length - idx -1) * 2}rem - 3rem)`,
      top: '3rem',
    }
  ];
};

export default containerKeys;