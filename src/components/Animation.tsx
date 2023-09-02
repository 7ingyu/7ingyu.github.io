import { forwardRef, useRef, useImperativeHandle, Fragment } from 'react';
import Landing from './Landing';

const Sections = forwardRef((props, ref) => {
  const references = {
    landing: useRef(null),
  };

  useImperativeHandle(ref, () => references);

  return (
    <Landing ref={references.landing} />
  );
});

export default Sections;