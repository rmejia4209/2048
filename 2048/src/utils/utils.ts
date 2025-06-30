


export function randInt(minVal: number, maxVal: number): number {
  return Math.floor(Math.random() * (maxVal - minVal) + minVal);
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