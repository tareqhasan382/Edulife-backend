import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { VocabularyModel } from "./vocabulary.model";
import { IVocabulary } from "./vocabulary.interface";
import { LessonModel } from "../lesson/lesson.model";

const createVocabulary = catchAsync(async (req: Request, res: Response) => {
  try {
    // vocabularyCount
    const data = req.body;
    const result = await VocabularyModel.create(data);
    await LessonModel.updateOne(
      { _id: result.lesson },
      { $inc: { vocabularyCount: 1 } }
    );

    // Send response
    sendResponse<IVocabulary>(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Vocabulary Created successfully..!!",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Vocabulary creation failed..!!",
      data: error,
    });
  }
});

const getNumberVocabulary = catchAsync(async (req: Request, res: Response) => {
  const result = await VocabularyModel.find({ lessonNo: req.params.lessonNo });

  sendResponse<IVocabulary[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vocabulary fetch successfully..!!",
    data: result,
  });
});
const allVocabulary = catchAsync(async (req: Request, res: Response) => {
  const result = await VocabularyModel.find().sort({
    number: 1,
  });

  sendResponse<IVocabulary[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vocabulary fetch successfully..!!",
    data: result,
  });
});
export const vocabularyController = {
  createVocabulary,
  getNumberVocabulary,
  allVocabulary,
};
