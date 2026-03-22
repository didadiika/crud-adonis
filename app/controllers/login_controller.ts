import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import env from '#start/env'
import Hash from '@adonisjs/core/services/hash'


export default class LoginController {

    public async index({ view }) {

        return view.render('login', { baseUrl: env.get('APP_URL') })
    }


    async auth({ request, auth, response }: HttpContext) {
        const { username, password } = request.only(['username', 'password'])
        const user = await User.findBy('email', username)

        if(!user){
            return response.abort(401, 'Invalid credentials')
        }
        const isValid = await Hash.verify(user.password, password)
        if (!isValid) {
            return response.abort(401, 'Invalid password')
        }
        await auth.use('web').login(user)
        return response.redirect('/dashboard')
    }

    async logout({ auth, response }: HttpContext) {
        await auth.use('web').logout()
        return response.redirect('/login')
    }
}