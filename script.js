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
});
