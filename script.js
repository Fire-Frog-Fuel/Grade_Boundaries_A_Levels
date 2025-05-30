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
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadCSV('CIE.csv', 'CIETable', 'CIE-head', 'CIE-body');
    loadCSV('Edexcel.csv', 'EdexcelTable', 'Edexcel-head', 'Edexcel-body');
    loadCSV('OxfordAqa.csv', 'OxfordAqaTable', 'OxfordAqa-head', 'OxfordAqa-body');
});

