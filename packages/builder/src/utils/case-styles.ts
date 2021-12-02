function toSnackCase(string: string) {
  if (!string) return "";
  
  const newValue = string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toUpperCase())
    .join("_");

  return newValue!;
}

function toKebabCase(string: string) {
  if (!string) return "";

  const newValue = string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");

  return newValue!;
}

export const cases = {
  snack: toSnackCase,
  kebab: toKebabCase,
};
