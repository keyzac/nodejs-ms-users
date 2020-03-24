import { App } from './Bootstrap/App';
import { Router } from './Bootstrap/Router';
import * as KRouter from 'koa-router';
import * as Koa from 'koa';

const port = 3636;

const router = new Router(new KRouter());
const app = new App(new Koa(), router);
export default app.koa.listen(port);
console.info('✨ Server running on port ' + port);
