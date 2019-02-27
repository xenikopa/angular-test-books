export interface IBook {
  id: number;
  name: string;
  description: string;
  author: string;
  publisher: string;
  code: string;
  publishYear: number;
  rate: number;
  image?: string;
  pageCount?: number;
  rewiews?: Array<{
    userName: string;
    review: string;
  }>;
  privateNotes?: Array<string>;
}
