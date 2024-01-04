import { jwt } from "@config/auth";
import { AppError } from "@shared/errors/AppErros";

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError("JWT token is missing.", 401);
  }

  const token = authorization.replace("Bearer", "").trim();

  if (!jwt.jwt_secret) {
    throw new Error();
  }

  try {
    const decodeToken = verify(token, jwt.jwt_secret);
    const { sub } = decodeToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token.", 401);
  }
}
