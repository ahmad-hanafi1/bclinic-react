/* eslint-disable @typescript-eslint/no-explicit-any */

const toSnakeCaseKey = (key: string): string => {
  return key.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
};

export const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[toSnakeCaseKey(key)] = toSnakeCase(obj[key]);
      return acc;
    }, {} as any);
  } else {
    return obj;
  }
};

const toCamelCaseKey = (key: string): string => {
  return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[toCamelCaseKey(key)] = toCamelCase(obj[key]);
      return acc;
    }, {} as any);
  } else {
    return obj;
  }
};
