import dayjs from 'dayjs';
import days from '../lib/time';

test('test days', () => {
  const time = '2024-06-14';
  console.log(dayjs(time).get('month'), dayjs(time).format('M'));
  console.log(dayjs().get('day'), dayjs().format('D'));
});

const weekTransactions = [
  // Monday, 2024-09-02
  {
    time: '2024-09-02 09:30:00',
    basic: 120,
    sell: 160,
    name: 'Product A',
  },
  {
    time: '2024-09-02 12:45:00',
    basic: 180,
    sell: 220,
    name: 'Product B',
  },

  // No transactions on Tuesday, 2024-09-03

  // Wednesday, 2024-09-04
  {
    time: '2024-09-04 11:00:00',
    basic: 150,
    sell: 200,
    name: 'Product C',
  },
  {
    time: '2024-09-04 16:20:00',
    basic: 100,
    sell: 130,
    name: 'Product D',
  },

  // No transactions on Thursday, 2024-09-05

  // Friday, 2024-09-06
  {
    time: '2024-09-06 08:45:00',
    basic: 170,
    sell: 220,
    name: 'Product E',
  },

  // No transactions on Saturday, 2024-09-07

  // Sunday, 2024-09-08
  {
    time: '2024-09-08 11:25:00',
    basic: 130,
    sell: 170,
    name: 'Product F',
  },
  {
    time: '2024-09-08 14:55:00',
    basic: 160,
    sell: 210,
    name: 'Product G',
  },
];

function acumulationTransaction(
  transaction: Array<{time: string; basic: number; sell: number}>,
  period: 'week' | 'month' | 'year',
) {
  const monthDates = [
    [1, 7],
    [8, 15],
    [16, 23],
    [23, days().endOf('months').get('D')],
  ];
  const profit: {[key: string]: number} = {};
  transaction.forEach(({time, basic, sell}) => {
    let dateTrx: string;
    if (period == 'week') {
      let day = days(time).get('day');
      day == 0 ? (day += 7) : null;
      dateTrx = day.toString();
    } else if (period == 'year') {
      dateTrx = (days(time).get('month') + 1).toString();
    } else {
      let date = days(time).get('date');
      const ranges = monthDates.filter(range => {
        date >= range[0] && date <= range[1];
      });
      dateTrx = ranges[0].join('');
    }
    if (!profit[dateTrx]) {
      profit[dateTrx] = 0;
    }
    profit[dateTrx] += sell - basic;
  });
  return profit;
}

test('test transaction acumulation', () => {
  console.log(acumulationTransaction(weekTransactions, 'week'));
});

test('range filter', () => {
  const monthDates = [
    [1, 7],
    [8, 15],
    [16, 23],
    [23, days().endOf('months').get('D')],
  ];
  const date = 6;
  const ranges = monthDates.filter(
    range => date >= range[0] && date <= range[1],
  );
  expect(ranges[0]).toBe(monthDates[0]);
});

test('test array', () => {
  const array = new Array<number>(10).fill(0);
  const obj = {'1': 1, '2': 2, '3': 3};
  obj;
});
