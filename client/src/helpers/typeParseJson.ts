const tryParseJson = (jsonString: any) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return undefined;
  }
};

export default tryParseJson;
