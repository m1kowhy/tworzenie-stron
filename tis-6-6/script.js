let allData = [];
const years = Array.from({length: 12}, (_, i) => 2011 + i);
let barChart, pieChart, lineChart;

// Kolory dla województw
const voivodeshipColors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
  '#FF9F40', '#8AC24A', '#EA5F89', '#00ACC1', '#FF5722',
  '#607D8B', '#9C27B0', '#795548', '#3F51B5', '#009688',
  '#CDDC39'
];

async function loadData() {
  const response = await fetch('data.csv');
  const text = await response.text();
  
  // Parsowanie CSV
  const lines = text.split('\n');
  const headers = lines[0].split(',');
  
  allData = lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, i) => {
      obj[header.trim()] = values[i] ? values[i].trim() : '0';
      return obj;
    }, {});
  });
  
  initSelects();
  createCharts();
}

function initSelects() {
  const yearSelect = document.getElementById('year');
  const voivodeshipSelect = document.getElementById('voivodeship');
  
  // Wypełnij lata
  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });
  
  // Wypełnij województwa (pierwsza kolumna to rok, pomijamy)
  const voivodeships = Object.keys(allData[0]).slice(1);
  voivodeships.forEach(voivodeship => {
    const option = document.createElement('option');
    option.value = voivodeship;
    option.textContent = voivodeship;
    voivodeshipSelect.appendChild(option);
  });
  
  // Ustaw domyślne wartości
  yearSelect.value = '2022';
  voivodeshipSelect.value = voivodeships[0];
}

function createCharts() {
  const barCtx = document.getElementById('barChart').getContext('2d');
  const pieCtx = document.getElementById('pieChart').getContext('2d');
  const lineCtx = document.getElementById('lineChart').getContext('2d');
  
  // Inicjalizacja wykresów
  barChart = new Chart(barCtx, {
    type: 'bar',
    data: { labels: [], datasets: [] },
    options: { responsive: true }
  });
  
  pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: { labels: [], datasets: [] },
    options: { responsive: true }
  });
  
  lineChart = new Chart(lineCtx, {
    type: 'line',
    data: { labels: years, datasets: [] },
    options: { responsive: true }
  });
  
  updateCharts();
}

function updateCharts() {
  const selectedYear = document.getElementById('year').value;
  updateBarChart(selectedYear);
  updatePieChart(selectedYear);
  updateLineChart();
}

function updateBarChart(year) {
  const yearData = allData.find(d => d.Rok === year);
  const voivodeships = Object.keys(yearData).filter(k => k !== 'Rok');
  
  barChart.data.labels = voivodeships;
  barChart.data.datasets = [{
    label: `Długość dróg rowerowych w ${year} (km)`,
    data: voivodeships.map(v => parseFloat(yearData[v])),
    backgroundColor: voivodeshipColors.slice(0, voivodeships.length),
    borderColor: '#333',
    borderWidth: 1
  }];
  barChart.update();
}

function updatePieChart(year) {
  const yearData = allData.find(d => d.Rok === year);
  const voivodeships = Object.keys(yearData).filter(k => k !== 'Rok');
  const total = voivodeships.reduce((sum, v) => sum + parseFloat(yearData[v]), 0);
  
  pieChart.data.labels = voivodeships;
  pieChart.data.datasets = [{
    data: voivodeships.map(v => (parseFloat(yearData[v]) / total * 100).toFixed(2)),
    backgroundColor: voivodeshipColors.slice(0, voivodeships.length),
    borderColor: '#333',
    borderWidth: 1
  }];
  pieChart.update();
}

function updateLineChart() {
  const selectedVoivodeship = document.getElementById('voivodeship').value;
  
  lineChart.data.datasets = [{
    label: `Długość dróg rowerowych w ${selectedVoivodeship} (km)`,
    data: allData.map(d => parseFloat(d[selectedVoivodeship])),
    borderColor: '#36A2EB',
    backgroundColor: 'rgba(54, 162, 235, 0.1)',
    borderWidth: 2,
    fill: true
  }];
  lineChart.update();
}

// Inicjalizacja
document.addEventListener('DOMContentLoaded', loadData);
