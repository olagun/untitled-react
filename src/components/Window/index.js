import React, { useState, useEffect } from "react";
import { WindowContainer } from "./styled/WindowContainer";
import { MainContainer } from "./styled/MainContainer";
import { Toolbar } from "../Toolbar";
import { SidePanel } from "../SidePanel";
import { Artboard } from "../Artboard";
import { LayerItem } from "../LayerItem";
import { HistoryItem } from "../HistoryItem";
import { Cursor } from "../Cursor";
import { Tools } from "../Tools";
import { MainInner } from "./styled/MainInner";
import { useSelector, useDispatch } from "react-redux";
import {
  CREATED_ARTBOARD,
  VECTOR,
  PEOPLE,
  SHAPE,
  CIRCLE,
  TEXT,
  PENCIL,
  TOOLS,
  SQUARE,
  DARIO,
  CREATE_ARTBOARD_STEP,
  PRELOADER_STEP,
  ADVANCE_STEP,
  CREATED_HISTORY_ITEM,
  ASSEMBLING_STEP,
  ARTBOARD_LAYER_REF
} from "../../config";
import { useMotionValue, useAnimation, AnimatePresence } from "framer-motion";
import { Shape } from "../Shape";
import { lerp } from "../../util";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import { motion } from "framer-motion";
import { store } from "../../store";
import { artboard } from "../../reducers/artboard";
import { Preloader } from "../Preloader";
import { H1 } from "../H1";
import { P } from "../P";
import { drawShape, animateText, selectTool } from "../../motion";

const layerSymbols = {
  title: Symbol(),
  text1: Symbol(),
  text2: Symbol(),
  text3: Symbol(),
  sig: Symbol()
};

const layerRefs = {};

const preloaderTime = 0.5;

