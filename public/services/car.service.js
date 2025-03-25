const BASE_URL = '/api/car/'


export const carService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter,
    getFilterFromSearchParams
}

function query(filterBy = {}) {
    return axios.get(BASE_URL, {params: filterBy})
        .then(res => res.data)
        // .then(cars => {
        //     if (filterBy.txt) {
        //         const regExp = new RegExp(filterBy.txt, 'i')
        //         cars = cars.filter(car => regExp.test(car.vendor))
        //     }
        //     if (filterBy.minSpeed) {
        //         cars = cars.filter(car => car.speed >= filterBy.minSpeed)
        //     }
        //     return cars
        // })
}

function get(carId) {
    return axios.get(BASE_URL + carId)
        .then(res => res.data)
}

function remove(carId) {
    return axios.delete(BASE_URL + carId)
        .then(res => res.data)
}


function save(car) {
    const url = BASE_URL

    if (car._id) {
        return axios.put(url + car._id, car)
            .then(res => res.data)
            .catch(err => {
                console.log('err:', err)
                throw err
            })

    } else {
        return axios.post(url, car)
            .then(res => res.data)
            .catch(err => {
                console.log('err:', err)
                throw err
            })

    }
}

function getEmptyCar(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '', pageIdx : undefined }
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const minSpeed = searchParams.get('minSpeed') || ''
    return {
        txt,
        minSpeed
    }
}



