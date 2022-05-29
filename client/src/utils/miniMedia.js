function _mediaHolder() {
    let width = window.innerWidth
    let height = window.innerHeight
    const medias = {
        "wide": 2560,
        "desktop": 1440,
        "laptop": 1024,
        "tablet": 768,
        "mobile": 600,
        "mobileL": 525,
        "mobileM": 475,
        "mobileS": 320,
    }
    window.addEventListener("resize", (event) => {
        width = window.innerWidth
        height = window.innerHeight
    })
    function checkWidth(w) {
        if (typeof w !== "number") throw new Error("Not a number!!")
        if (w >= 0) return w >= width
        else return w <= width
    }
    /**
     * Uses passed media sizes to determine if the current screen size is within the defined range, then returns the calculated result
     * @param {*} queries Medias only work with width for now
     */
    function calcMedias(medias, values) {
        if (typeof values !== "object" || typeof medias !== "object") return
        let result

        if (!isNaN(values.length)) {
            let mediaKeys = Object.keys(medias).sort((a, b) => medias[a] - medias[b])
            for (let i = 0; i < values.length; i++) {
                let item = mediaKeys[i]
                if (!item) continue
                if (checkWidth(item)) result = values[i]
            }
        }
        else {
            for (const x of Object.keys(values)) {
                let preset = medias[x]
                if (preset) {
                    if (checkWidth(preset)) result = values[x]
                    continue
                }
                let val = values[x]
                if (typeof x === "string") {
                    if (checkWidth(Number(x.replace(/[^\d]/g, "").trim()))) result = val
                }
                else if (typeof x === "number") {
                    if (checkWidth(x)) result = val
                }
                else throw new Error("Invalid type")
            }
        }
        if (!result) result = values[Object.keys(values)[0]]
        return result
    }
    /**
     * Uses defined media sizes to determine if the current screen size is within the defined range, then returns the calculated result
     * @param {*} objOrVals Default param is width, but you can pass and object with a width and height property
     */
    function useSetMedias(...objOrVals) {
        if (objOrVals.length === 0) return
        if (objOrVals.length === 1 && typeof objOrVals[0] === "object") return calcMedias(medias, objOrVals[0])
        return calcMedias(medias, objOrVals)
    }
    function addMedias(queries) {
        if (typeof queries !== "object") return
        for (let x of queries) {
            medias[x] = queries[x]
        }
    }

    return {
        addMedias,
        useSetMedias,
    }
}

const mediaHolder = _mediaHolder()
export { mediaHolder }

export default mediaHolder