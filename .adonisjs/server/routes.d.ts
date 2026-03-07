import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'login.index': { paramsTuple?: []; params?: {} }
    'login.login': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'login.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'login.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'login.login': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}