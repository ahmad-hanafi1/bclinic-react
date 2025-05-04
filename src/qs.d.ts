/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "qs" {
  export function stringify(
    obj: any,
    options?: {
      delimiter?: string;
      strictNullHandling?: boolean;
      skipNulls?: boolean;
      encode?: boolean;
      encoder?: (str: string) => any;
      filter?: ((prefix: string, value: any) => any) | Array<string | number>;
      arrayFormat?: "indices" | "brackets" | "repeat" | "comma";
      indices?: boolean;
      sort?: (a: any, b: any) => number;
      serializeDate?: (d: Date) => string;
      format?: "RFC1738" | "RFC3986";
      encodeValuesOnly?: boolean;
      addQueryPrefix?: boolean;
      allowDots?: boolean;
      charset?: "utf-8" | "iso-8859-1";
      charsetSentinel?: boolean;
      interpretNumericEntities?: boolean;
    }
  ): string;

  export function parse(
    str: string,
    options?: {
      delimiter?: string | RegExp;
      depth?: number | false;
      decoder?: (str: string) => any;
      arrayLimit?: number;
      parseArrays?: boolean;
      allowDots?: boolean;
      plainObjects?: boolean;
      allowPrototypes?: boolean;
      parameterLimit?: number;
      strictNullHandling?: boolean;
      ignoreQueryPrefix?: boolean;
      charset?: "utf-8" | "iso-8859-1";
      charsetSentinel?: boolean;
      interpretNumericEntities?: boolean;
    }
  ): any;
}
