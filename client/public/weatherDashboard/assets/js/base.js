var cont, popped, popCont, overlay, displayed, shown, loading, city, region_code, country, latitude, longitude, icons, zoom, map, source, view, vector, overlay, tileLayer, search, searches, mapEl, hist, current, weekly, objs

const iconCodes = ["11d", "11n", "09d", "09n", "10d", "10n", "13d", "13n", "50d", "50n", "01d", "01n", "02d", "02n", "03d", "03n", "04d", "04n"]
const api_key = "286593f8a4744e7b153b7c57a9a68833"
const DEFAULT = {
    "ip": "208.67.222.222",
    "city": "San Francisco",
    "region": "California",
    "region_code": "CA",
    "country": "US",
    "country_name": "United States",
    "continent_code": "NA",
    "in_eu": false,
    "postal": "94107",
    "latitude": 37.7697,
    "longitude": -122.3933,
    "timezone": "America/Los_Angeles",
    "utc_offset": "-0800",
    "country_calling_code": "+1",
    "currency": "USD",
    "languages": "en-US,es-US,haw,fr",
    "asn": "AS36692",
    "org": "OpenDNS, LLC"
}

String.prototype.format = function () {
    var args = arguments
    
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match
    })
}

function loadIcons() {
    icons = {}
    objs = {}
    for (const index in iconCodes) {
        let load = new Image()
        load.src = "https://openweathermap.org/img/wn/{0}@2x.png".format(iconCodes[index])
        icons[iconCodes[index]] = "https://openweathermap.org/img/wn/{0}@2x.png".format(iconCodes[index])
        objs[iconCodes[index]] = load
    }
}

function cleanHTML(html) {
    var input = html
    // 1. remove line breaks / Mso classes
    var stringStripper = /(\|\\r| class=(")?Mso[a-zA-Z]+(")?)/g
    var output = input.replace(stringStripper, '')
    // 2. strip Word generated HTML comments
    var commentSripper = new RegExp('<!--(.*?)-->','g')
    var output = output.replace(commentSripper, '')
    var tagStripper = new RegExp('<(/)*(meta|link|span|\\\\?xml:|st1:|o:|font)(.*?)>','gi')
    // 3. remove tags leave content if any
    output = output.replace(tagStripper, '')
    // 4. Remove everything in between and including tags '<style(.)style(.)>'
    var badTags = ['style', 'script','applet','embed','noframes','noscript']
    
    for (var i=0; i< badTags.length; i++) {
      tagStripper = new RegExp('<'+badTags[i]+'.*?'+badTags[i]+'(.*?)>', 'gi')
      output = output.replace(tagStripper, '')
    }
    // 5. remove attributes ' style="..."'
    var badAttributes = ['style', 'start']
    for (var i=0; i< badAttributes.length; i++) {
      var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"','gi')
      output = output.replace(attributeStripper, '')
    }
    return output
}

function loadEls() {
    search = document.getElementById("search")
    mapEl = document.getElementById("js-map")
    current = document.getElementById("current")
    hist = document.getElementById("search-history")
    weekly = document.getElementById("weekly")
    cont = document.getElementById("popup")
    popCont = document.getElementById("popup-content")

    displayed = new Set()
    shown = new Set()

    search.addEventListener("keypress", event => {
        if (event.key === "Enter" && !loading) {
            searchLocation(search.innerHTML)
            event.preventDefault()
        }
    })

    searches = JSON.parse(localStorage.getItem("searches") ?? "{}")

    for (const key in searches) {
        updateSearchHistory(key, searches[key])
    }
}

function popupInfo(pos, info) {
    if (popped || !info) return
    overlay.setPosition(pos)

    cont.innerHTML = ""
    console.log(info) 
    
    let h1 = document.createElement("h1")
    h1.innerHTML = info.loc.split(",")[0]
    cont.appendChild(h1)

    let p = document.createElement("p")
    p.innerHTML = "Weather: " + info.current.weather[0].main
    cont.appendChild(p)

    p = document.createElement("p")
    p.innerHTML = "Temperature: " + info.current.temp + "°F"
    cont.appendChild(p)

    popped = true
}

function generateMap() {
    view = new ol.View({
        center: ol.proj.fromLonLat([-96.21, 37.46]),
        zoom: 4
    })
    tileLayer = new ol.layer.Tile({
        preload: 4,
        source: new ol.source.OSM()
    })
    source = new ol.source.Vector()
    vector = new ol.layer.Vector({
        source: source,
        updateWhileAnimating: true,
        updateWhileInteracting: true
    })
    overlay = new ol.Overlay({
        element: cont,
        autoPan: {
            animation: {
                duration: 250,
            }
        }
    })

    map = new ol.Map({
        view: view,
        controls : ol.control.defaults({
            attribution : false,
            zoom : false,
        }),
        overlays: [overlay],
        layers: [tileLayer, vector],
        target: 'js-map'
    })

    map.on("pointermove", event => {
        map.getViewport().style.cursor = ''
        popped = false
        overlay.setPosition(undefined)

        map.forEachFeatureAtPixel(map.getEventPixel(event.originalEvent), (feature, layer) => {
            map.getViewport().style.cursor = 'pointer'
            let ext = feature.getGeometry().getExtent()
            let coordinate = ol.extent.getCenter(ext)

            popupInfo(coordinate, feature.get("info"))
        })
    })
    map.on("click", event => {
        map.forEachFeatureAtPixel(map.getEventPixel(event.originalEvent), (feature, layer) => {
            searchLocation(feature.get("info").loc)
        })
    })

    return map
}

