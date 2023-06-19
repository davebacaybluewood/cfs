export interface AuthorType {
  image: string | " ";
  authorName: string;
}
export interface BlogType {
  blogId: string;
  image: string;
  date: string;
  title: string;
  description: string;
  author: AuthorType;
  onClick?: () => void;
}
