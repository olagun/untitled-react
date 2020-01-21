import React, { useEffect, useRef } from 'react';
import { ArtboardContainer } from './styled/ArtboardContainer';
import { useWindowSize } from 'react-use';
import { useDispatch } from 'react-redux';
import { RESIZE } from '../../config';
import { ArtboardInner } from './styled/ArtboardInner';

const Artboard = ({ children, artboardControls, artboardTransition, show }) => {
  const { width, height } = useWindowSize();
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    function onResize() {
      dispatch({
        type: RESIZE,
        artboardSize: ref.current.getBoundingClientRect()
      });
    }

    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <ArtboardContainer
      animate={artboardControls}
      transition={artboardTransition}
      aspectRatio={width / height}
      width={
        width <= 1024 && width < height ? height * 0.9 * 0.5625 : width <= 1440 ? width - 144 : width * 0.9
      }
      height={
        width <= 1024 && width < height
          ? height * 0.9
          : width <= 1440
          ? (width - 144) * 0.5138888889
          : width * 0.9 * 0.5138888889
      }
      // initial={{ opacity: 0 }}
      ref={ref}
      offset={-48}
    >
      <ArtboardInner show={show}>
        {React.Children.map(children, child => {
          return React.Children.map(child, c => {
            return (
              <div key={`artboard-element-${child.ref}`} style={{ position: 'relative' }}>
                {React.cloneElement(child, {
                  children: (
                    <React.Fragment>
                      <div style={{ position: 'relative', opacity: 0 }}>
                        {c.props.children.split('').map((d, index) => (
                          <span key={`span-${d}-${index}`}>{d}</span>
                        ))}
                      </div>
                      <div style={{ position: 'absolute', top: 0, left: 0 }} />
                      <div id="cursor" />
                    </React.Fragment>
                  )
                })}
              </div>
            );
          });
        })}
      </ArtboardInner>
    </ArtboardContainer>
  );
};
export { Artboard };
// <div style={{ position: 'relative' }}>
//     {React.cloneElement(child, {
//       children: c.props.children.split('').map(d => <span>{d}</span>)
//     })}
//   <div style={{ position: 'absolute', top: 0, left: 0 }}>
//   </div>
//   <div id="cursor" />
// </div>
