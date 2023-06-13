function checkObjectValidity(obj) {
  if (obj) {
    return Object.keys(obj).length !== 0;
  } else {
    false;
  }
}

export default checkObjectValidity;
