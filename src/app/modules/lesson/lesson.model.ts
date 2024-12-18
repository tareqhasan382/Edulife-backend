import { Schema, model } from "mongoose";
import { ILesson } from "./lesson.interface";

const lessonSchema = new Schema<ILesson>(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    vocabularyCount: {
      type: Number,
      default: 0,
    },
    vocabulary: [{ type: Schema.Types.ObjectId, ref: "Vocabulary" }],
  },
  { timestamps: true }
);

export const LessonModel = model<ILesson>("Lessons", lessonSchema);
