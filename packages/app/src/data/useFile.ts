import { useEffect, useState } from 'react'
import Routes from '@plural/tt-routes'

import useApi, { uri } from '../api/useApi'

const useFile = (fileName: string) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const api = useApi()

  useEffect(
    () => {
      if (!fileName) return
      setLoading(true)

      api
        .get(uri`/data/${fileName}`)
        .then(
          res => {
            const result = res.data as Routes['/data/:fileName']['GET']
            setData(result)
            setLoading(false)
          },
        )
    },
    [fileName],
  )

  return {
    data,
    loading,
  }
}

export default useFile
