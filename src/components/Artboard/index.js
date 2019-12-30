import React, { useEffect, useRef } from "react";
import { ArtboardContainer } from "./styled/ArtboardContainer";
import { useWindowSize } from "react-use";
import { useDispatch } from "react-redux";
import { RESIZE } from "../../config";
import { ArtboardInner } from "./styled/ArtboardInner";

const Artboard = ({ children, artboardControls, show }) => {
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
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <ArtboardContainer
      animate={artboardControls}
      aspectRatio={width / height}
      // initial={{ opacity: 0 }}
      ref={ref}
      offset={-48}
    >
      <ArtboardInner show={show}>
        {React.Children.map(children, child => {
          return React.Children.map(child, c => {
            return (
              <div>
                {React.cloneElement(child, {
                  children: c.props.children
                    .split("")
                    .map(d => <span>{d}</span>)
                })}
                <div id="cursor"></div>
              </div>
            );
          });
        })}
      </ArtboardInner>
    </ArtboardContainer>
  );
};
export { Artboard };
