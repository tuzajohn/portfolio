export type PortfolioContentType = 'image' | 'video' | 'youtube' | 'carousel';

export interface PortfolioItem {
  _id?: string;
  title: string;
  projectType: string;
  client: string;
  technologies: string;
  previewUrl?: string;
  thumbnailUrl: string;
  contentType: PortfolioContentType;
  mediaUrls: string[];
  description?: string;
  order: number;
  isVisible: boolean;
}
