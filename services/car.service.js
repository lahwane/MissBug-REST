import { loggerService } from "./logger.service.js"
import { utilService } from "./util.service.js"
import fs from 'fs'
const PAGE_SIZE = 5

const cars = utilService.readJsonFile('data/car.json')

export const carService = {
    query,
    getById,
    remove,
    save
}

function query(filterBy) {
    return Promise.resolve(cars)
        .then(cars => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                cars = cars.filter(car => regExp.test(car.vendor))
            }
            if (filterBy.minSpeed) {
                cars = cars.filter(car => car.speed >= filterBy.minSpeed)
            }
            if (filterBy.pageIdx !== undefined && filterBy.pageIdx !== null && filterBy.pageIdx !== '') {
                const startIdx = filterBy.pageIdx * PAGE_SIZE
                cars = cars.slice(startIdx, startIdx + PAGE_SIZE)
            }

            return cars
        })
}

function getById(carId) {
    const car = cars.find(car => car._id === carId)
    if (!car) return Promise.reject('Cannot find car - ' + carId)
    return Promise.resolve(car)
}


function remove(carId) {
    const carIdx = cars.findIndex(car => car._id === carId)
    if (carIdx === -1) return Promise.reject('Cannot remove car - ' + carId)
    cars.splice(carIdx, 1)
    return _saveCarsToFile()
}


function save(carToSave) {
    if (carToSave._id) {
        const carIdx = cars.findIndex(car => car._id === carToSave._id)
        cars[carIdx].speed = carToSave.speed
        cars[carIdx].vendor = carToSave.vendor
    } else {
        carToSave._id = utilService.makeId()
        cars.unshift(carToSave)
    }

    return _saveCarsToFile().then(() => carToSave)

}





function _saveCarsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(cars, null, 4)
        fs.writeFile('data/car.json', data, (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}