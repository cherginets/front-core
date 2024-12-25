export const arraysIntersection = (...arrays: any[]) => {
  console.log('arrays', arrays);
  return arrays.reduce((acc, next, i) => {
    if(!i) return acc;

    return acc.filter((x: any) => next.includes(x))
  }, arrays[0])
};