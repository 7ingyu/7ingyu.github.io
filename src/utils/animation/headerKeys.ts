import projects from '@/data/projects.json';

const headerKeys = ({ idx, color }: { idx: number; color: string }) => {
  return [
    // 0 start
    {
      height: '2rem',
      bottom: `${(projects.length - idx - 1) * 2}rem`,
      backgroundColor: `var(--bs-${color})`,
      alignItems: 'center'
    },
    // 1 expand up
    {
      height: `calc(100vh - ${(projects.length - idx - 1) * 2}rem)`,
      bottom: `${(projects.length - idx - 1) * 2}rem`,
      backgroundColor: `var(--bs-${color})`,
      alignItems: 'center'
    },
    // 2 shrunk at top
    {
      height: '50px',
      bottom: `calc(100vh - 3rem)`,
      backgroundColor: `var(--bs-${color})`,
      alignItems: 'center'
    },
    // 3 swap to transparent bg
    {
      height: '50px',
      bottom: `calc(100vh - 3rem)`,
      backgroundColor: `transparent`,
      alignItems: 'end'
    },
    // closing (4)
    {
      height: `calc(100vh - ${(projects.length - idx - 1) * 2}rem)`,
      bottom: `${(projects.length - idx - 1) * 2}rem`,
      backgroundColor: `transparent`,
      alignItems: 'end'
    },
    // swap back to 0
  ]
};

export default headerKeys;