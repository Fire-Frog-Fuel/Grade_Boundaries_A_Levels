function loadCSV(file, tableId, headId, bodyId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n').map(row => row.split(','));
            const [headers, ...entries] = rows;

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
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadCSV('CIE.csv', 'CIETable', 'CIE-head', 'CIE-body');
    loadCSV('Edexcel.csv', 'EdexcelTable', 'Edexcel-head', 'Edexcel-body');
    loadCSV('OxfordAqa.csv', 'OxfordAqaTable', 'OxfordAqa-head', 'OxfordAqa-body');
});

