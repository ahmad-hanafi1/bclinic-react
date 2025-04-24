/* eslint-disable @typescript-eslint/no-explicit-any */
export function updateItemWithChangedKeys<T>(
  originalItem: T,
  updates: Partial<T>
): T {
  // Clone the original item to avoid direct mutations
  const updatedItem: Partial<T> = { ...originalItem };

  // Iterate over the keys in the updates and apply them to the updatedItem
  Object.keys(updates).forEach((key) => {
    const specificKey = key as keyof typeof updates;

    // Ensure the value is not undefined before assignment
    if (typeof updates[specificKey] !== "undefined") {
      // Type assertion to convince TypeScript the assignment is safe
      updatedItem[specificKey] = updates[specificKey]!;
    }
  });

  return updatedItem as T;
}

export function addAdditionalFields<T>(
  original: T,
  fields: AdditionalFields
): T & AdditionalFields {
  return { ...original, ...fields };
}

interface AdditionalFields {
  serverUrl: string;
  databaseName: string;
  uid: string;
}

export function arrayToQueryString(
  key: string | number | boolean,
  array: any[]
) {
  return array
    .map(
      (value: string | number | boolean) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
}
