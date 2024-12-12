import { Types } from "mongoose";

export type IVocabulary = {
  _id?: string;
  word: string;
  pronunciation: string;
  meaning: string;
  whenToSay: string;
  lessonNo: number;
  lesson: Types.ObjectId;
  adminEmail: Types.ObjectId;
};
