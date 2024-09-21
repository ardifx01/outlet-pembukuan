export type sale<T = string> = {
  id: number;
  name: string;
  category: string;
  basic_price: number;
  selling_price: number;
  created_at: T;
  type: 'sale';
  receivable?: {
    id: number;
    total: number;
    note: string;
    paid: boolean;
    updated_at: string;
    created_at: string;
  };
};

export type expense<T = string> = {
  id: number;
  name: string;
  total: number;
  type: 'expense';
  debt?: {
    id: number;
    total: number;
    note: string;
    paid: boolean;
    updated_at: string;
    created_at: string;
  };
  created_at: T;
};

export type transaction<T = string> = sale<T> | expense<T>;
