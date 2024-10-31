export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  // Pad with leading zeros if necessary
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function isObjectEmpty(obj: Object, include?: any) {
  return Object.values(obj).every(
    value =>
      value === null ||
      value === undefined ||
      value === '' ||
      value === 0 ||
      value == include ||
      (Array.isArray(value) && value.length == 0),
  );
}

export const hasEmptyProperty = (obj: object) => {
  return Object.values(obj).some(
    value => value === null || value === undefined || value === '',
  );
};

export function isArrayEmpty(arr: Array<number>) {
  return arr.every(value => value == 0);
}
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const inputNumber = (text: string) => {
  return text.replace(/[^0-9]/g, '');
};

export function validatePassword(password: string): boolean {
  return !!password && password.length < 8;
}
