import React, { useEffect } from "react";
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
  PEOPLE,
  SHAPE,
  CIRCLE,
  TOOLS,
  SQUARE,
  DARIO,
  CREATE_ARTBOARD_STEP,
  PRELOADER_STEP,
  ADVANCE_STEP,
  CREATED_HISTORY_ITEM,
  ASSEMBLING_STEP,
  ADDED_LAYER
} from "../../config";
import { useMotionValue, useAnimation, AnimatePresence } from "framer-motion";
import { Shape } from "../Shape";
import { useWindowSize } from "react-use";
import { store } from "../../store";
import { Preloader } from "../Preloader";
import { H1 } from "../H1";
import { P } from "../P";
import { drawShape, animateText } from "../../motion";
import { SvgContainer } from "./styled/SvgContainer";

const layerSymbols = {
  title: Symbol(),
  text1: Symbol(),
  text2: Symbol(),
  text3: Symbol(),
  text4: Symbol(),
  sig: Symbol()
};

const layerRefs = {};

const preloaderTime = 4;

// thinking about react context and top level component logice
// versus nesetd context logic
const Window = () => {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const { step, history } = useSelector(store => store);

  const artboardControls = useAnimation();
  const toolControls = TOOLS.map(_ => useAnimation());

  const layers = {
    artboardLayer: {
      layer: { type: SHAPE, shapeType: SQUARE },
      control: useAnimation()
    },
    globeLayer: {
      layer: { type: SHAPE, shapeType: CIRCLE },
      control: useAnimation()
    }
  };

  Reflect.ownKeys(layerSymbols).forEach(key => {
    const symbol = layerSymbols[key];
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
    (async () => {
      const { artboard: artboardBounds } = store.getState();

      switch (step) {
        case PRELOADER_STEP:
          Object.values(layerSymbols).map(symbol => {
            const ref = layerRefs[symbol];
            ref.style.opacity = 0;
          });

          setTimeout(() => {
            dispatch({ type: ADVANCE_STEP });
          }, preloaderTime * 1000);
          break;
        case CREATE_ARTBOARD_STEP:
          // draw artboard

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

          dispatch({
            type: ADDED_LAYER,
            layer: "artboardLayer",
            x: artboardBounds.x,
            y: artboardBounds.y,
            width: artboardBounds.width,
            height: artboardBounds.height
          });

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
          const diameter = artboardBounds.height - 144;

          drawShape({
            cursorControl: cursorState[DARIO.name].control,
            layerControl: layers.globeLayer.control,
            shape: CIRCLE,
            x: artboardBounds.width - diameter - 72,
            y: 72,
            width: artboardBounds.height - 144,
            height: artboardBounds.height - 144,
            addBounds: true,
            placeholder: true
          }).then(_ =>
            cursorState[DARIO.name].control.start({ x: -100, y: -100 })
          );

          dispatch({
            type: ADDED_LAYER,
            placeholder: true,
            layer: layers.globeLayer,
            name: "very cool name",
            x: artboardBounds.width - diameter - 72,
            y: 72,
            width: artboardBounds.height - 144,
            height: artboardBounds.height - 144
          });

          const textLayers = [
            { layer: layerSymbols.title, person: PEOPLE.CHERIN },
            { layer: layerSymbols.text1, person: PEOPLE.CHERIN },
            { layer: layerSymbols.text2, person: PEOPLE.NATHAN },
            { layer: layerSymbols.text3, person: PEOPLE.MICAH },
            { layer: layerSymbols.text4, person: PEOPLE.SAM }
          ];

          textLayers.reduce(
            (acc, textLayer) =>
              acc.then(_ =>
                animateText({
                  cursorControl: cursorState[textLayer.person.name].control,
                  layerControl: layers[textLayer.layer].control,
                  layerSymbol: textLayer.layer,
                  layerRefs,
                  person: textLayer.person
                })
              ),

            Promise.resolve()
          );

          dispatch({ type: ADVANCE_STEP });

          break;
      }
    })();
  }, [step]);

  //toolWidths, artboardSize

  const { layerSizes } = store.getState();

  // layers should only update if serialized state changes

  return (
    <div>
      <SvgContainer
        viewBox={`0 0 ${size.width} ${size.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {Reflect.ownKeys(layers).map((key, i) => {
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
        <AnimatePresence>
          {step === PRELOADER_STEP && <Preloader />}{" "}
        </AnimatePresence>
        <Toolbar show={step > CREATE_ARTBOARD_STEP} />{" "}
        <MainContainer>
          <SidePanel title="Layers" show={step > CREATE_ARTBOARD_STEP}>
            {Reflect.ownKeys(layerSizes).map(key => {
              const layer = layerSizes[key];

              return (
                <LayerItem
                  active={layer.active}
                  person={layer.person}
                  type={layer.type}
                >
                  {layer.name}
                </LayerItem>
              );
            })}
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
          </MainInner>
          <Tools show={step > CREATE_ARTBOARD_STEP} control={toolControls} />
          <SidePanel title="History" show={step > CREATE_ARTBOARD_STEP}>
            <AnimatePresence>
              {history.map(({ person, time, action }) => (
                <HistoryItem
                  key={time}
                  person={person}
                  time={time}
                  action={action}
                />
              ))}
            </AnimatePresence>
          </SidePanel>
        </MainContainer>{" "}
      </WindowContainer>{" "}
    </div>
  );
};

export { Window };
