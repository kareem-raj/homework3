// Copyright (c) by Kareem Rajeh

const LIMIT = 50;
 
document.getElementById('tableForm').addEventListener('submit', function(event) {
    event.preventDefault();
 
    var colStart = parseInt(document.getElementById('minColumn').value);
    var colEnd   = parseInt(document.getElementById('maxColumn').value);
    var rowStart = parseInt(document.getElementById('minRow').value);
    var rowEnd   = parseInt(document.getElementById('maxRow').value);
 
    var errorDiv  = document.getElementById('errorMessage');
    var container = document.getElementById('tableContainer');
    errorDiv.textContent = '';
    container.innerHTML  = '';
 
    // Validates that all fields must be filled
    if ([colStart, colEnd, rowStart, rowEnd].some(isNaN)) {
        errorDiv.textContent = 'Please fill in all four fields with valid numbers.';
        return;
    }
 
    // Validates that stays within -50 to 50
    if ([colStart, colEnd, rowStart, rowEnd].some(v => Math.abs(v) > LIMIT)) {
        errorDiv.textContent = 'All values must be between -50 and 50.';
        return;
    }
 
    // Validates that start must not exceed end
    if (colStart > colEnd || rowStart > rowEnd) {
        errorDiv.textContent = 'Start values must be less than or equal to their End values.';
        return;
    }
 
    container.appendChild(buildTable(colStart, colEnd, rowStart, rowEnd));
});
 
function buildTable(colStart, colEnd, rowStart, rowEnd) {
    var table     = document.createElement('table');
    var headerRow = table.createTHead().insertRow();
 
    // Blank top-left corner
    headerRow.appendChild(document.createElement('th'));
 
    for (var col = colStart; col <= colEnd; col++) {
        var th = document.createElement('th');
        th.textContent = col;
        headerRow.appendChild(th);
    }
 
    var tbody = table.createTBody();
    for (var row = rowStart; row <= rowEnd; row++) {
        var tr    = tbody.insertRow();
        var rowTh = document.createElement('th');
        rowTh.textContent = row;
        tr.appendChild(rowTh);
 
        for (var col = colStart; col <= colEnd; col++) {
            tr.insertCell().textContent = row * col;
        }
    }
 
    return table;
}