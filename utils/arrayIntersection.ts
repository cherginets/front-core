const arraysIntersection = (...arrays: any[]) => {
  return arrays.reduce((acc, next, i) => {
    if(!i) return acc;

    return acc.filter((x: any) => next.includes(x))
  }, arrays[0])
};

export default arraysIntersection;