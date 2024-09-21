const currency = (
  value: number,
  rp: boolean = false,
  strip: boolean = true,
) => {
  if (typeof value != 'number' || value == 0) return strip ? '-' : '0';
  return value.toLocaleString('ID-id', {
    minimumFractionDigits: 0,
    currency: 'IDR',
    style: rp ? 'currency' : 'decimal',
  });
};

export function formatNumber(num: number) {
  if (num >= 1e12) {
    // 1 trillion
    return (num / 1e12).toFixed(1).replace(/\.0$/, '') + 'T';
  }
  if (num >= 1e9) {
    // 1 billion
    return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1e6) {
    // 1 million
    return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'Jt';
  }
  if (num >= 1e3) {
    // 1 thousand
    return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'Rb';
  }
  return num.toString();
}

export default currency;
