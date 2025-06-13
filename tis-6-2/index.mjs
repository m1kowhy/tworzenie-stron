// index.js
import Koa from 'koa';
import Router from 'koa-router';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = new Koa();
const router = new Router();
const PORT = 8080;

// Strona główna
router.get('/', (ctx) => {
  ctx.body = `
    <h1>Witaj w mojej aplikacji Koa!</h1>
    <p>Dostępne strony:</p>
    <ul>
      <li><a href="/hello">/hello</a> - Powitanie</li>
      <li><a href="/goodbye">/goodbye</a> - Pożegnanie</li>
    </ul>
  `;
});

// Strona /hello
router.get('/hello', (ctx) => {
  ctx.body = '<h1 style="color: blue;">Hello, world</h1>';
});

// Strona /goodbye
router.get('/goodbye', (ctx) => {
  ctx.body = '<h1 style="color: red;">Goodbye, world</h1>';
});

// Używamy routera
app.use(router.routes());
app.use(router.allowedMethods());

// Uruchom serwer
app.listen(PORT, () => {
  console.log(`Serwer Koa działa na http://127.0.0.1:${PORT}`);
});
