export const doSearch = (text, page=1) => {
    return new Promise((resolve, reject) => {
        const url = `http://omdbapi.com/?apikey=4919a208&type=movie&s=${text}&page=${page}`
        const options = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            }
        }
        fetch(url, options)
            .then(resp => resp.json())
            .then(resolve)
            .catch(reject)
    })
}

export const doSearchById = id => {
    return new Promise((resolve, reject) => {
        const url = `http://omdbapi.com/?apikey=4919a208&i=${id}`
        const options = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            }
        }
        fetch(url, options)
            .then(resp => resp.json())
            .then(resolve)
            .catch(reject)
    })
}