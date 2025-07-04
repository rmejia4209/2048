


export function randInt(minVal: number, maxVal: number): number {
  return Math.floor(Math.random() * (maxVal - minVal) + minVal);
}

export function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randInt(0, i+1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


/**
 * Returns an array of the given length with each value equal to it's index
 * 
 * @param len - length of the array
 * @returns a shuffled array of number
 */
function simpleRange(len: number): number[] {
  return Array.from({length: len}, (_, idx) => idx);
}


 
/**
 * Returns an array composed of values from 0 to len - 1
 * and shuffled randomly
 * 
 * @param len length of the array
 * @returns a shuffled array of number
 */
export function shuffledArray(len: number): number[] {
  const arr = simpleRange(len);
  return shuffle(arr)
}

export function deepCopy<T>(arg: T): T {
  if (Array.isArray(arg)) {
    return arg.map((element) => deepCopy(element)) as T;
  } else if (
    arg !== null
    && typeof arg === 'object'
    && Object.getPrototypeOf(arg) === Object.prototype
  ) {
    const obj: any = {};
    for (const key in arg) {
      obj[key] = deepCopy(arg[key])
    }
    return obj as T;
  }
  return arg;
}


type NestedArray<T> =  Array<T | NestedArray<T>>;

export function flatMap<T, U>(
  arr: NestedArray<T>, fn: (item: T, idx: number) => U
): U[] {
  
  if (Array.isArray(arr)) {
    return (arr as unknown[]).flat(Infinity).map(
      (val, idx) => fn(val as T, idx)
    );
  } else {
    throw(new Error("Input is not an array"));
  }
}