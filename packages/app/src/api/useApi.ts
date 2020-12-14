import axios, { AxiosRequestConfig } from 'axios'
import { useCallback } from 'react'

const apiHost = process.env.API_HOST || 'http://localhost:8080/'

export function uri(strings: TemplateStringsArray, ...params: any[]): string {
  const path = strings
    .map((part, index) => {
      const param = params[index]

      switch (typeof param) {
        case 'undefined':
          return part

        case 'string':
        case 'number':
        case 'boolean':
          return `${part}${encodeURIComponent(param)}`

        case 'object':
          return `${part}${encodeURIComponent(JSON.stringify(param))}`

        // case 'function':
        // case 'bigint':
        // case 'symbol':
        default: throw new Error(`Unexpected type in uri ${typeof param}`)
      }
    })
    .join('')

  return path
}

export default function useApi() {
  const get = useCallback(
    async (path: string, config: AxiosRequestConfig = {}) => {
      const strippedPath = path.charAt(0) === '/'
        ? path.slice(1)
        : path

      return axios.get(
        `${apiHost}${strippedPath}`,
        {
          ...config,
        },
      )
    },
    [],
  )

  return {
    get,
  }
}
