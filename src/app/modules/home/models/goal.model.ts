export interface Goal {
  id?: number;
  title: string;
  due_date: string;
  progress: number;
  user?: string;
}
