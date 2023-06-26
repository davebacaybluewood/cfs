export interface BlogTags {
  label: string;
  _id: string;
}

export interface BlogData {
  _id: string;
  authorID: string;
  metaTagTitle?: string;
  metaTagDescription?: string;
  metaTagKeywords?: string;
  thumbnail: string;
  thumbnailCloudinaryId: string;
  title: string;
  tags?: BlogTags[];
  content: string;
  createdAt?: string;
  updatedAt?: string;
  thumbnailAlt: string;
  authorName?: string;
  authorThumbnail?: string;
}

export interface BlogDataWithLength {
  blogLength: number;
  blogs: BlogData[] | undefined;
}
