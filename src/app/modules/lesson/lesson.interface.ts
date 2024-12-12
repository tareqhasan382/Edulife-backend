import { Types } from "mongoose";

export type ILesson = {
  _id?: string;
  name: string;
  number: number;
  vocabularyCount: number;
  vocabulary: [Types.ObjectId];
};
