import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { LessonModel } from "./lesson.model";
import { ILesson } from "./lesson.interface";

const createLesson = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const count = await LessonModel.countDocuments();
    const result = await LessonModel.create({
      name: data.name,
      number: count + 1,
    });

    // Send response
    sendResponse<ILesson>(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Lesson Created successfully..!!",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Lesson creation failed..!!",
      data: error,
    });
  }
});

const allLesson = catchAsync(async (req: Request, res: Response) => {
  // const count = await LessonModel.countDocuments();
  // console.log("count:", count);
  const result = await LessonModel.find();

  sendResponse<ILesson[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Lesson fetch successfully..!!",
    data: result,
  });
});
export const lessonController = {
  createLesson,
  allLesson,
};
