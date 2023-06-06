function isEven(n: number) {
  return n % 2 == 0;
}

function isOdd(n: number) {
  return Math.abs(n % 2) == 1;
}

export { isEven, isOdd };
