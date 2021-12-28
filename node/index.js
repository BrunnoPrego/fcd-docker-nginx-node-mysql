const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nnmdb'
};

const mysql = require('mysql')

function verificaRegistros(config, req, res) {
    var connection = mysql.createConnection(config)
    var query1 = `SELECT count(id) as qt from nnmdb.people`
    connection.query(query1, function(err, resposta) {
        if (!err) {
            console.log('execução de query1 não apresentou erros, resposta=')
            console.log(resposta)
            console.log(resposta[0].qt)
            if (resposta[0].qt == 0) {
                incluirRegistro(config, req, res)
            }
            consultaRegistros(config, req, res)
        } else {
            res.send('Erro verificando existência de registros ' + err.toString())
        }
    })
    connection.end()
}
function incluirRegistro(config, req, res) {
    var connection = mysql.createConnection(config)
    var query2 = `INSERT INTO people(name) values('Brunno')`
    connection.query(query2, function(err, resposta) {
        if (!err) {
            console.log('resposta query2 sem erro, resposta: ')
            console.log(resposta)
        } else {
            res.send('Erro incluindo registro' + err.toString())
        }
    })
    connection.end()
}

function consultaRegistros(config, req, res) {
    var connection = mysql.createConnection(config)
    var query3 = `SELECT id, name from nnmdb.people`
    connection.query(query3, function(err, rows){
        if (!err){
            console.log('execução de query3 não apresentou erros, rows=')
            console.log(rows);
            linhas='<table><tr><th>id</th><th>name</th></tr>'
            rows.forEach(row => {
                linhas+='<tr><td>'+row.id+'</td><td>'+row.name+'</td><tr>'
            });
            linhas+='</table>'
            console.log(linhas);
            res.send('<h1>Full Cycle Rocks!</h1>' + linhas)
        } else {
            console.log('execução de query3 com erros: '+err.toString())
            res.send('execução de query3 com erros: '+err.toString())
        }
    })
}

app.get('/', (req,res) => {
    console.log('entrou no app.get')
    verificaRegistros(config, req, res)
});

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})