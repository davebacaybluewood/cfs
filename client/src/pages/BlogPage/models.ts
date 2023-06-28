export interface BlogTags {
  label: string;
  _id: string;
}

export interface BlogMetatagKeywords {
  keyword: string;
  _id: string;
}

export interface BlogData {
  _id: string;
  authorID: string;
  userGuid?: string;
  metaTagTitle?: string;
  metaTagDescription?: string;
  metaTagKeywords?: BlogMetatagKeywords[];
  thumbnail?: string;
  thumbnailCloudinaryId?: string;
  title: string;
  tags?: BlogTags[];
  content: string;
  createdAt?: string;
  updatedAt?: string;
  thumbnailAlt?: string;
  authorName?: string;
  authorThumbnail?: string;
}

export interface BlogDataWithLength {
  blogLength: number;
  blogs: BlogData[] | undefined;
}

export interface BlogPayload {
  metaTagTitle?: string;
  metaTagDescription?: string;
  metaTagKeywords?: string[];
  title: string;
  authorID: string;
  tags?: string[];
  content: string;
  _id?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
}
