import { Schema, model } from "mongoose";
import { ITutorial } from "./tutorial.interface";

const tutorialSchema = new Schema<ITutorial>(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const TutorialModel = model<ITutorial>("Tutorial", tutorialSchema);
