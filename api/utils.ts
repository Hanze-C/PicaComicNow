import { VercelRequest, VercelResponse } from '@vercel/node'
import { HandleResponse } from 'serverless-kit'

export default async (req: VercelRequest, res: VercelResponse) => {
  const http = new HandleResponse(req, res)
  http.send(403, 'Invalid endpoint')
}

export function getTokenFromReq(req: VercelRequest): string | null {
  return (
    (req.query.token as string) ||
    req.headers.authorization?.replace(/^Bearer\s+/, '') ||
    req.cookies?.['PICA_TOKEN'] ||
    null
  )
}

export function toUpperCamelCase(str: string) {
  const s = str.split('')
  const t = s.map((item, index) => {
    if (index === 0) {
      return item.toUpperCase()
    }
    if (item === '_' || item === '-') {
      s[index + 1] = s[index + 1].toUpperCase()
      return ''
    }
    return item
  })
  return t.join('')
}

export function replaceFileUrl(obj: Record<string, any>) {
  for (const i in obj) {
    const key = i
    const val = obj[i]

    // String
    if (typeof val === 'string') {
      if (val.startsWith('https://')) {
        obj[key] = val
          .replace('storage1.picacomic.com', 'proxy.hanze.icu/proxy/https://storage1.picacomic.com')
          .replace('storage-b.picacomic.com', 'proxy.hanze.icu/proxy/https://storage-b.picacomic.com')
          .replace('img.picacomic.com', 'proxy.hanze.icu/proxy/https://img.picacomic.com')
          .replace('www.picacomic.com', 'pica-api.hanze.icu')
      }
    }
    // Object
    else if (typeof val === 'object') {
      obj[key] = replaceFileUrl(val)
      if (val.fileServer && val.path) {
        obj[key].fileUrl = `${val.fileServer.replace(
          /\/$/,
          ''
        )}/static/${val.path.replace(/^\//, '')}`.replace(
          '/static/static',
          '/static'
        )
      }
    }
  }

  return obj
}
