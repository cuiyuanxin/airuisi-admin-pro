import { ResultEnum } from '@/config/constant/httpEnum'

export function resultSuccess<T = Recordable>(result: T, { message = 'success' } = {}) {
  return {
    code: ResultEnum.SUCCESS,
    result,
    message,
    type: 'success',
  }
}

export function resultError(message = 'error', { code = ResultEnum.ERROR, result = null } = {}) {
  return {
    code,
    result,
    message,
    type: 'error',
  }
}