function getUV(uv) {
    let color = "green"

    if (uv > 3) color = "yellow"
    if (uv > 5) color = "orange"
    if (uv > 7) color = "red"
    if (uv > 10) color = "violet"

    return "border-radius:10px; color:white; background:{}; display:inline; padding: .2em .5em".replace("{}", color)
}

function displayWeather(data) {
    let current_ = data.current
    let daily = data.daily
    // temp wind humidity, uv
    let children = current.children

    children[0].children[0].innerHTML = data.loc.split(", ")[0]

    children[1].innerHTML = "Weather: " + current_.weather[0].main
    children[2].innerHTML = "Temperature: " + current_.temp + "°F"
    children[3].innerHTML = "Wind speed: " + current_.wind_speed + " m/h"
    children[4].innerHTML = "Humidity: " + current_.humidity
    children[5].innerHTML = "UV Index: <div style='{}'>".replace("{}", getUV(current_.uvi)) + current_.uvi + "</div>"

    weekly.innerHTML = ""

    for (i=1; i < 6; i++) {
        let cur = daily[i]

        let container = document.createElement("div")
        container.classList.add("day")
        container.classList.add("shadow")

        let h = document.createElement("h1")
        h.innerHTML = moment.unix(cur.dt).format("M/D/YYYY")
        h.appendChild(objs[cur.weather[0].icon].cloneNode())
        container.appendChild(h)

        let dv = document.createElement("div")
        dv.style.background = "url(" + icons[cur.weather[0].icon] + ")"
        dv.style.backgroundSize = "auto"
        dv.style.backgroundRepeat = "no-repeat"
        container.appendChild(dv)
        
        for (p=0; p < 3; p++) container.appendChild(document.createElement("p"))

        let res = 0, s = 0
        for (const prop in cur.temp) {
            res += cur.temp[prop]
            s += 1
        }
        container.children[2].innerHTML = "Temp.: " + (res/s).toFixed(2) + "°F"
        container.children[3].innerHTML = "WS: " + cur.wind_speed + " m/h"
        container.children[4].innerHTML = "Hum.: " + cur.humidity

        weekly.appendChild(container)
    }
    children[0].children[0].appendChild(objs[current_.weather[0].icon].cloneNode())
}

function updateSearchHistory(location, data) {
    if (shown.has(location)) return
    searches[location] = data
    localStorage.setItem("searches", JSON.stringify(searches))

    let container = document.createElement("div")
    container.loc = location
    container.classList = "searchHist"
    container.addEventListener("click", event => {
        searchLocation(event.currentTarget.loc)
    })

    let h1 = document.createElement("h1")
    h1.innerHTML = data.loc
    container.appendChild(h1)
    hist.appendChild(container)
    shown.add(location)
}

function searchLocation(location) {
    if (loading) return
    location = location.trim()
    getLocationData(location).then(data => {
        let loc = data.display_name.split(",").slice(0, 3).join(",")
        getLocationData(data.lon, data.lat).then(data => {
            data.loc = loc
            displayWeather(data)
            updateSearchHistory(loc, data)
            if (!displayed.has(loc)) addFeature(data.lon, data.lat, data.current.weather[0].icon, data)
        })
        if (!data) return
        let box = data.boundingbox
        let left = box[2], right = box[3], bottom = box[0], top = box[1]
        goToCoord(data.lon, data.lat, [left, bottom], [right, top])
    })
}

function goToCoord(lon, lat, min, max, onDone = () => {}) {
    if (!map) return

    setInteractions(false)
    loading = true

    setZoomLevel(min, max)

    view.animate({
        center: ol.proj.fromLonLat([lon, lat]),
        zoom: zoom,
        duration: 2000
    }, finished => {
        setInteractions(true)
        loading = false
        onDone()
    })
}

function addFeature(lon, lat, code, info) {
    let feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
    })
    feature.set("info", info)
    let colorStyle = new ol.style.Style({
        image: new ol.style.Icon({
            src: icons[code],
            scale: .5,
            opacity: 1
        })
    })

    feature.setStyle(colorStyle)

    source.addFeature(feature)
    displayed.add(info)
}

function setInteractions(active) {
    map.getInteractions().forEach(function (interaction) {
        interaction.setActive(active)
    }, this)
}

function getLocationData() {
    let url

    if (arguments.length === 2) {
        url = "https://api.openweathermap.org/data/2.5/onecall?lat={0}&lon={1}&exclude=minutely,hourly,alerts&appid={2}&units=imperial".format(arguments[1], arguments[0], api_key)
    }
    else {
        if (arguments[0].length === 5 && parseInt(arguments[0]) !== NaN) {
            arguments[0] = arguments[0] + " USA"
        }
        url = "https://nominatim.openstreetmap.org/search?q={0}&country=USA&format=json".format(arguments[0])
    }
    return fetch(url).then(response => {
        return response.json()
    }).catch(error => {
        console.log("error: ", error)
    }).then(result => {
        if (result instanceof Array) {
            let imp = 0
            let imp_i = 0
            for (const i in result) {
                if (result[i].importance >= imp) {
                    imp = result[i].importance
                    imp_i = i
                }
            }

            return result[imp_i]
        }
        
        return result
    })
}

function setZoomLevel(min, max) {
    let storedExtent = map.getView().calculateExtent(map.getSize())

    let points = [ol.proj.fromLonLat(min), ol.proj.fromLonLat(max), ol.proj.fromLonLat([max[0], min[1]]), ol.proj.fromLonLat([min[0], max[1]])]

    let geo = new ol.geom.Polygon([points], "XY")
    
    map.getView().fit(geo)

    zoom = Math.max(Math.min(map.getView().getZoom(), 14), 4)

    map.getView().fit(storedExtent)
}
