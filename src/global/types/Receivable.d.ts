export type Receivable = {
  id: number;
  total: number;
  note: string;
  paid: boolean;
  created_at: string;
  updated_at: string;
  sale: {
    name: string;
    category: string;
    created_at: string;
  } | null;
};
