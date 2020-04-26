import 'reflect-metadata'
import { PORT } from './env'
import { createConnection } from 'typeorm'
import { createApp } from './app'
import { getConnectionOptions } from 'typeorm-seeding'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

getConnectionOptions()
    .then(options => Object.assign(options, { namingStrategy: new SnakeNamingStrategy() }))
    .then(options => createConnection(options))
    .then(() => createApp())
    .then((app) => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
    .catch(error => console.log(error))