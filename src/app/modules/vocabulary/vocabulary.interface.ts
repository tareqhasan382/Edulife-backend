import { Types } from "mongoose";

export type IVocabulary = {
  _id?: string;
  word: string;
  pronunciation: string;
  meaning: string;
  whenToSay: string;
  lessonNo: number;
  adminEmail: Types.ObjectId;
};
