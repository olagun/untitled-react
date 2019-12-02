import React, { useEffect } from "react";
import { ArtboardContainer } from "./styled/ArtboardContainer";
import { useWindowSize } from "react-use";
import { useDispatch } from "react-redux";
import { RESIZE } from "../../config";
import { ArtboardInner } from "./styled/ArtboardInner";

let ref = null;

const Artboard = ({ children, artboardControls, show }) => {
  const { width, height } = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    function onResize() {
      dispatch({
        type: RESIZE,
        artboardSize: ref.getBoundingClientRect()
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
      ref={r => {
        if (r) {
          ref = r;
        }
      }}
      offset={-48}
    >
      <ArtboardInner>
        {React.Children.map(children, child => {
          return React.Children.map(child, c => {
            return React.cloneElement(child, {

              children: c.props.children.split("").map(d => <span>{d}</span>)
            });
          });
        })}
      </ArtboardInner>
    </ArtboardContainer>
  );
};
export { Artboard };
