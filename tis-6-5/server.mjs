import Koa from 'koa';
import Router from 'koa-router';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fetch from 'node-fetch';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = new Koa();
const router = new Router();
const PORT = 8080;

// Stałe współrzędne dla Poznania (domyślnie)
const DEFAULT_LAT = 52.4064;
const DEFAULT_LON = 16.9252;

// Pobieranie danych pogodowych
async function getWeatherData(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&daily=precipitation_sum&timezone=auto`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Problem z API');
    return await response.json();
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
    return null;
  }
}

// Generowanie HTML z danymi pogodowymi
function generateWeatherHTML(weather, coords) {
  const current = weather.current;
  const daily = weather.daily;
  const tomorrow = daily.precipitation_sum[1] > 0;
  
  let tempMessage;
  if (current.temperature_2m < 10) tempMessage = "Zimno 🥶";
  else if (current.temperature_2m < 20) tempMessage = "Przyjemnie 😊";
  else tempMessage = "Upał! 🥵";
  
  let rainMessage = tomorrow 
    ? "Jutro będą opady - weź parasol! ☔" 
    : "Jutro bez opadów - dobry dzień na spacer! 🌞";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Pogoda</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .weather-card { border: 1px solid #ddd; padding: 20px; border-radius: 10px; margin-top: 20px; }
        .temp { font-size: 2em; font-weight: bold; }
        .message { margin: 15px 0; padding: 10px; border-radius: 5px; }
        .cold { background-color: #d4f1f9; }
        .nice { background-color: #e8f8d4; }
        .hot { background-color: #ffdddd; }
      </style>
    </head>
    <body>
      <h1>Aktualna pogoda</h1>
      <div>
        <button onclick="getLocation()">Pobierz moją lokalizację</button>
        <span id="location-status"></span>
      </div>
      
      <div class="weather-card">
        <div class="temp">${current.temperature_2m}°C</div>
        <div>Prędkość wiatru: ${current.wind_speed_10m} km/h</div>
        
        <div class="message ${current.temperature_2m < 10 ? 'cold' : current.temperature_2m < 20 ? 'nice' : 'hot'}">
          ${tempMessage}
        </div>
        
        <div class="message">
          ${rainMessage}
        </div>
      </div>
      
      <p>Współrzędne: ${coords.lat.toFixed(4)}, ${coords.lon.toFixed(4)}</p>
      
      <script>
        function getLocation() {
          const status = document.getElementById('location-status');
          status.textContent = 'Pobieranie lokalizacji...';
          
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                window.location.href = \`/?lat=\${position.coords.latitude}&lon=\${position.coords.longitude}\`;
              },
              (error) => {
                status.textContent = 'Błąd: ' + error.message;
              }
            );
          } else {
            status.textContent = 'Geolokalizacja nie jest wspierana';
          }
        }
      </script>
    </body>
    </html>
  `;
}

// Endpoint główny
router.get('/', async (ctx) => {
  const lat = parseFloat(ctx.query.lat) || DEFAULT_LAT;
  const lon = parseFloat(ctx.query.lon) || DEFAULT_LON;
  
  const weather = await getWeatherData(lat, lon);
  if (!weather) {
    ctx.body = 'Nie udało się pobrać danych pogodowych';
    return;
  }
  
  ctx.type = 'html';
  ctx.body = generateWeatherHTML(weather, { lat, lon });
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
