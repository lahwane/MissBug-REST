import path from 'path'
import express from 'express'
import { carService } from './services/car.service.js'
import { loggerService } from './services/logger.service.js'
import cookieParser from 'cookie-parser'
const app = express()

//* Express Config:
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())



//* Express Routing:
//* Read
app.get('/api/car', (req, res) => {
    const filterBy = {
        txt: req.query.txt || '',
        minSpeed: +req.query.minSpeed || 0,
        pageIdx: req.query.pageIdx
    }
    carService.query(filterBy)
        .then(cars => res.send(cars))
        .catch(err => {
            loggerService.error('Cannot get cars', err)
            res.status(500).send('Cannot load cars')
        })
})

// Create
app.post('/api/car', (req, res) => {
    const carToSave = req.body

    carService.save(carToSave)
        .then(car => res.send(car))
        .catch(err => {
            loggerService.error('Cannot add car', err)
            res.status(500).send('Cannot add car')
        })
})

// Update
app.put('/api/car/:carId', (req, res) => {
    const carToSave = req.body

    carService.save(carToSave)
        .then(car => res.send(car))
        .catch(err => {
            loggerService.error('Cannot update car', err)
            res.status(500).send('Cannot update car')
        })
})


//* Get/Read by id
app.get('/api/car/:carId', (req, res) => {
    const { carId } = req.params
    carService.getById(carId)
        .then(car => res.send(car))
        .catch(err => {
            loggerService.error('Cannot get car', err)
            res.status(500).send('Cannot load car')
        })
})


//* Remove/Delete
app.delete('/api/car/:carId', (req, res) => {
    const { carId } = req.params
    carService.remove(carId)
        .then(() => res.send('Car Removed'))
        .catch(err => {
            loggerService.error('Cannot remove car', err)
            res.status(500).send('Cannot remove car')
        })
})

app.get('/cookies', (req, res) => {
    let visitedCount = req.cookies.visitedCount || 0
    visitedCount++
    console.log('visitedCount:', visitedCount)
    res.cookie('visitedCount', visitedCount, { maxAge: 5 * 1000 })
    // console.log('visitedCount:', visitedCount)
    res.send('Hello Puki')
})


//!Example
app.get('/api/logs', (req, res) => {
    res.sendFile(process.cwd() + '/logs/backend.log')
})

app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})



const port = 3030
app.listen(port, () =>
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
)
