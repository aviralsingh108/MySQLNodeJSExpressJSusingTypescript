import express, { Application } from 'express';
import morgan from 'morgan';
import IndexRoutes from './routes/index.routes'
import PostRoutes from './routes/posts.routes'
export class Server {
    private app: Application;
    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.port || 3000)
    }
    middlewares(){
        this.app.use(morgan('dev'))
    }
    async listen() {
        await this.app.listen(this.app.get('port'), () => { console.log('Server on Port', this.app.get('port')); })
    }
    routes(){
        this.app.use(IndexRoutes)
        this.app.use('/post',PostRoutes)
    }
}
