import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'login.index': { paramsTuple?: []; params?: {} }
    'login.login': { paramsTuple?: []; params?: {} }
    'jurusans.index': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'login.index': { paramsTuple?: []; params?: {} }
    'jurusans.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'login.index': { paramsTuple?: []; params?: {} }
    'jurusans.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'login.login': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}