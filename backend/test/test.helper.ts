/* eslint-disable @typescript-eslint/no-unsafe-return */
export function redactDynamicFields<T>(data: T): T {
  if (Array.isArray(data)) {
    // Recursively redact each item in the array
    return data.map((item) => redactDynamicFields(item)) as unknown as T;
  }

  if (typeof data === 'object' && data !== null) {
    const redactedData = { ...data };
    // Redact dynamic fields
    if ('id' in redactedData) {
      redactedData['id'] = '[REDACTED]';
    }
    if ('createdAt' in redactedData) {
      redactedData['createdAt'] = '[REDACTED]';
    }
    if ('updatedAt' in redactedData) {
      redactedData['updatedAt'] = '[REDACTED]';
    }

    // Recursively redact nested objects or arrays
    for (const key in redactedData) {
      if (typeof redactedData[key] === 'object') {
        redactedData[key] = redactDynamicFields(redactedData[key]);
      }
    }

    return redactedData as T;
  }

  return data;
}
