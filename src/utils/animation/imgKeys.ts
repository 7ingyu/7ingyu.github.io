// import projects from '@/data/projects.json';

const imgKeys = () => {
  return [
    // 0 faded out in bg
    {
      width: '100%',
      filter: 'blur(10px) brightness(0.5)',
      y: '0',
      position: 'sticky',
      top: '3rem',
      opacity: 0.5,
    },
    {
      width: '100%',
      filter: 'blur(0px) brightness(1)',
      y: '0',
      position: 'sticky',
      top: '3rem',
      opacity: 1,
    },
  ]
};

export default imgKeys;