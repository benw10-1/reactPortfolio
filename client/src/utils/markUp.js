const punc = new RegExp("(?!<[^<>]*)[.,/#!$%\\^&*;:{}?=\\-_`~()\"'“”]+(?![^<>]*>)", "g")

function markUp(text, strong=[]) {
    text = text.replace(punc, (match) => {
        return "<span class='punc'>" + match.trim() + "</span>"
    })
    for (const x of strong) {
        if (!x) continue
        let reg = new RegExp("(?!<[^<>]+)" + x + "(?![^<>]+>)", "g")
        let matches = text.match(reg)
        if (!matches) continue
        text = text.replace(reg, "<strong>$&</strong>")
    }

    return { __html: text }
}

export default markUp