// thinking about react context and top level component logice
// versus nesetd context logic
const Window = () => {
  const artboardControls = useAnimation();
  const dispatch = useDispatch();
  const size = useWindowSize();

  const { step, history } = useSelector(({ step, history }) => ({
    step,
    history
  }));

  const toolControls = TOOLS.map(_ => useAnimation());

  const layers = {
    artboardLayer: {
      layer: { type: SHAPE, shapeType: SQUARE },
      control: useAnimation()
    },
    globeLayer: {
      layer: { type: SHAPE, shapeType: CIRCLE },
      control: useAnimation(),
      bgImage: ""
    }
  };

  Object.values(layerSymbols).forEach(symbol => {
    layers[symbol] = {
      layer: { type: SHAPE, shapeType: SQUARE },
      control: useAnimation()
    };
  });

  const cursorState = Object.entries(PEOPLE).reduce(
    (obj, [, person]) => ({
      ...obj,
      [person.name]: {
        person,
        active: false,
        tool: null,
        control: useAnimation(),
        x: useMotionValue(-100),
        y: useMotionValue(-100)
      }
    }),
    {}
  );

  // scaling by using vw instead of pixels
  // 180px + 10vw
  useEffect(() => {
    // steppign through things
    (async () => {
      switch (step) {
        case PRELOADER_STEP:
          setTimeout(() => {
            dispatch({ type: ADVANCE_STEP });
          }, preloaderTime * 1000);
          break;
        case CREATE_ARTBOARD_STEP:
          // draw artboard
          const { artboard: artboardBounds } = store.getState();

          await drawShape({
            cursorControl: cursorState[DARIO.name].control,
            layerControl: layers.artboardLayer.control,
            shape: SQUARE,
            x: 0,
            y: 0,
            width: artboardBounds.width,
            height: artboardBounds.height,
            addBounds: true
          });

          // layers.artboardLayer.x = 0;
          // layers.artboardLayer.y = 0;

          // layers.artboardLayer.width = artboardBounds.width;
          // layers.artboardLayer.height = artboardBounds.height;

          // console.log(layers.artboardLayer);

          // await artboardControl.start({
          //   strokeDasharray: "0 0"
          // });

          // add shape layer to state

          dispatch({ type: ADVANCE_STEP });

          dispatch({
            type: CREATED_HISTORY_ITEM,
            entry: {
              person: DARIO,
              action: CREATED_ARTBOARD,
              time: Date.now()
            }
          });

          break;
        case ASSEMBLING_STEP:
          await drawShape({
            cursorControl: cursorState[DARIO.name].control,
            layerControl: layers.globeLayer.control,
            shape: CIRCLE,
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            addBounds: true
          });

          const textLayers = [
            { layer: layerSymbols.title, person: DARIO },
            [
              { layer: layerSymbols.text1, person: PEOPLE.CHERIN },
              { layer: layerSymbols.text2, person: PEOPLE.NATHAN }
            ],
            { layer: layerSymbols.text3, person: PEOPLE.MICAH },
            { layer: layerSymbols.text4, person: PEOPLE.SAM }
          ];

          textLayers.reduce((acc, textLayer) => {
            if (Array.isArray(textLayer)) {
              return acc.then(_ =>
                Promise.all(
                  textLayer.map(t =>
                    animateText({
                      cursorControl: cursorState[t.person.name].control,
                      layerControl: layers[t.layer].control,
                      layerSymbol: t.layer,
                      layerRefs
                    })
                  )
                )
              );
            } else {
              return acc.then(_ =>
                animateText({
                  cursorControl: cursorState[textLayer.person.name].control,
                  layerControl: layers[textLayer.layer].control,
                  layerSymbol: textLayer.layer,
                  layerRefs
                })
              );
            }
          }, Promise.resolve());

          break;
      }
    })();
  }, [step]);

  //toolWidths, artboardSize

  const SvgContainer = styled(motion.svg)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    pointer-events: none;
  `;

  return (
    <div>
      <SvgContainer
        viewBox={`0 0 ${size.width} ${size.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {Object.values(layers).map(
          (
            {
              layer: { type, shapeType },
              x = 0,
              y = 0,
              width = 0,
              height = 0,
              control
            },
            i
          ) => {
            if (type === SHAPE) {
              return (
                <Shape
                  key={i}
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  type={shapeType}
                  control={control}
                />
              );
            }
          }
        )}
      </SvgContainer>
      {step > PRELOADER_STEP &&
        Object.values(
          cursorState
        ).map(
          (
            {
              person = null,
              x = 0,
              y = 0,
              active = false,
              tool = null,
              control = null
            },
            i
          ) => (
            <Cursor
              key={i}
              x={x}
              y={y}
              tool={tool}
              active={active}
              person={person}
              animate={control}
              custom={person}
            />
          )
        )}
      <WindowContainer showShadow={step > PRELOADER_STEP}>
        {step === PRELOADER_STEP && <Preloader />}{" "}
        <Toolbar show={step > CREATE_ARTBOARD_STEP} />{" "}
        <MainContainer>
          <SidePanel title="Layers" show={step > CREATE_ARTBOARD_STEP}>
            {" "}
            {/* <LayerItem active>Untitled</LayerItem>
            <LayerItem>Is how everything</LayerItem> */}{" "}
          </SidePanel>{" "}
          <MainInner>
            <Artboard
              artboardControls={artboardControls}
              show={step > CREATE_ARTBOARD_STEP}
            >
              <H1
                ref={ref => {
                  if (ref) {
                    layerRefs[layerSymbols.title] = ref;
                  }
                }}
              >
                Untitled
              </H1>
              <P
                ref={ref => {
                  if (ref) {
                    layerRefs[layerSymbols.text1] = ref;
                  }
                }}
              >
                Is how everything starts. It’s the name of all documents before
                they become anything.
              </P>
              <P
                ref={ref => {
                  if (ref) {
                    layerRefs[layerSymbols.text2] = ref;
                  }
                }}
              >
                That’s also me. A young product designer desperately trying to
                make a name for myself.
              </P>
              <P
                ref={ref => {
                  if (ref) {
                    layerRefs[layerSymbols.text3] = ref;
                  }
                }}
              >
                That’s also us. A group of young designers and developers
                lifting each other to become the best of who we can be, both as
                creators and people.
              </P>
              <P
                ref={ref => {
                  if (ref) {
                    layerRefs[layerSymbols.text4] = ref;
                  }
                }}
              >
                If that’s also you, come join us.
              </P>
              <P
                ref={ref => {
                  if (ref) {
                    layerRefs[layerSymbols.sig] = ref;
                  }
                }}
              >
                — the untitled
              </P>
            </Artboard>
            <Tools show={step > CREATE_ARTBOARD_STEP} control={toolControls} />
          </MainInner>
          <SidePanel title="History" show={step > CREATE_ARTBOARD_STEP}>
            {history.map(({ person, time, action }) => (
              <HistoryItem
                person={person}
                relativeTime={Date.now() - time}
                action={action}
              />
            ))}
          </SidePanel>
        </MainContainer>{" "}
      </WindowContainer>{" "}
    </div>
  );
};

export { Window };
