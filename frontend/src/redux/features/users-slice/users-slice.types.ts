export type InitialState = {
  users: UsersCollectionState[];
};

export type UsersCollectionState = {
  username: string;
  state: string;
  score: string;
  id: string;
  occupation: string;
};
