window.onload = () => {
    loadEls()
    loadIcons()

    generateMap()
    
    fetch('https://ipapi.co/json/').then(result => {
        return result.json()
    }).catch(err => {
        return DEFAULT
    }).then(data => {
        if (!data) {
            // default IPAPI example
            data = DEFAULT
        }

        [city, region_code, country, latitude, longitude] = [data.city, data.region_code, data.country, data.latitude, data.longitude]

        return data
    }).then(data => {
        search.innerHTML = data.city + ", " + data.region_code
        searchLocation(data.city + ", " + data.region_code)
    })
}
