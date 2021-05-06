export function generatePoints(
  count: number,
  limits: [number, number],
  diff: number,
  boundary: number
): [number, number][] {
  const [lowerLimit, upperLimit] = limits;
  const range = upperLimit - lowerLimit;
  let prev = Math.random() * range + lowerLimit;
  return new Array(count).fill(0).map((_, index) => {
    prev = prev + Math.random() * diff - diff / 2;
    prev = Math.max(lowerLimit + boundary, Math.min(upperLimit - boundary, prev));
    return [index, Math.round(prev)];
  });
}

export function generatePercPoints(
  count: number,
  limit: number,
  diff: number,
  ratio: number
): [number, number][] {
  return new Array(count).fill(0).map((_, index) => {
    const prev = Math.random() > ratio ? limit : limit - Math.random() * diff;
    return [index, Math.round(prev)];
  });
}
