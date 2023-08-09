type CacheType = 'localStorage' | 'sessionStorage' | 'cookie'

interface CacheOptions {
  type?: CacheType
  expire?: number
  prefix?: string
}

export default class LocalStorage {
  private static cacheType: CacheType = 'localStorage'
  private static expire: number = 7
  private static prefix: string = 'airuisi_'
  private static localCache: Storage = localStorage

  static configure(options: CacheOptions): void {
    if (options.type && ['localStorage', 'sessionStorage', 'cookie'].includes(options.type)) {
      LocalStorage.cacheType = options.type
    }
    if (options.expire && options.expire >= 0) {
      LocalStorage.expire = options.expire
    }
    if (options.prefix) {
      LocalStorage.prefix = options.prefix
    }
  }

  private static getStorage(cacheType: string) {
    const type = cacheType ?? LocalStorage.cacheType
    if (type === 'localStorage') {
      LocalStorage.localCache = localStorage
    } else if (type === 'sessionStorage') {
      LocalStorage.localCache = sessionStorage
    }
  }

  private static getKey(key: string): string {
    return `${LocalStorage.prefix}${key}`
  }

  private static getExpireDate(permanent: number): string {
    if (permanent > 0) {
      const date = new Date()
      date.setDate(date.getDate() + LocalStorage.expire)
      return date.toUTCString()
    } else {
      return ''
    }
  }

  private static setCookie(name: string, value: string, expireDays: string): void {
    const expires = expireDays ? `;expires=${expireDays}` : ''
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}`
  }

  private static getCookie(name: string, def: any = null): string | null {
    const decodedCookie = decodeURIComponent(document.cookie)
    const cookieParts = decodedCookie.split(';')
    for (const part of cookieParts) {
      const keyValue = part.trim().split('=')
      if (keyValue[0] === name) {
        return keyValue[1]
      }
    }
    return def
  }

  private static removeCookie(name: string): void {
    const expires = ';expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = `${name}=${expires}`
  }

  private static clearCookie(): void {
    const keys = document.cookie.match(/[^ =;]+(?==)/g)
    if (keys) {
      for (let i = keys.length; i--; ) {
        document.cookie = keys[i] + '=0;expire=' + new Date(0).toUTCString()
      }
    }
  }

  static set(key: string, value: any, expire: number = 0, cacheType?: string): void {
    const name = LocalStorage.getKey(key)
    const expireDate = LocalStorage.getExpireDate(expire)
    const serializedValue = JSON.stringify(value)

    if (cacheType === 'cookie') {
      LocalStorage.setCookie(name, serializedValue, expireDate)
    } else {
      cacheType && LocalStorage.getStorage(cacheType)

      LocalStorage.localCache.setItem(name, serializedValue)
    }
  }

  static get(key: string, def: any = null, cacheType?: string): any | null {
    const name = LocalStorage.getKey(key)

    let value: string | null

    if (cacheType === 'cookie') {
      value = LocalStorage.getCookie(name, def)
    } else {
      cacheType && LocalStorage.getStorage(cacheType)
      value = LocalStorage.localCache.getItem(name)
    }

    try {
      return value ? JSON.parse(value) : null
    } catch (e) {
      return def
    }
  }

  static remove(key: string, cacheType?: string): void {
    const name = LocalStorage.getKey(key)

    if (cacheType === 'cookie') {
      LocalStorage.removeCookie(name)
    } else {
      cacheType && LocalStorage.getStorage(cacheType)
      LocalStorage.localCache.removeItem(key)
    }
  }

  static clear(cacheType?: string): void {
    if (cacheType === 'cookie') {
      LocalStorage.clearCookie()
    } else {
      cacheType && LocalStorage.getStorage(cacheType)
      LocalStorage.localCache.clear()
    }
  }
}
