import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'

router
  .group(() => {
    router.post('/users/tokens', [controllers.api.Tokens, 'tokens'])

    router
      .group(() => {
        router.post('users/refresh', [controllers.api.Tokens, 'refresh_token'])
        router.resource('/fakultas', controllers.api.Fakultas)
        router.resource('/jurusan', controllers.api.Jurusans)
        router.resource('/mahasiswa', controllers.Mahasiswas)
    }).middleware(middleware.auth({ guards: ['api'] }))
    
  })
  .prefix('/api')