export interface Todo {
  id: number;
  Name: string;
  Description: string;
  DateStart: string;
  DateEnd: string;
  Priority: "Low" | "Medium" | "High";
}
