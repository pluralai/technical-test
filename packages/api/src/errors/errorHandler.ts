import { ErrorRequestHandler } from 'express'
import RouterError from './RouterError'

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  try {
    const isSafeToDisplayErrDetail = process.env.NODE_ENV === 'development'

    if (!(error instanceof RouterError)) {
      console.error(error?.stack)

      return res
        .status(500)
        .send(
          isSafeToDisplayErrDetail
            ? ((error && error.stack) || error?.message)
            : '',
        )
        .end()
    }

    const status = error.status || 500
    const message = error.message || ''
    const stack = [new Error().stack, error?.stack, error?.error?.stack]
      .filter(v => v)
      .join('\n\n\n')

    const responseText = isSafeToDisplayErrDetail
      ? `${message}\n\n\n${stack}`
      : message

    return res
      .status(status)
      .send(responseText)
      .end()
  } catch (err) {
    return next(next)
  }
}

export default errorHandler
