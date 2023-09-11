export const SERVER_URL = 'http://192.168.0.110:7777' + '/api'
export const getAuthUrl = (string: string) => `/auth${string}`
export const getUsersUrl = (string: string) => `/users${string}`
export const getGenresUrl = (string: string) => `/genre${string}`
export const getCatalogUrl = (string: string) => `/catalog${string}`

export const getBookUrl = (string: string) => `/book${string}`

export const getHistoryUrl = (string: string) => `/history${string}`
