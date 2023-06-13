export const checkIfKeyExist = (object: any, keyName: any) => {
  let keyExist = Object.keys(object).some((key) => key === keyName);
  return keyExist;
};

export enum OptionKey {
  Label = "label",
  Value = "value",
}
export const isLabelValuePair = (obj: any) => {
  return (
    checkIfKeyExist(obj, OptionKey.Label) &&
    checkIfKeyExist(obj, OptionKey.Value)
  );
};
