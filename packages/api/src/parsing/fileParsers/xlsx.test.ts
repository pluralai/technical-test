import tape from 'tape'
import sinon from 'sinon'

import parser from './xlsx'

tape('parsers.xlsx :: handles empty buffer', t => {
  const sand = sinon.createSandbox()

  const data = new ArrayBuffer(100)
  const result = parser(data)

  t.deepEqual(
    result,
    [],
    'Parses empty ArrayBuffer to []',
  )

  sand.restore()
  t.end()
})

tape('parsers.xlsx :: handles bad buffer', t => {
  const str = 'sdaj9c237489j12j74c8092b2b34b6352b-v4/2c=-4o.2v--=3/=cv234/-23\'--4\'v2342895v2&!£$*(£^"!$)_!"+@~{}:<?<?~'

  const data = new ArrayBuffer(str.length * 2)
  const view = new Uint16Array(data)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    view[i] = str.charCodeAt(i)
  }

  const result = parser(data)

  t.deepEqual(
    result,
    [
      {
        name: 'Sheet1',
        type: 'xlsx.sheet',
        data: [
          [
            {
              t: 's',
              v: str,
            },
          ],
        ],
        sha512_data: 'oCveGo4c04HudOgzbLgKZbVKseDhvtv+XRKJZ7Oe/Fh9c2iISyIfNGw8LB9tz5fARsIFZ17hEHN7HQXTDX0oLQ==',
      },
    ],
    'Parses empty ArrayBuffer to null',
  )
  t.end()
})

tape('parsers.xlsx :: handles bad input', t => {
  const str = 'sdaj9c237489j12j74c8092b2b34b6352b-v4/2c=-4o.2v--=3/=cv234/-23\'--4\'v2342895v2&!£$*(£^"!$)_!"+@~{}:<?<?~'

  const data = new ArrayBuffer(str.length * 2)
  const view = new Uint16Array(data)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    view[i] = str.charCodeAt(i)
  }

  const result = parser(data)

  t.deepEqual(
    result,
    [
      {
        name: 'Sheet1',
        type: 'xlsx.sheet',
        data: [
          [
            {
              t: 's',
              v: "sdaj9c237489j12j74c8092b2b34b6352b-v4/2c=-4o.2v--=3/=cv234/-23'--4'v2342895v2&!£$*(£^\"!$)_!\"+@~{}:<?<?~",
            },
          ],
        ],
        sha512_data: 'oCveGo4c04HudOgzbLgKZbVKseDhvtv+XRKJZ7Oe/Fh9c2iISyIfNGw8LB9tz5fARsIFZ17hEHN7HQXTDX0oLQ==',
      },
    ],
    'Parses empty ArrayBuffer to null',
  )

  t.end()
})
