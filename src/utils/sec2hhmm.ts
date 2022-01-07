export const sec2hhmm = (sec: number): string => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - hours * 3600) / 60);
  const resultH = hours > 9 ? hours : `0${hours}`;
  const resultM = minutes > 9 ? minutes : `0${minutes}`;
  return `${resultH}:${resultM}`;
};
