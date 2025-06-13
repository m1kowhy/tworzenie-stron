import Koa from 'koa';
import Router from 'koa-router';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import koaBodyPkg from 'koa-body';
const koaBody = koaBodyPkg.default;

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = new Koa();
const router = new Router();
const PORT = 8080;

// Middleware do parsowania formularzy
app.use(koaBody());

// Endpoint dla strony głównej
router.get('/', (ctx) => {
  ctx.redirect('/login');
});

// Endpoint GET /login - zwraca plik HTML
router.get('/login', (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream(join(__dirname, 'login.html'));
});

// Endpoint POST /login - przetwarza dane logowania
router.post('/login', (ctx) => {
  const { username, password } = ctx.request.body;
  
  if (!password || password.length < 8) {
    ctx.body = '<h1 style="color: red;">To hasło jest zbyt krótkie (minimum 8 znaków)</h1>';
    return;
  }
  
  if (username === 'admin' && password === 'adminadmin') {
    ctx.body = '<h1 style="color: green;">Zalogowany!</h1>';
  } else {
    ctx.body = '<h1 style="color: red;">Nieprawidłowa nazwa użytkownika lub hasło</h1>';
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
  console.log(`Strona logowania: http://localhost:${PORT}/login`);
});
