import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { VocabularyModel } from "./vocabulary.model";
import { IVocabulary } from "./vocabulary.interface";
import { LessonModel } from "../lesson/lesson.model";

const createVocabulary = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const lesson = await LessonModel.findById(data.lesson);
    if (!lesson) {
      sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: "Vocabulary creation failed..!!",
      });
      return;
    }

    const result = await VocabularyModel.create({
      ...data,
      lessonNo: lesson.number,
    });
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
  const { limit = 40, page = 1 } = req.query;
  const result = await VocabularyModel.find({ lessonNo: req.params.lessonNo });

  sendResponse<IVocabulary[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vocabulary fetch successfully..!!",
    data: result,
  });
});
const singleVocabulary = catchAsync(async (req: Request, res: Response) => {
  const result = await VocabularyModel.findById(req.params.id);

  sendResponse<IVocabulary>(res, {
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

const deleteVocabulary = catchAsync(async (req: Request, res: Response) => {
  const result = await VocabularyModel.findByIdAndDelete(req.params.id);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "Vocabulary not found!",
    });
  }
  await LessonModel.updateOne(
    { _id: result.lesson },
    { $inc: { vocabularyCount: -1 } }
  );
  sendResponse<IVocabulary>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vocabulary deleted successfully..!!",
    data: result,
  });
});
export const vocabularyController = {
  createVocabulary,
  getNumberVocabulary,
  allVocabulary,
  singleVocabulary,
  deleteVocabulary,
};
