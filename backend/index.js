import express from 'express'
import App from './src/services/ExpressApp.js'

const StartServer = async () => {
    const app = express();
    const PORT = 3000

    await App(app);

    app.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}`)
    })
}

StartServer()