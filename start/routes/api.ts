import router from '@adonisjs/core/services/router'
const FakultasController = () => import('#controllers/api/fakultas_controller')

router
  .group(() => {
    router.resource('/master-data/fakultas', FakultasController)
  })
  .prefix('/api')
  .as('api')
