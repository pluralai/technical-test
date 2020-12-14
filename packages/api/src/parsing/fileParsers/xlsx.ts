import xlsx from 'xlsx'
import { createHash } from 'crypto'
import {
  ParsedSheet, ExtensionParser, FileComponent,
} from '@plural/tt-types'

export function sha512(value: string): string {
  return createHash('sha512').update(value).digest('base64')
}

export function validFilledCell(cell: xlsx.CellObject): boolean {
  if (!cell?.v) return false

  if (cell.t === 's') {
    // eslint-disable-next-line
    cell.v = (cell.v as string).replace(/[\x00-\x1F\x7F-\x9F]/g, '')
    if (!cell.v) return false
  }

  return true
}

export function parseSheet(sheet: xlsx.Sheet): ParsedSheet {
  const cols = [
    ...new Set(
      Object.keys(sheet)
        .filter(key => /[A-Z]+\d+/.test(key))
        .map(key => key.replace(/\d+/, ''))
        .sort(),
    ),
  ]
  const maxRow = Number(
    sheet['!ref']?.replace(/[A-Z]+/g, '').split(':').pop(),
  )

  let foundSensibleValue = false

  const rows = []
  for (let rowIndex = 1; rowIndex <= maxRow; rowIndex += 1) {
    const cells = cols.map(col => sheet[`${col}${rowIndex}`] || {} as xlsx.CellObject)

    const numFilledCells = cells.filter(validFilledCell).length
    if (!numFilledCells) continue
    foundSensibleValue = true

    rows.push(cells)
  }

  if (!foundSensibleValue) throw new Error('Not a valid xlsx sheet')

  return rows
}

const parseXLSX: ExtensionParser['parser'] = data => {
  const workbook = xlsx.read(new Uint8Array(data), { type: 'array' })

  try {
    const parsedSheets = workbook.SheetNames.map(name => {
      const sheet = workbook.Sheets[name]

      try {
        const parsedData = parseSheet(sheet)

        const parsedSheet: FileComponent = {
          name,
          type: 'xlsx.sheet',
          data: parsedData,
          sha512: sha512(JSON.stringify(parsedData)),
        }

        return parsedSheet
      } catch (error) {
        console.error(error)
        return null
      }
    })

    return parsedSheets.filter(v => v) as ReturnType<ExtensionParser['parser']>
  } catch (err) {
    return []
  }
}

export default parseXLSX
