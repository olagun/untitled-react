import React from "react";

import { motion, useTransform } from "framer-motion";
import { SQUARE } from "../../config";

// const componentMapper = mapping => {
//   return key => {
//     const Component = mapping[key];
//     return (...props) => <Component  style={{ x, y, width, height }} {...props} />;
//   };
// };

const Shape = ({ type = SQUARE, x, y, width, height, control, serialize }) => {
  const strokeProps = {
    stroke: "rgba(0, 0, 0, .15)",
    strokeDasharray: serialize ? "0 0" : "8 8",
    strokeWidth: "2",
    fill: "none"
  };

  return type == SQUARE ? (
    <motion.rect
      initial={{ x, y, width, height, ...strokeProps }}
      animate={control}
    ></motion.rect>
  ) : (
    <motion.ellipse animate={control} initial={strokeProps}></motion.ellipse>
  );
};

export { Shape };
