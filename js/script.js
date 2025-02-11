function calcularTotal(elemento) {
    let row = elemento.parentElement.parentElement;
    let km = parseFloat(row.cells[2].children[0].value) || 0;
    let valorKm = parseFloat(row.cells[3].children[0].value) || 0;
    row.cells[4].innerText = (km * valorKm).toFixed(2);
}

function removerLinha(botao) {
    let row = botao.parentElement.parentElement;
    row.remove();
}

function adicionarLinha() {
    let tabela = document.getElementById("kmTable").getElementsByTagName('tbody')[0];
    let novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
        <td><input type="text" value=""></td>
        <td><input type="date"></td>
        <td><input type="number" value="0" oninput="calcularTotal(this)"></td>
        <td><input type="number" value="1.5" step="0.1" oninput="calcularTotal(this)"></td>
        <td class="total">0.00</td>
        <td><button onclick="removerLinha(this)">Remover</button></td>
    `;
}

function salvarComoPlanilha() {
    let tabela = document.getElementById("kmTable");
    let rows = tabela.getElementsByTagName('tr');
    let csv = [];

    // Adiciona o cabeçalho
    let header = [];
    let headerCells = rows[0].getElementsByTagName('th');
    for (let i = 0; i < headerCells.length; i++) {
        header.push(headerCells[i].innerText);
    }
    csv.push(header.join(','));

    // Adiciona as linhas da tabela
    for (let i = 1; i < rows.length; i++) {
        let row = [];
        let cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < cells.length - 1; j++) {  // Exclui a coluna de ações
            row.push(cells[j].innerText.trim());
        }
        csv.push(row.join(','));
    }

    // Cria um arquivo CSV
    let csvFile = new Blob([csv.join('\n')], { type: 'text/csv' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(csvFile);
    link.download = 'reembolso_km.csv';
    link.click();
}
