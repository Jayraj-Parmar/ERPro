export const cleanPayload = (data) => {
  const cleaned = {};

  Object.entries(data).forEach(([key, value]) => {
    // skip empty values
    if (value === "" || value === undefined || value === null) return;
    cleaned[key] = value;
  });
  return cleaned;
};
