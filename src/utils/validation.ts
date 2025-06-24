
export const isValidNumber = (
  value: string,
  min?: number,
  max?: number
): boolean => {
  const num = Number(value);

  if (Number.isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;

  return true;
};

export const isValidText = (value: string, maxLength?: number): boolean => {
  const trimmed = value.trim();
  return trimmed.length > 0 && (maxLength === undefined || trimmed.length <= maxLength);
};
