// eslint-disable-next-line import/no-extraneous-dependencies
import { CellObject } from 'xlsx'

declare interface DataRoutes {
  '/data/:fileName': {
    GET: {
      name: string
      type: string
      data: CellObject[][]
    }[]
  }
}

export default DataRoutes
