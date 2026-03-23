import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'login.index': { paramsTuple?: []; params?: {} }
    'login.auth': { paramsTuple?: []; params?: {} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'login.logout': { paramsTuple?: []; params?: {} }
    'master_data_fakultas.index': { paramsTuple?: []; params?: {} }
    'master_data_fakultas.create': { paramsTuple?: []; params?: {} }
    'master_data_fakultas.store': { paramsTuple?: []; params?: {} }
    'master_data_fakultas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_fakultas.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_fakultas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_fakultas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fakultas.search': { paramsTuple?: []; params?: {} }
    'fakultas.datatable': { paramsTuple?: []; params?: {} }
    'master_data_jurusan.index': { paramsTuple?: []; params?: {} }
    'master_data_jurusan.create': { paramsTuple?: []; params?: {} }
    'master_data_jurusan.store': { paramsTuple?: []; params?: {} }
    'master_data_jurusan.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_jurusan.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_jurusan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_jurusan.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusans.datatable': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'prints.index': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'login.index': { paramsTuple?: []; params?: {} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'login.logout': { paramsTuple?: []; params?: {} }
    'master_data_fakultas.index': { paramsTuple?: []; params?: {} }
    'master_data_fakultas.create': { paramsTuple?: []; params?: {} }
    'master_data_fakultas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_fakultas.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fakultas.search': { paramsTuple?: []; params?: {} }
    'fakultas.datatable': { paramsTuple?: []; params?: {} }
    'master_data_jurusan.index': { paramsTuple?: []; params?: {} }
    'master_data_jurusan.create': { paramsTuple?: []; params?: {} }
    'master_data_jurusan.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_jurusan.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusans.datatable': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'prints.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'login.index': { paramsTuple?: []; params?: {} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'login.logout': { paramsTuple?: []; params?: {} }
    'master_data_fakultas.index': { paramsTuple?: []; params?: {} }
    'master_data_fakultas.create': { paramsTuple?: []; params?: {} }
    'master_data_fakultas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_fakultas.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fakultas.search': { paramsTuple?: []; params?: {} }
    'fakultas.datatable': { paramsTuple?: []; params?: {} }
    'master_data_jurusan.index': { paramsTuple?: []; params?: {} }
    'master_data_jurusan.create': { paramsTuple?: []; params?: {} }
    'master_data_jurusan.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_jurusan.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusans.datatable': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'prints.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'login.auth': { paramsTuple?: []; params?: {} }
    'master_data_fakultas.store': { paramsTuple?: []; params?: {} }
    'master_data_jurusan.store': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'master_data_fakultas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_jurusan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'master_data_fakultas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_jurusan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'master_data_fakultas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_jurusan.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}