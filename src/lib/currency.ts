const currency = (value: number) =>
  value.toLocaleString('ID-id', {
    maximumFractionDigits: 0,
    style: 'decimal',
  });

export default currency;
