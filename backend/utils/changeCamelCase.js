const toCamelCase = (str) => {
  return str
    ?.toLowerCase() // Ensure the entire string is lowercase first
    ?.replace(/([-_\s][a-z])/g, (match) => {
      return match
        .toUpperCase()
        .replace("-", "")
        .replace("_", "")
        .replace(" ", "");
    })
    ?.replace(/^[a-z]/, (match) => match.toLowerCase()); // Ensure the first character is lowercase
};

module.exports = { toCamelCase };
