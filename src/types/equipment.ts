export interface Equipment {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  isPacked: boolean;
  category?: string;
  createdAt: number;
}

export type FilterType = 'all' | 'packed' | 'unpacked';
