const form = document.getElementById('climateForm');
const table = document.getElementById('recordsTable');
const searchInput = document.getElementById('searchCity');
async function loadRecords() {

  const response = await fetch('/api/climate');
  const records = await response.json();
  const search =
  searchInput.value.toLowerCase();

const filteredRecords =
  records.filter(record =>
    record.city
      .toLowerCase()
      .includes(search)
  );

  const alertsContainer =
  document.getElementById('alerts');

alertsContainer.innerHTML = '';

records.forEach(record => {

  if (record.temperature > 35) {
    alertsContainer.innerHTML += `
      <div class="alert danger">
        🔥 Alerta de calor extremo en ${record.city}
      </div>
    `;
  }

  if (record.temperature < 5) {
    alertsContainer.innerHTML += `
      <div class="alert cold">
        ❄️ Alerta de frío extremo en ${record.city}
      </div>
    `;
  }

  if (record.humidity > 90) {
    alertsContainer.innerHTML += `
      <div class="alert humidity">
        💧 Humedad muy alta en ${record.city}
      </div>
    `;
  }

});

  table.innerHTML = '';

  let totalTemp = 0;
  let totalHumidity = 0;

  filteredRecords.forEach(record => {

    totalTemp += record.temperature;
    totalHumidity += record.humidity;

    table.innerHTML += `
      <tr>
        <td>${record.city}</td>
        <td>${record.temperature}°C</td>
        <td>${record.humidity}%</td>
        <td>${record.pressure} hPa</td>

        <td>

          <button onclick="editRecord('${record.id}')">
            Editar
          </button>

          <button onclick="deleteRecord('${record.id}')">
            Eliminar
          </button>

        </td>
      </tr>
    `;
  });

  document.getElementById('totalRecords').textContent =
    records.length;

  document.getElementById('avgTemp').textContent =
    records.length
      ? (totalTemp / records.length).toFixed(1) + '°C'
      : '0°C';

  document.getElementById('avgHumidity').textContent =
    records.length
      ? (totalHumidity / records.length).toFixed(1) + '%'
      : '0%';

  window.currentRecords = records;
}

form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const id = document.getElementById('recordId').value;

  const data = {
    city: document.getElementById('city').value,
    temperature: Number(
      document.getElementById('temperature').value
    ),
    humidity: Number(
      document.getElementById('humidity').value
    ),
    pressure: Number(
      document.getElementById('pressure').value
    ),
    date: new Date().toISOString()
  };

  if (id) {

    await fetch(`/api/climate/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

  } else {

    await fetch('/api/climate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

  }

  form.reset();

  document.getElementById('recordId').value = '';

  loadRecords();
});

async function deleteRecord(id) {

  await fetch(`/api/climate/${id}`, {
    method: 'DELETE'
  });

  loadRecords();
}

function editRecord(id) {

  const record = window.currentRecords.find(
    r => r.id === id
  );

  if (!record) return;

  document.getElementById('recordId').value =
    record.id;

  document.getElementById('city').value =
    record.city;

  document.getElementById('temperature').value =
    record.temperature;

  document.getElementById('humidity').value =
    record.humidity;

  document.getElementById('pressure').value =
    record.pressure;
}

searchInput.addEventListener(
  'input',
  loadRecords
);

loadRecords();
