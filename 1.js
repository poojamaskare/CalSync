window.onload = () => {
  createDayCells();
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRHGA8LjFbLa_AKE4IxBKsGwJdOpz1C4dmG9_WQmKbR5nbpxmJqz7CUwHFFiKSm75rNsfWR0K6YKUJW/pubhtml',
    simpleSheet: true
  }).then(data => populateCalendar(data))
    .catch(err => console.error('Error loading sheet:', err));
};

function createDayCells() {
  const calendar = document.getElementById('calendar');
  for (let day = 1; day <= 31; day++) {
    const cell = document.createElement('div');
    cell.className = `calendar-cell calendar-day-${day}`;
    cell.innerHTML = `<strong>${day}</strong><div class="events"></div>`;
    calendar.appendChild(cell);
  }
}

function populateCalendar(rows) {
  rows.forEach(entry => {
    const day = parseInt(entry.DAY);
    if (!day || day < 1 || day > 31) return;

    const targetCell = document.querySelector(`.calendar-day-${day} .events`);
    if (!targetCell) return;

    const block = document.createElement('div');
    block.className = 'event-block';
    block.innerHTML = `
      <b>${entry.TYPE}</b> — ${entry.NAME}<br>
      <i>${entry.BATCH}</i><br>
      ${entry.STARTS} to ${entry.ENDS}<br>
      Room: ${entry.ROOM}
    `;
    targetCell.appendChild(block);
  });
}
