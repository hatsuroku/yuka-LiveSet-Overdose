fetch('https://r2.cnpmjs.org/cors/-/cors-2.8.5.tgz')
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err)
    })