export function truncate(text, maxLength) {
  return text.length > maxLength ? `${text.substr(0, maxLength)}...` : text;
};
