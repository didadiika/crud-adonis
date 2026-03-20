 import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
    public async index({ response, view}: HttpContext) {
        // const html = await view.render('posts/index')
        // return response.send(html)

        const users = [{ id: 1, name: 'John Doe', hidden: true },
            { id: 2, name: 'Jane Doe', hidden: false },
            { id: 3, name: 'Bob Smith', hidden: true },
            { id: 4, name: 'Alice Johnson', hidden: false }
        ];

        
        
        const html = await view.render('posts/index', {title:'Post Index Page', users})
        return response.send(html)
    }

}