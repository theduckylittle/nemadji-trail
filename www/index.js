const ENTRY_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTBU2KKCXKgh-8QwfWtzMreIvEKcHrqegLhBVoLHu2NLPnJKLwReHwblZxHno7zyKTZGDXowiuilAC4/pub?gid=0&single=true&output=csv';

function fetchEntryList() {
  fetch(ENTRY_CSV)
    .then(r => r.text())
    .then((csvText) => {
      const csv = Papa.parse(csvText);

      const header = csv.data[0];
      const header_row = document.getElementById('entry-header');
      const tbody = document.getElementById('entry-body');

      const width = csv.data[0].length;

      for (let h = 0; h < width; h++) {
        const th = document.createElement('th');
        header_row.appendChild(th);
        th.appendChild(document.createTextNode(csv.data[0][h]));
      }

      for (let i = 1, ii = csv.data.length; i < ii; i++) {
        const row = document.createElement('tr');
        row.className = i % 2 == 0 ? 'even' : 'odd';
        tbody.appendChild(row);

        for (let x = 0; x < width; x++) {
          const cell = document.createElement('td');
          row.appendChild(cell);
          cell.appendChild(document.createTextNode(csv.data[i][x]));
        }
      }
    });
}

fetchEntryList();
