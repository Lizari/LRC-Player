export const getClosestNumber = (
  value: number,
  array: Array<number>,
): number => {
  return array.reduce((a, b) => {
    let aDiff = Math.abs(a - value);
    let bDiff = Math.abs(b - value);

    if (aDiff == bDiff) return a > b ? a : b;
    else return bDiff < aDiff ? b : a;
  });
};

export const formatTime = (time: number): string => {
  const minutes = isNaN(Math.floor(time / 60000))
    ? 0
    : Math.floor(time / 60000);
  const seconds = isNaN(Math.round((time % 60000) / 1000))
    ? 0
    : Math.round((time % 60000) / 1000);

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
