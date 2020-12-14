import express, { Router } from 'express'
import cors from 'cors'

import errorHandler from './errors/errorHandler'

import dataRoutes from './routers/data.router'

const defaultConfig = {
  port: process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : 8080,
}

function main(config = defaultConfig) {
  const app = express()

  app.get(
    '/_health',
    (req, res) => res
      .status(200)
      .json({ status: 'healthy' })
      .end(),
  )

  app.use(
    cors({
      optionsSuccessStatus: 200,
      origin: (origin, next) => {
        switch (origin) {
          case process.env.ORIGIN:
          case 'http://localhost:8080':
          case 'http://localhost:3000':
            return next(null, true)

          default: return next(null, false)
        }
      },
    }),
    express.json({ limit: '50mb' }),
    express.urlencoded({ limit: '50mb' }),
  )

  app.use('/data', dataRoutes(Router()))

  app.use(errorHandler)

  app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}`)
  })
}

if (require.main === module) main()

export default main
