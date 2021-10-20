
/**
 * This function converts a number to a string with 'hh:mm' format
 * 
 * @param second 
 * @returns a string with 'hh:mm' format
 */
export const numberToMinuteSecond = (second: number) => {
  const min: number = Math.floor(second / 60);
  const sec: number = second % 60;
  const minString: string = min < 10 ? `0${min}` : `${min}`;
  const secString: string = sec < 10 ? `0${sec}` : `${sec}`;
  return `${minString}:${secString}`;
};
