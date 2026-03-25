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
    'jurusans.search': { paramsTuple?: []; params?: {} }
    'jurusans.datatable': { paramsTuple?: []; params?: {} }
    'jurusans.majors_of_faculty': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_mahasiswa.index': { paramsTuple?: []; params?: {} }
    'master_data_mahasiswa.create': { paramsTuple?: []; params?: {} }
    'master_data_mahasiswa.store': { paramsTuple?: []; params?: {} }
    'master_data_mahasiswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_mahasiswa.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_mahasiswa.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_mahasiswa.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswas.datatable': { paramsTuple?: []; params?: {} }
    'tokens.index': { paramsTuple?: []; params?: {} }
    'fakultas.index': { paramsTuple?: []; params?: {} }
    'fakultas.create': { paramsTuple?: []; params?: {} }
    'fakultas.store': { paramsTuple?: []; params?: {} }
    'fakultas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fakultas.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fakultas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fakultas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusan.index': { paramsTuple?: []; params?: {} }
    'jurusan.create': { paramsTuple?: []; params?: {} }
    'jurusan.store': { paramsTuple?: []; params?: {} }
    'jurusan.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusan.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusan.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswa.index': { paramsTuple?: []; params?: {} }
    'mahasiswa.create': { paramsTuple?: []; params?: {} }
    'mahasiswa.store': { paramsTuple?: []; params?: {} }
    'mahasiswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswa.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswa.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswa.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
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
    'jurusans.search': { paramsTuple?: []; params?: {} }
    'jurusans.datatable': { paramsTuple?: []; params?: {} }
    'jurusans.majors_of_faculty': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_mahasiswa.index': { paramsTuple?: []; params?: {} }
    'master_data_mahasiswa.create': { paramsTuple?: []; params?: {} }
    'master_data_mahasiswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_mahasiswa.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswas.datatable': { paramsTuple?: []; params?: {} }
    'tokens.index': { paramsTuple?: []; params?: {} }
    'fakultas.index': { paramsTuple?: []; params?: {} }
    'fakultas.create': { paramsTuple?: []; params?: {} }
    'fakultas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fakultas.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusan.index': { paramsTuple?: []; params?: {} }
    'jurusan.create': { paramsTuple?: []; params?: {} }
    'jurusan.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusan.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswa.index': { paramsTuple?: []; params?: {} }
    'mahasiswa.create': { paramsTuple?: []; params?: {} }
    'mahasiswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswa.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
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
    'jurusans.search': { paramsTuple?: []; params?: {} }
    'jurusans.datatable': { paramsTuple?: []; params?: {} }
    'jurusans.majors_of_faculty': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_mahasiswa.index': { paramsTuple?: []; params?: {} }
    'master_data_mahasiswa.create': { paramsTuple?: []; params?: {} }
    'master_data_mahasiswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_mahasiswa.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswas.datatable': { paramsTuple?: []; params?: {} }
    'tokens.index': { paramsTuple?: []; params?: {} }
    'fakultas.index': { paramsTuple?: []; params?: {} }
    'fakultas.create': { paramsTuple?: []; params?: {} }
    'fakultas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fakultas.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusan.index': { paramsTuple?: []; params?: {} }
    'jurusan.create': { paramsTuple?: []; params?: {} }
    'jurusan.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusan.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswa.index': { paramsTuple?: []; params?: {} }
    'mahasiswa.create': { paramsTuple?: []; params?: {} }
    'mahasiswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswa.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'login.auth': { paramsTuple?: []; params?: {} }
    'master_data_fakultas.store': { paramsTuple?: []; params?: {} }
    'master_data_jurusan.store': { paramsTuple?: []; params?: {} }
    'master_data_mahasiswa.store': { paramsTuple?: []; params?: {} }
    'fakultas.store': { paramsTuple?: []; params?: {} }
    'jurusan.store': { paramsTuple?: []; params?: {} }
    'mahasiswa.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'master_data_fakultas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_jurusan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_mahasiswa.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fakultas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswa.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'master_data_fakultas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_jurusan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_mahasiswa.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fakultas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswa.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'master_data_fakultas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_jurusan.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'master_data_mahasiswa.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fakultas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'jurusan.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'mahasiswa.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}