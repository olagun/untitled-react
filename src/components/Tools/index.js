import React, { useEffect } from 'react';
import { ToolButtonContainer } from './styled/ToolButtonContainer';
import { TOOLS, RESIZE } from '../../config';
import { Tool } from './Tool';
import { useDispatch } from 'react-redux';

const refs = new Array(TOOLS.length);

const Tools = ({ show, control, transition }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function onResize() {
      dispatch({
        type: RESIZE,
        toolWidths: refs.map(ref => ref.getBoundingClientRect())
      });
    }

    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <ToolButtonContainer animate={{ opacity: show ? 1 : 0 }} initial={{ opacity: 0 }}>
      {TOOLS.map((tool, i) => (
        <Tool
          key={i}
          type={tool}
          control={control[i]}
          transition={transition}
          innerRef={ref => {
            if (ref) {
              refs[i] = ref;
            }
          }}
        />
      ))}
    </ToolButtonContainer>
  );
};

export { Tools };
