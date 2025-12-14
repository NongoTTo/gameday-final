export interface Article {
  id: string;
  title: string;
  image: string;
  category?: string;
  date?: string;
  excerpt?: string;
  content?: string;
  summary?: string[];
}

export interface AdBanner {
  id: string;
  image: string;
  link: string;
}

export enum GeminiStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}