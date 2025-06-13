import Koa from 'koa';
import Router from 'koa-router';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = new Koa();
const router = new Router();
const PORT = 8080;

// Middleware do logowania żądań
app.use(async (ctx, next) => {
  console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.url}`);
  await next();
});

// Obsługa różnych metod HTTP
router.get('/', (ctx) => {
  ctx.body = {
    message: 'Witaj w API!',
    endpoints: [
      'GET / - Ta strona',
      'GET /hello - Proste GET',
      'POST /hello - Proste POST',
      'PUT /hello - Proste PUT',
      'DELETE /hello - Proste DELETE',
      'PATCH /hello - Proste PATCH',
      'GET /form - Formularz logowania',
      'GET /greet?name=Imię - Powitanie z parametrem'
    ]
  };
});

router.get('/hello', (ctx) => {
  const name = ctx.query.name || 'nieznajomy';
  ctx.body = { message: `Witaj ${name} (GET)` };
});

router.post('/hello', (ctx) => {
  ctx.body = { message: 'Odebrałem polecenie dodaj (POST)' };
});

router.put('/hello', (ctx) => {
  ctx.body = { message: 'Odebrałem polecenie aktualizuj (PUT)' };
});

router.delete('/hello', (ctx) => {
  ctx.body = { message: 'Odebrałem polecenie usuń (DELETE)' };
});

router.patch('/hello', (ctx) => {
  ctx.body = { message: 'Odebrałem polecenie częściowej aktualizacji (PATCH)' };
});

// Formularz z obsługą parametrów URL
router.get('/form', (ctx) => {
  const defaultLogin = ctx.query.login || '';
  
  ctx.type = 'html';
  ctx.body = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Formularz</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; }
        input, button { padding: 8px; margin: 5px 0; width: 100%; }
      </style>
    </head>
    <body>
      <h1>Formularz logowania</h1>
      <form action="/submit" method="post">
        <input type="text" name="username" placeholder="Login" value="${defaultLogin}">
        <input type="password" name="password" placeholder="Hasło">
        <button type="submit">Wyślij</button>
      </form>
      <p>Przykładowe linki:</p>
      <ul>
        <li><a href="/form?login=admin">Formularz z loginem "admin"</a></li>
        <li><a href="/form?login=test">Formularz z loginem "test"</a></li>
      </ul>
    </body>
    </html>
  `;
});

router.post('/submit', (ctx) => {
  ctx.body = { 
    message: 'Dane formularza odebrane',
    data: ctx.request.body 
  };
});

// Obsługa parametrów w route
router.get('/greet', (ctx) => {
  const name = ctx.query.name || 'nieznajomy';
  ctx.body = { message: `Witaj, ${name}!` };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
