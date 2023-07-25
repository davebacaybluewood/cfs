const nameFallback = (
  name: string | undefined,
  firstName: string | undefined,
  lastName?: string | undefined
) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  return name;
};

export default nameFallback;
