import { Request, RequestHandler } from 'express'
import RouterError from '../errors/RouterError'

const handleAsync = (
  asyncMethod: (req: Request) => Promise<any>,
): RequestHandler => async (req, res, next) => {
  try {
    const result = await asyncMethod(req)

    return res
      .status(200)
      .json(result)
      .end()
  } catch (err) {
    if (err instanceof RouterError) return next(err)

    console.error(err?.stack)
    const error = new Error(err.message)
    console.error(error?.stack)
    return next(
      new RouterError('Router Error', { status: 500, error }),
    )
  }
}

export default handleAsync
