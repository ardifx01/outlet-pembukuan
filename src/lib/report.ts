import days from './time';
export const monthDates = [
  [1, 7],
  [8, 15],
  [16, 23],
  [23, days().endOf('months').get('date')],
];

export function acumulationTransaction(
  transaction: Array<{
    created_at: string;
    basic_price: number;
    selling_price: number;
  }>,
  period: 'Minggu' | 'Bulan' | 'Tahun',
) {
  const profit: {[key: string]: number} = {};
  transaction.forEach(({created_at, basic_price, selling_price}) => {
    let dateTrx: string;
    if (period == 'Minggu') {
      let day = days(created_at).get('day');
      day == 0 ? (day += 7) : null;
      dateTrx = day.toString();
    } else if (period == 'Tahun') {
      dateTrx = (days(created_at).get('month') + 1).toString();
    } else {
      let date = days(created_at).get('date');
      const ranges = monthDates.filter(
        range => date >= range[0] && date <= range[1],
      );
      dateTrx = ranges[0].join('');
    }
    if (!profit[dateTrx]) {
      profit[dateTrx] = 0;
    }
    profit[dateTrx] += selling_price - basic_price;
  });
  return profit;
}
