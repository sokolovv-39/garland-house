export function splitPrice(price: string) {
  const intPart = parseInt(price);
  const frac = (+parseFloat(price).toFixed(2)).toString().split(".")[1];
  let priceStr = intPart.toString();
  let i = priceStr.length - 1 - 3;
  while (i >= 0) {
    priceStr = priceStr.slice(0, i + 1) + " " + priceStr.slice(i + 1);
    i -= 3;
  }

  if (frac) {
    priceStr = priceStr + `.${frac}`;
  }
  priceStr = priceStr + " ₽";
  return priceStr;
}
