import React, { useEffect, useState, useRef } from 'react';
import { WindowContainer } from './styled/WindowContainer';
import { MainContainer } from './styled/MainContainer';
import { Toolbar } from '../Toolbar';
import { SidePanel } from '../SidePanel';
import { Artboard } from '../Artboard';
import { LayerItem } from '../LayerItem';
import { HistoryItem } from '../HistoryItem';
import { Tools } from '../Tools';
import { MainInner } from './styled/MainInner';
import { useSelector, useDispatch } from 'react-redux';
import {
  CREATED_ARTBOARD,
  PEOPLE_MAP,
  SHAPE,
  CIRCLE,
  TOOLS,
  SQUARE,
  CREATE_ARTBOARD_STEP,
  PRELOADER_STEP,
  CREATED_HISTORY_ITEM,
  ASSEMBLING_STEP,
  ADDED_LAYER,
  JAY,
  MINHEE,
  PEOPLE
} from '../../config';
import { useMotionValue, useAnimation, AnimatePresence } from 'framer-motion';
import { useWindowSize } from 'react-use';
import { Preloader } from '../Preloader';
import { H1 } from '../H1';
import { P } from '../P';
import { drawShape, animateText, selectTool } from '../../motion';
import { CursorContainer } from '../CursorContainer';
import { LayerContainer } from '../LayerContainer';
import { advanceStep } from '../../actions';

// # of millseconds for blinking "untitled" preloader.
const preloaderTime = 4 * 1000;

// Symbols used to reference layers.
const LAYER_SYMBOL_MAP = {
  TITLE: Symbol(),
  P_1: Symbol(),
  P_2: Symbol(),
  P_3: Symbol(),
  P_4: Symbol(),
  SIGNOFF: Symbol()
};
const LAYER_SYMBOLS = Object.values(LAYER_SYMBOL_MAP);

