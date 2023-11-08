const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  // PaperProps: {
  //   style: {
  //     maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //   },
  // },
  autoFocus: false,
  disableAutoFocusItem: true,
  disableEnforceFocus: true,
  disableAutoFocus: true,
};
const langOptions = ["English", "Chinese", "Spanish"];
const specialtiesOptions = ["Item 1", "Item 2"];

export {
  ITEM_HEIGHT,
  ITEM_PADDING_TOP,
  MenuProps,
  langOptions,
  specialtiesOptions,
};
