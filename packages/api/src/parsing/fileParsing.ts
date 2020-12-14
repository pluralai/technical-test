import {
  ExtensionParser,
} from '@plural/tt-types'

import parseXLSX from './fileParsers/xlsx'

const extensionParsers: ExtensionParser[] = [
  {
    extensions: [
      'xlsx',
      'xls',
      'csv',
    ],
    parser: parseXLSX,
  },
]

export function parseFile(fileName: string, fileData: Buffer): ReturnType<ExtensionParser['parser']> {
  const extension = fileName.split('.').pop()
  if (!extension) return []

  for (const { extensions, parser } of extensionParsers) {
    if (extensions.includes(extension)) {
      const parsedFile = parser(fileData)

      if (parsedFile) return parsedFile
    }
  }

  return []
}
