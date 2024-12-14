export type User = {
  id: string;
  username: string;
  score: number;
  createdAt: string;
  state: string;
};

export type HomeProps = {
  data: User[];
};