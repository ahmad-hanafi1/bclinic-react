/* eslint-disable @typescript-eslint/no-explicit-any */
export const extractIdFromArray = (data: any): any => {
  if (Array.isArray(data)) {
    // If the array matches the shape [number, string], return only the number
    if (
      data.length === 2 &&
      typeof data[0] === "number" &&
      typeof data[1] === "string"
    ) {
      return data[0];
    } else {
      // Recursively apply to each element in the array
      return data.map(extractIdFromArray);
    }
  } else if (typeof data === "object" && data !== null) {
    // Recursively apply to each property in the object
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = extractIdFromArray(data[key]);
      return acc;
    }, {} as any);
  }
  // Return the data as is if it's neither an array nor an object
  return data;
};

export function processValue<T>(value: T): T | string | number {
  if (value === false) {
    if (typeof value === "string") {
      return "";
    } else if (typeof value === "number") {
      return 0;
    }
  }
  return value;
}
