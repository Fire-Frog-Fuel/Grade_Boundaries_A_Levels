function loadCSV(file, tableId, headId, bodyId, chartId = null, labelIndex = 0, dataIndex = 1) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      const parsed = Papa.parse(data, { skipEmptyLines: true });
      const rows = parsed.data;
      const [headers, ...entries] = rows;

      // Clear previous table content
      document.getElementById(headId).innerHTML = '';
      document.getElementById(bodyId).innerHTML = '';

      // Create header
      const thead = document.getElementById(headId);
      headers.forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        thead.appendChild(th);
      });

      // Create rows
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

      // Destroy previous DataTable if exists
      if ($.fn.DataTable.isDataTable(`#${tableId}`)) {
        $(`#${tableId}`).DataTable().clear().destroy();
      }
      $(`#${tableId}`).DataTable({
        responsive: true,
        scrollX: false,
        autoWidth: false
      });

      // Chart (if specified)
      if (chartId && document.getElementById(chartId)) {
        const labels = entries.map(row => row[labelIndex]);
        const dataPoints = entries.map(row => Number(row[dataIndex]));

        const ctx = document.getElementById(chartId).getContext('2d');

        // Destroy old chart
