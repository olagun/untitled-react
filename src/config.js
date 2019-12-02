const IMAGE = "image";
const TEXT = "text";
const SHAPE = "shape";
const VECTOR = "vector";
const PENCIL = "pencil";
const RESIZE = "resize";

const TOOLS = [TEXT, SHAPE, IMAGE, VECTOR, PENCIL];

const SQUARE = Symbol("square");
const CIRCLE = Symbol("circle");

const JAY = { name: "Jay", color: "#000000", img: "jmo.jpg" };
const SAM = { name: "Sam", color: "#3399FF", img: "sam.jpg" };
const CHERIN = { name: "Cherin", color: "#FF5F58", img: "cherin.jpeg" };
const MICAH = { name: "Micah", color: "#3399FF", img: "micah.jpeg" };
const NATHAN = { name: "Nathan", color: "#F3CA3E", img: "nathan.jpeg" };
const DARIO = { name: "Dario", color: "#3399FF", img: "dario.png" };

const CREATED_ARTBOARD = "created a new artboard";
const CREATED_HISTORY_ITEM = Symbol();
const ARTBOARD_LAYER_REF = Symbol();

const ADDED_LAYER = Symbol();
const PEOPLE = { JAY, SAM, DARIO, NATHAN, MICAH, CHERIN };

// Steps
const ADVANCE_STEP = Symbol();

const PRELOADER_STEP = 0;
const CREATE_ARTBOARD_STEP = 1;
const ASSEMBLING_STEP = 2;
const FINISHED_STEP = 3;

const actionMap = {
  [CREATED_ARTBOARD]: "created an artboard"
};

export {
  ADDED_LAYER,
  ARTBOARD_LAYER_REF,
  actionMap,
  CREATED_HISTORY_ITEM,
  PRELOADER_STEP,
  CREATE_ARTBOARD_STEP,
  ASSEMBLING_STEP,
  FINISHED_STEP,
  ADVANCE_STEP,
  RESIZE,
  TOOLS,
  SQUARE,
  CIRCLE,
  PEOPLE,
  IMAGE,
  TEXT,
  SHAPE,
  VECTOR,
  PENCIL,
  JAY,
  SAM,
  DARIO,
  CREATED_ARTBOARD
};
