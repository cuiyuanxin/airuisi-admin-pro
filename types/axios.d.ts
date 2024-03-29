export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined
export type SuccessMessageMode = ErrorMessageMode

export interface RequestOptions {
  // Splicing request parameters to url
  // 将请求参数拼接到url
  joinParamsToUrl?: boolean
  // Format request parameter time
  // 格式请求参数时间
  formatDate?: boolean
  // Whether to process the request result
  // 是否处理请求结果
  isTransformResponse?: boolean
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  // 是否返回本地响应头
  // 例如:当你需要获取响应头时使用此属性
  isReturnNativeResponse?: boolean
  // Whether to join url
  // 是否加入url
  joinPrefix?: boolean
  // Interface address, use the default apiUrl if you leave it blank
  // 接口地址，如果不输入，则使用默认的apiUrl
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // Error message prompt type
  // 错误信息提示类型
  errorMessageMode?: ErrorMessageMode
  // Success message prompt type
  // 成功消息提示类型
  successMessageMode?: SuccessMessageMode
  // Whether to add a timestamp
  // 是否添加时间戳
  joinTime?: boolean
  ignoreCancelToken?: boolean
  // Whether to send token in header
  // 是否在报头中发送令牌
  withToken?: boolean
  // 请求重试机制
  retryRequest?: RetryRequest
}

export interface RetryRequest {
  isOpenRetry: boolean
  count: number
  waitTime: number
}
export interface Result<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable
  // File parameter interface field name
  name?: string
  // file name
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}
