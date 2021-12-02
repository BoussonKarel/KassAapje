import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '.'
import { addCurrentUserToRequest } from './customAuthChecker'

async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { error, statusCode } = await addCurrentUserToRequest(request);

  if (error && statusCode) {
    return response.send({ message: error }).status(statusCode)
  }

  next()
}

export default authMiddleware