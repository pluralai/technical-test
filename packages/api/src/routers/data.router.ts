import path from 'path'
import fs from 'fs'

import Routes, { Route } from '@plural/tt-routes'
import { ConfigureRouter } from '@plural/tt-types'

import handleAsync from './handleAsync'
import RouterError from '../errors/RouterError'
import { parseFile } from '../parsing/fileParsing'

const getData: Route<Routes['/data/:fileName']['GET']> = async req => {
  const { fileName } = req.params
  if (!fileName) throw new RouterError('fileName is required', { status: 400 })

  const filePath = path.join(__dirname, '../files', fileName)
  const exists = fs.existsSync(filePath)
  if (!exists) throw new RouterError('file not found', { status: 404 })

  const fileData = fs.readFileSync(filePath)
  const parsedFile = parseFile(fileName, fileData)

  return parsedFile
}

const dataRoutes: ConfigureRouter = router => {
  router.get(
    '/:fileName',
    handleAsync(getData),
  )

  return router
}

export default dataRoutes
