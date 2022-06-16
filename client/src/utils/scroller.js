import { Bezier } from "bezier-js"

const bez = new Bezier(0, 0, .42, .0, .58, 1, 1, 1)
function smoothFrom(v1, v2, p) {
    let { y } = bez.compute(p)
    // at 0 return v1, at 1, return v2
    return v1 + (v2 - v1) * y
}

function scroller(el=window) {
    let scrolling = false
    let visited = new Set()
    let disabled = false
    let disableBlock = false
    if (el.scrollX !== 0 && el.scrollY !== 0 && (!el.scrollX || !el.scrollY)) throw Error("Invalid element")
    el.addEventListener("scroll", (event) => {
        if (!scrolling && !disableBlock) {
            event.preventDefault()
        }
    })

    async function animationLoop({ dest: [x, y], time=750 }) {
        let start, previous
        const [startx, starty] = [el.scrollX, el.scrollY]

        const loop = (timestamp, res) => {
            if (!start) start = timestamp

            let elapsed = timestamp - start
            let percent = Math.min(1, elapsed/time)
            if (previous !== timestamp) {
                const [curx, cury] = [smoothFrom(startx, x, percent), smoothFrom(starty, y, percent)]
                el.scrollTo(curx, cury)
            }
            if (elapsed > time || (el.scrollX === x && el.scrollY === y)) return res()
            previous = timestamp

            window.requestAnimationFrame((timestamp) => {
                loop(timestamp, res)
            })
        }

        return new Promise((res) => {
            scrolling = true

            window.requestAnimationFrame((elapsed) => {
                loop(elapsed, res)
            })
        }).then(() => {scrolling=false}).catch((err) => {
            scrolling = false
            console.log(err)
        })
    }

    async function scrollTo(x, y, instant=false) {
        if (scrolling || disabled) return new Promise((res, rej) => res("Scrolling disabled"))
        if (instant) {
            el.scrollTo(x, y)
            return
        }
        return animationLoop({ dest: [x, y] })
    }

    function scrollToEl(to, instant=false) {
        if (!to || disabled) return new Promise((res, rej) => res("Scrolling disabled"))
        visited.add(to)
        const { top, left } = to.getBoundingClientRect()
        const [x, y] = [left + document.documentElement.scrollLeft, top + document.documentElement.scrollTop]
        if (instant) {
            el.scrollTo(x, y)
            return
        }
        return scrollTo(x, y)
    }

    function isScrolling() {
        return scrolling
    }

    function hasScrolledTo(el) {
        return visited.has(el)
    }

    function setDisabled(state) {
        disabled = state
    }

    function isDisabled() {
        return disabled || scrolling
    }

    function setDisableBlock(state) {
        disableBlock = state
    }

    return {
        scrollTo,
        scrollToEl,
        isScrolling,
        hasScrolledTo,
        setDisabled,
        isDisabled,
        setDisableBlock
    }
}

export { scroller, smoothFrom }

export default scroller()