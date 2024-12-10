import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "./user.model";
import { ILoginResponse, IUser } from "./user.interface";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";
const createUser = catchAsync(async (req: Request, res: Response) => {
  try {
    // Check if user with the given email already exists
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "User already exists with this email..!!",
        data: null,
      });
    }

    // Create new user if email does not exist
    const result = await UserModel.create(req.body);

    // Send response
    sendResponse<IUser>(res, {
      statusCode: StatusCodes.CREATED, // Use 201 CREATED instead of OK
      success: true,
      message: "User Created successfully..!!",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR, // Use 500 for unexpected errors
      success: false,
      message: "User creation failed..!!",
      data: error,
    });
  }
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if the user exists
  const isUserExist = await UserModel.findOne(
    { email },
    { password: 1, role: 1, name: 1, image: 1, email: 1 }
  );

  if (!isUserExist) {
    // User does not exist
    return sendResponse<ILoginResponse>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "User does not exist",
      data: null,
    });
  }

  // Verify if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    // Incorrect password
    return sendResponse<ILoginResponse>(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Password is incorrect",
      data: null,
    });
  }

  // Generate JWT tokens
  const payload = {
    user: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
    image: isUserExist.image,
  };

  const accessToken = jwt.sign(payload, config.jwt.secret as string, {
    expiresIn: "15d", // Access token expiration time
  });

  const refreshToken = jwt.sign(payload, config.jwt.secret as string, {
    expiresIn: "30d", // Refresh token expiration time, could be longer
  });

  // Set the refresh token into an HTTP-only cookie for secure handling
  const cookieOptions = {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: config.env === "production" ? "Strict" : "Lax", // Conditionally set the sameSite value
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };
  // const cookieOptions = {
  //   secure: config.env === "production",
  //   httpOnly: true,
  // };
  res.cookie("refreshToken", refreshToken, cookieOptions as any);

  // Send response with access and refresh tokens
  return sendResponse<ILoginResponse>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged in successfully..!!",
    data: { accessToken, refreshToken },
  });
});

const allUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserModel.find();

  sendResponse<IUser[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users fetch successfully..!!",
    data: result,
  });
});
export const userController = {
  createUser,
  loginUser,
  allUser,
};
