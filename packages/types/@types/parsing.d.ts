// eslint-disable-next-line import/no-extraneous-dependencies
import xlsx from 'xlsx/types'

export declare type ParsedSheet = xlsx.CellObject[][]
export declare type ParsedXLSX = [string, ParsedSheet][]

export declare type FileComponent = {
  name: string
  type: string
  data: any
  sha512: string
}

export declare type ExtensionParser = {
  extensions: string[]
  parser: (data: Buffer | ArrayBuffer) => FileComponent[]
}
