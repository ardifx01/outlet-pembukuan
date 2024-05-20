import {Children} from 'react';

const Each = <T,>({
  render,
  of,
  ifNull,
}: {
  render: (item: T, index: number) => React.JSX.Element;
  of: Array<T> | null;
  ifNull: React.JSX.Element;
}) => {
  return of
    ? Children.toArray(of.map((item, index) => render(item, index)))
    : ifNull;
};

export default Each;
