module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('client/pages/home/index.pug', { pageTitle: 'Hey', message: 'Hello there!' })
    })

}