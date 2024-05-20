export type sale = {
  id: number;
  name: string;
  category: string;
  basic_price: number;
  selling_price: number;
  created_at: string;
  type?: 'sale';
  receivable?: {
    total: number;
    note: string;
    paid: boolean;
  };
};

export type expense = {
  id: number;
  name: string;
  total: number;
  type?: 'expense';
  debt?: {
    total: number;
    note: string;
    paid: boolean;
  };
  created_at: string;
};

export type transaction = sale[] |   expense[];
