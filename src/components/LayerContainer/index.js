import { SvgContainer } from "../Window/styled/SvgContainer";
import React from "react";
import {store} from "../../store";
import { SHAPE } from "../../config";
import { Shape } from "../Shape";

const LayerContainer = ({ size, layers, keys }) => (
  <SvgContainer
    viewBox={`0 0 ${size.width} ${size.height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {keys.map((key, i) => {
      let {
        layer: { type, shapeType },
        control
      } = layers[key];

      const { layerSizes } = store.getState();

      let serialize;
      if (layerSizes[key]) {
        serialize = {
          x: layerSizes[key].x,
          y: layerSizes[key].y,
          height: layerSizes[key].height,
          width: layerSizes[key].width
        };
      }

      if (type === SHAPE) {
        return (
          <Shape
            key={i}
            type={shapeType}
            control={control}
            serialize={serialize}
          />
        );
      }
    })}
  </SvgContainer>
);

export { LayerContainer };
