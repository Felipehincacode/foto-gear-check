export interface Equipment {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  isPacked: boolean;
  createdAt: number;
}

export type FilterType = 'all' | 'packed' | 'unpacked';
