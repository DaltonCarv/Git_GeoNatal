const mongodb = require('mongodb').MongoClient
const url = "mongodb+srv://engdaltoncarvalho:Jesusbanco1997@cluster0.ptpqih7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongodb.connect(url, (erro, db)=>{
    if(erro)throw erro
    const dbo = banco.db("cfbcursos")
    const obj = {curso: "Curso de Node", canal:"CFB Cursos"}
    const colecao = "Cursos"
    dbo.collection(colecao).insertOne(obj , (erro, resultado)=>{
        if(erro)throw erro
        console.log("novo curso inserido")
        banco.close()
    })
})