export type Movie = {
  id: string;
  title: string;
  category: string;
  likes: number;
  image?: string;
  dislikes: number;
  alreadyLiked?: boolean;
  alreadyDisliked?: boolean;
};
