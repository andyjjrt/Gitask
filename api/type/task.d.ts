export interface Task {
  id: number;
  node_id: string;
  number: number;
  state: string;
  title: string;
  body: string | null;
  reactions: {
    url: string;
    total_count: number;
    "+1": number;
    "-1": number;
    laugh: number;
    confused: number;
    heart: number;
    hooray: number;
    eyes: number;
    rocket: number;
  };
}
