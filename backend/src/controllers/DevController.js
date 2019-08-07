module.exports = {
    store(req, res){
        const { nome, idade } = req.body;//desestruturação
        return res.json(nome);
    }
}