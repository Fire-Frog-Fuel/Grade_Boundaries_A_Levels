function loadCSV(file, tableId, headId, bodyId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const parsed = Papa.parse(data, { skipEmptyLines: true });
            const rows = parsed.data;
            const [headers, ...entries] = rows;

            document.getElementById(headId).innerHTML = '';
            document.getElementById(bodyId).innerHTML = '';

            const thead = document.getElementById(headId);
            headers.forEach(h => {
                const th = document.createElement('th');
                th.textContent = h;
                thead.appendChild(th);
            });

            const tbody = document.getElementById(bodyId);
            entries.forEach(row => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });

            if ($.fn.DataTable.isDataTable(`#${tableId}`)) {
  $(`#${tableId}`).DataTable().clear().destroy();
}
$(`#${tableId}`).DataTable();


            if (chartId) {
                const labels = entries.map(row => row[labelIndex]);
                const dataPoints = entries.map(row => Number(row[dataIndex]));

                const ctx = document.getElementById(chartId).getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: headers[dataIndex],
                            data: dataPoints,
                            backgroundColor: 'rgba(58, 175, 169, 0.5)',
                            borderColor: 'rgba(58, 175, 169, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });
            }
        });
}

/* ===== Theme persistence helpers ===== */
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days*24*60*60*1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
function getCookie(name) {
  return document.cookie.split('; ')
    .find(row => row.startsWith(name + '='))?.split('=')[1];
}

/* Apply the saved theme *before* the first paint */
const savedTheme = getCookie('theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}


document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('CIETable')) {
        loadCSV('CIE.csv', 'CIETable', 'CIE-head', 'CIE-body', 'CIEChart');
    }
    if (document.getElementById('EdexcelTable')) {
        loadCSV('Edexcel.csv', 'EdexcelTable', 'Edexcel-head', 'Edexcel-body','EdexcelChart');
    }
    if (document.getElementById('OxfordAqaTable')) {
        loadCSV('OxfordAqa.csv', 'OxfordAqaTable', 'OxfordAqa-head', 'OxfordAqa-body','OxfordAqaChart');
    }
    const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    // Initialise the checkbox state from the cookie
    toggle.checked = (getCookie('theme') === 'dark');

    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        setCookie('theme', 'dark', 365);   // remember for a year
      } else {
        document.documentElement.removeAttribute('data-theme');
        setCookie('theme', 'light', 365);  // you may prefer deleting it
      }
    });
  }
});

