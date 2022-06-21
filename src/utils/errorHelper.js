export const handleUserErrors = (data) => {
  const errors = [];
  
  Object.entries(data).forEach(([key, value]) => {
    errors.push(...value.userErrors
      .filter(({ message }) => !errors.includes(message))
      .map(({ message }) => message)
    );
  });

  if (errors.length) {
    throw errors;
  }
}

export const sanitizeErrorText = (err) => {
  if (Array.isArray(err)) {
    return err.map((error) => `${error}`);
  }

  return [`${err}`];
}