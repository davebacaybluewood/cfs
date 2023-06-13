const undefinedValidator = (oldData, newData) => {
  if (!newData || newData === oldData) {
    return oldData;
  }

  return newData;
};

export default undefinedValidator;
