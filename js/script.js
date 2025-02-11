let dados = JSON.parse(localStorage.getItem("dados")) || [];

function calcularTotal(elemento) {
    let row = elemento.parentElement.parentElement;
    let km = parseFloat(row.cells[2].children[0].value) || 0;
    let valorKm = parseFloat(row.cells[3].children[0].value) || 0;
    let total = (km * valorKm).toFixed(2);
    row.cells[4].innerText = total;
    atualizarDados();
}

function removerLinha(botao) {
    let row = botao.parentElement.parentElement;
    row.remove();
    atualizarDados();
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
    atualizarDados();
}

function atualizarDados() {
    dados = [];
    let tabela = document.getElementById("kmTable").getElementsByTagName('tbody')[0];
    let linhas = tabela.getElementsByTagName('tr');
    
    for (let i = 0; i < linhas.length; i++) {
        let cells = linhas[i].getElementsByTagName('td');
        let info = {
            nome: cells[0].children[0].value,
            data: cells[1].children[0].value,
            km: parseFloat(cells[2].children[0].value) || 0,
            valorKm: parseFloat(cells[3].children[0].value) || 0,
            total: parseFloat(cells[4].innerText) || 0
        };
        dados.push(info);
    }
    localStorage.setItem("dados", JSON.stringify(dados));
}

function carregarDados() {
    let tabela = document.getElementById("kmTable").getElementsByTagName('tbody')[0];
    tabela.innerHTML = "";
    dados.forEach(info => {
        let novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `
            <td><input type="text" value="${info.nome}"></td>
            <td><input type="date" value="${info.data}"></td>
            <td><input type="number" value="${info.km}" oninput="calcularTotal(this)"></td>
            <td><input type="number" value="${info.valorKm}" step="0.1" oninput="calcularTotal(this)"></td>
            <td class="total">${info.total.toFixed(2)}</td>
            <td><button onclick="removerLinha(this)">Remover</button></td>
        `;
    });
}

document.addEventListener("DOMContentLoaded", carregarDados);


function salvarComoPlanilha() {
    let csv = "Nome,Data,Km Rodado,Valor por Km (R$),Total a Pagar (R$)\n";

    dados.forEach(item => {
        csv += `${item.nome},${item.data},${item.km},${item.valorKm},${item.total}\n`;
    });

    let csvFile = new Blob([csv], { type: 'text/csv' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(csvFile);
    link.download = 'reembolso_km.csv';
    link.click();
}
