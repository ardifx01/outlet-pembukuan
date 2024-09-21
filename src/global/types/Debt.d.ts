export type Debt = {
  id: number;
  total: number;
  note: string;
  paid: boolean;
  created_at: string;
  updated_at: string;
  expense?: {
    name: string;
    created_at: string;
  };
};
