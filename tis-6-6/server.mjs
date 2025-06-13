import Koa from 'koa';
import Router from 'koa-router';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import csv from 'csv-parser';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = new Koa();
const router = new Router();
const PORT = 8080;

// Middleware CORS
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

// Funkcja pomocnicza do parsowania CSV
function parseCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(join(__dirname, 'data.csv'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

// Endpoint z danymi
router.get('/api/data', async (ctx) => {
  try {
    const data = await parseCSV();
    ctx.body = data;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Blad ladowania danych' };
  }
});

// Strona główna
router.get('/', async (ctx) => {
  ctx.type = 'html';
  ctx.body = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Wizualizacja drog rowerowych</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      .chart-container { width: 80%; height: 400px; margin: 30px auto; }
      .controls { text-align: center; margin: 30px 0; padding: 15px; background: #f5f5f5; }
      select, button { padding: 8px 15px; margin: 0 10px; border-radius: 4px; border: 1px solid #ddd; }
      h1 { text-align: center; color: #333; }
      h2 { color: #444; margin-bottom: 20px; }
    </style>
  </head>
  <body>
    <h1>Drogi rowerowe w Polsce (2011-2022)</h1>
    <div class="controls">
      <label for="year">Rok:</label>
      <select id="year"></select>
      <label for="voivodeship">Wojewodztwo:</label>
      <select id="voivodeship"></select>
    </div>
    <div class="chart-container">
      <h2>Dlugosc drog rowerowych wg wojewodztw</h2>
      <canvas id="barChart"></canvas>
    </div>
    <div class="chart-container">
      <h2>Udzial procentowy wojewodztw</h2>
      <canvas id="pieChart"></canvas>
    </div>
    <div class="chart-container">
      <h2>Zmiany w czasie</h2>
      <canvas id="lineChart"></canvas>
    </div>
    <script>
      const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#8AC24A', '#EA5F89', '#00ACC1', '#FF5722',
        '#607D8B', '#9C27B0', '#795548', '#3F51B5', '#009688'
      ];
      
      let allData = [];
      let years = [];
      let voivodeships = [];
      let barChart, pieChart, lineChart;

      async function loadData() {
        try {
          const response = await fetch('/api/data');
          allData = await response.json();
          years = [...new Set(allData.map(item => item.Rok))].sort();
          voivodeships = Object.keys(allData[0]).filter(key => key !== 'Rok');
          
          initSelects();
          initCharts();
          updateCharts();
        } catch (error) {
          console.error('Blad:', error);
        }
      }

      function initSelects() {
        const yearSelect = document.getElementById('year');
        const voivodeshipSelect = document.getElementById('voivodeship');
        
        years.forEach(year => {
          const option = document.createElement('option');
          option.value = year;
          option.textContent = year;
          yearSelect.appendChild(option);
        });
        
        voivodeships.forEach(voivodeship => {
          const option = document.createElement('option');
          option.value = voivodeship;
          option.textContent = voivodeship;
          voivodeshipSelect.appendChild(option);
        });
        
        yearSelect.value = years[years.length - 1];
        voivodeshipSelect.value = voivodeships[0];
        
        yearSelect.addEventListener('change', updateBarAndPieCharts);
        voivodeshipSelect.addEventListener('change', updateLineChart);
      }

      function initCharts() {
        barChart = new Chart(document.getElementById('barChart'), {
          type: 'bar',
          options: { responsive: true, maintainAspectRatio: false }
        });
        
        pieChart = new Chart(document.getElementById('pieChart'), {
          type: 'pie',
          options: { responsive: true, maintainAspectRatio: false }
        });
        
        lineChart = new Chart(document.getElementById('lineChart'), {
          type: 'line',
          options: { responsive: true, maintainAspectRatio: false }
        });
      }

      function updateBarAndPieCharts() {
        const year = document.getElementById('year').value;
        const yearData = allData.find(d => d.Rok == year);
        
        // Wykres slupkowy
        barChart.data = {
          labels: voivodeships,
          datasets: [{
            label: 'Dlugosc drog (km) w ' + year,
            data: voivodeships.map(v => parseFloat(yearData[v])),
            backgroundColor: colors
          }]
        };
        
        // Wykres kolowy
        const total = voivodeships.reduce((sum, v) => sum + parseFloat(yearData[v]), 0);
        pieChart.data = {
          labels: voivodeships,
          datasets: [{
            data: voivodeships.map(v => (parseFloat(yearData[v]) / total * 100).toFixed(1)),
            backgroundColor: colors
          }]
        };
        
        barChart.update();
        pieChart.update();
      }

      function updateLineChart() {
        const voivodeship = document.getElementById('voivodeship').value;
        
        lineChart.data = {
          labels: years,
          datasets: [{
            label: voivodeship,
            data: allData.map(d => parseFloat(d[voivodeship])),
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            borderWidth: 3,
            fill: true
          }]
        };
        
        lineChart.update();
      }

      document.addEventListener('DOMContentLoaded', loadData);
    </script>
  </body>
  </html>
  `;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log('Serwer dziala na http://localhost:' + PORT);
});
