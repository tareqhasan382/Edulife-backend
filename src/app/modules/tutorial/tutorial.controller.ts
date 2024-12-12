import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { TutorialModel } from "./tutorial.model";
import { ITutorial } from "./tutorial.interface";

const createTutorial = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await TutorialModel.create(data);

    // Send response
    sendResponse<ITutorial>(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Tutorial Created successfully..!!",
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

const getbyIdTutorial = catchAsync(async (req: Request, res: Response) => {
  const result = await TutorialModel.findById(req.params.id);

  sendResponse<ITutorial>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Tutorial fetch successfully..!!",
    data: result,
  });
});
const allTutorial = catchAsync(async (req: Request, res: Response) => {
  const result = await TutorialModel.find().sort({
    number: 1,
  });

  sendResponse<ITutorial[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Tutorial fetch successfully..!!",
    data: result,
  });
});
export const tutorialController = {
  createTutorial,
  getbyIdTutorial,
  allTutorial,
};
