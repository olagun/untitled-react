// Message Types
const CREATED_HISTORY_ITEM = Symbol();
const ARTBOARD_LAYER_REF = Symbol();
const UPDATE_LAYER = Symbol();
const ADVANCE_STEP = Symbol();
const ADDED_LAYER = Symbol();

// Tools
const IMAGE = "image";
const TEXT = "text";
const SHAPE = "shape";
const VECTOR = "vector";
const PENCIL = "pencil";
const RESIZE = "resize";
const TOOLS = [TEXT, SHAPE, IMAGE, VECTOR, PENCIL];

// Shapes
const SQUARE = Symbol("square");
const CIRCLE = Symbol("circle");

// People
const JAY = { name: "Jay", color: "#000000", img: "jmo.jpg" };
const SAM = { name: "Sam", color: "#3399FF", img: "sam.jpg" };
const CHERIN = { name: "Cherin", color: "#FF5F58", img: "cherin.jpeg" };
const MICAH = { name: "Micah", color: "#3399FF", img: "micah.jpeg" };
const NATHAN = { name: "Nathan", color: "#F3CA3E", img: "nathan.jpeg" };
const DARIO = { name: "Dario", color: "#FF3366", img: "dario.png" };
const SURYA = { name: "Surya", color: "#FA9917", img: "surya.png" };
const WOJTEK = { name: "Wojtek", color: "#2AC940", img: "wojtek.png" };
const MATUS = { name: "Matus", color: "#1262B3", img: "matus.jpeg" };
const BIANCA = { name: "Bianca", color: "#1B8CB3", img: "bianca.png" };
const PEOPLE_MAP = {
  JAY,
  SAM,
  DARIO,
  NATHAN,
  MICAH,
  CHERIN,
  MATUS,
  BIANCA,
  SURYA,
  WOJTEK
};

const PEOPLE = Object.values(PEOPLE_MAP);

// Steps
const PRELOADER_STEP = 0;
const CREATE_ARTBOARD_STEP = 1;
const ASSEMBLING_STEP = 2;
const FINISHED_STEP = 3;

// History Actions
const CREATED_ARTBOARD = "created a new artboard";
const actionMap = {
  [CREATED_ARTBOARD]: "created an artboard",
  [TEXT]: "added a new text layer",
  [SHAPE]: "drew a shape"
};

export {
  PEOPLE,
  UPDATE_LAYER,
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
  PEOPLE_MAP,
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
