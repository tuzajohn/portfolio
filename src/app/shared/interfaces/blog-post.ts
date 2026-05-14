export interface BlogPost {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnailUrl: string;
  publishedAt: string;
  tags: string[];
  isPublished: boolean;
}