// Question: how to implement layers?
// how to get controls to dynamically created elements
const Window = () => {
  // TODO: remove redux global dispatch in favor for set state
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [scale] = useState(1);
  const { step, history, layerSizes, artboard: artboardBounds } = useSelector(store => store);

  const artboardControls = useAnimation();
  const toolControls = TOOLS.map(() => useAnimation());

  // Layers
  const layerRefs = LAYER_SYMBOLS.reduce(
    (obj, layerSymbol) => ({
      ...obj,
      [layerSymbol]: useRef()
    }),
    {}
  );
  const layers = {
    artboardLayer: {
      layer: { type: SHAPE, shapeType: SQUARE },
      control: useAnimation()
    },
    globeLayer: {
      layer: { type: SHAPE, shapeType: CIRCLE },
      control: useAnimation()
    },
    ...LAYER_SYMBOLS.reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: {
          layer: { type: SHAPE, shapeType: SQUARE },
          control: useAnimation()
        }
      }),
      {}
    )
  };

  // Cursors
  const [cursorState, setCursorState] = useState(
    PEOPLE.reduce(
      (cursorState, person) => ({
        ...cursorState,
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
    )
  );

  // TODO: scale/calculate sizes for layers based on vw and pixel
  // offsets instead of pixels alone
  // i.e. (180px *for left sidepanel* + 10vw) vs. a constant pixel amount
  useEffect(() => {
    (async () => {
      switch (step) {
        case PRELOADER_STEP:
          // TODO: Make "step" part of react context
          // and have each element be 0 if step < ASSEMBLING_STEP

          // Set all layers to opacity 0.
          for (const layerSymbol of LAYER_SYMBOLS) {
            const layerRef = layerRefs[layerSymbol].current;
            layerRef.style.opacity = 0;
          }

          Object.entries(cursorState).forEach(([, value]) => {
            value.x.set(size.width / 2);
            value.y.set(size.height + 100);
          });

          setTimeout(advanceStep, preloaderTime);
          break;
        case CREATE_ARTBOARD_STEP:
          // draw artboard
          // cursor ttype needs to chnage to text

          // reuce and organize parameters
          await drawShape({
            setCursorState,
            cursorControl: cursorState[JAY.name].control,
            layerControl: layers.artboardLayer.control,
            shape: SQUARE,
            x: 0,
            y: 0,
            width: artboardBounds.width,
            height: artboardBounds.height,
            addBounds: true,
            finish: true,
            person: JAY,
            history: false
          });

          // fix people map to have symbols
          await cursorState[PEOPLE_MAP.JAY.name].control.start({
            x: size.width / 2,
            y: size.height + 100
          });

          // move to "add layer action" with history option
          // ARTBOARD INITIALIZES, BUT SHOULDN'T ADD SHAPE LAYER
          // dispatch({
          //   type: ADDED_LAYER,
          //   layer: 'artboardLayer',
          //   x: artboardBounds.x,
          //   y: artboardBounds.y,
          //   layerType: SHAPE,
          //   width: artboardBounds.width,
          //   height: artboardBounds.height
          // });

          dispatch({
            type: CREATED_HISTORY_ITEM,
            entry: {
              person: JAY,
              action: CREATED_ARTBOARD,
              time: Date.now()
            }
          });

          advanceStep();
          break;
        case ASSEMBLING_STEP:
          const diameter = artboardBounds.height - 144;

          // fix people map and reduce parameters
          await selectTool({
            cursorState,
            setCursorState,
            cursorControl: cursorState[PEOPLE_MAP.MICAH.name].control,
            tool: SHAPE
          });

          (async () => {
            // reduce parameteres and fix people map
            await drawShape({
              setCursorState,
              person: PEOPLE_MAP.MICAH,
              cursorControl: cursorState[PEOPLE_MAP.MICAH.name].control,
              layerControl: layers.globeLayer.control,
              shape: CIRCLE,
              x: artboardBounds.width - diameter - 72,
              y: 72,
              width: artboardBounds.height - 144,
              height: artboardBounds.height - 144,
              addBounds: true,
              placeholder: true,
              finish: true
            });

            // fix people map
            cursorState[PEOPLE_MAP.MICAH.name].control.start({
              x: size.width / 2,
              y: size.height + 100
            });
          })();

          // make into add layer action
          dispatch({
            type: ADDED_LAYER,
            placeholder: true,
            layer: layers.globeLayer,
            name: 'Untitled Circle',
            layerType: SHAPE,
            x: artboardBounds.width - diameter - 72,
            y: 72,
            width: artboardBounds.height - 144,
            height: artboardBounds.height - 144,
            person: PEOPLE_MAP.MICAH
          });

          // Text layers and their respective authors.
          /// maybe separate into function?
          const textLayers = [
            { text: LAYER_SYMBOL_MAP.TITLE, author: PEOPLE_MAP.CHERIN },
            { text: LAYER_SYMBOL_MAP.P_1, author: PEOPLE_MAP.WOJTEK },
            { text: LAYER_SYMBOL_MAP.P_2, author: PEOPLE_MAP.SURYA },
            { text: LAYER_SYMBOL_MAP.P_3, author: PEOPLE_MAP.DARIO },
            { text: LAYER_SYMBOL_MAP.P_4, author: PEOPLE_MAP.BIANCA },
            { text: LAYER_SYMBOL_MAP.SIGNOFF, author: PEOPLE_MAP.SAM }
          ];
          for (const { author, text } of textLayers) {
            await animateText({
              cursorState,
              setCursorState,
              cursorControl: cursorState[author.name].control,
              layerControl: layers[text].control,
              layerSymbol: text,
              layerRefs,
              person: author
            });
          }

          advanceStep();
          break;
        // case FINISHED_STEP:
        //   setScale(size.height / artboardBounds.height);
        //   break;
      }
    })();
  }, [step]);

  // layers should only update if serialized state changes
  return (
    <div>
      <LayerContainer keys={Reflect.ownKeys(layers)} size={size} layers={layers} />
      {step > PRELOADER_STEP && <CursorContainer cursors={Object.values(cursorState)} />}
      <WindowContainer showShadow={step > PRELOADER_STEP} scale={scale}>
        <AnimatePresence>{step === PRELOADER_STEP && <Preloader />}</AnimatePresence>
        <Toolbar show={step > CREATE_ARTBOARD_STEP} />
        <MainContainer>
          <SidePanel title="Layers" show={step > CREATE_ARTBOARD_STEP}>
            {Reflect.ownKeys(layerSizes).map(key => {
              const layer = layerSizes[key];

              return (
                <LayerItem
                  active={layer.active}
                  person={layer.person}
                  type={layer.type}
                  placholder={!!layer.placeholder}
                >
                  {layer.name}
                </LayerItem>
              );
            })}
          </SidePanel>{' '}
          <MainInner>
            <Artboard artboardControls={artboardControls} show={step > CREATE_ARTBOARD_STEP}>
              <H1 ref={layerRefs[LAYER_SYMBOL_MAP.TITLE]}>Untitled</H1>
              <P ref={layerRefs[LAYER_SYMBOL_MAP.P_1]}>
                Is how everything starts. It’s the name of all documents before they become anything.
              </P>
              <P ref={layerRefs[LAYER_SYMBOL_MAP.P_2]}>
                That’s also me. A young product designer desperately trying to make a name for myself.
              </P>
              <P ref={layerRefs[LAYER_SYMBOL_MAP.P_3]}>
                That’s also us. A group of young designers and developers lifting each other to become the
                best of who we can be, both as creators and people.
              </P>
              <P ref={layerRefs[LAYER_SYMBOL_MAP.P_4]}>If that’s also you, come join us.</P>
              <P ref={layerRefs[LAYER_SYMBOL_MAP.SIGNOFF]}>— the untitled</P>
            </Artboard>
          </MainInner>
          <Tools show={step > CREATE_ARTBOARD_STEP} control={toolControls} />
          <SidePanel title="History" show={step > CREATE_ARTBOARD_STEP}>
            <AnimatePresence>
              {history.map(({ person, time, action }) => (
                <HistoryItem key={time} person={person} time={time} action={action} />
              ))}
            </AnimatePresence>
          </SidePanel>
        </MainContainer>
      </WindowContainer>
    </div>
  );
};

export { Window };
