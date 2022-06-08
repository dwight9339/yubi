export const extractUserErrors = (obj) => {
  return obj.userErrors.map((error) => error.message);
}