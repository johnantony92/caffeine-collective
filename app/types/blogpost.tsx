export interface BlogPost {
  id: string;
  header: string;
  content: string;
  createdby?:string;
  createdon:string;
  createdbyusername:string;
  posttypeid:number;
  readCount:number,
  displayDate:string
}

export enum PostType {
  Guide = 1,
  REVIEW = 2,
  NEWS = 3,
  RECIPE = 4,
  EQUIPMENT = 5
}

export const POST_TYPE_LABELS: Record<PostType, string> = {
  [PostType.Guide]: "Guide",
  [PostType.REVIEW]: "Review",
  [PostType.NEWS]: "News",
  [PostType.RECIPE]: "Recipe",
  [PostType.EQUIPMENT]: "Equipment"
}
