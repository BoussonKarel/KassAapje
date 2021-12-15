import { Request, Response, NextFunction } from 'express'
import { ErrorWithStatus } from '../models/errorWithStatus'
import { addCurrentUserToRequest } from './customAuthChecker'

async function authenticateRequests(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  return await addCurrentUserToRequest(request)
    .then(() => next())
    .catch(e => {
      if (e instanceof ErrorWithStatus)
        response.send({ message: e.message }).status(e.status)
      else throw e;
    })
}

export default authenticateRequests
