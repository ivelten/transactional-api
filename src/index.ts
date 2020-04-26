import 'reflect-metadata'
import { PORT } from './env'
import { createConnection } from 'typeorm'
import { createApp } from './app'

createConnection()
    .then(() => createApp())
    .then((app) => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
    .catch(error => console.log(error))