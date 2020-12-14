import { Request } from 'express'

import DataRoutes from './@types/DataRoutes'

export declare type Route<T> = (req: Request) => Promise<T>

declare interface Routes extends
  DataRoutes
{}

export default Routes
