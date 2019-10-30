const capitalize = str => {
  return str[0].toUpperCase() + str.substring(1);
};

const lerp = (a, b, t) => {
  return (1 - t) * a + t * b;
};

export { capitalize, lerp };
