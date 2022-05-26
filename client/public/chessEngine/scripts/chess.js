const keys = {
    letters: ["a", "b", "c", "d", "e", "f", "g", "h"],
    nums: [8, 7, 6, 5, 4, 3, 2, 1],
    wppref: [0,   0,   0,   0,   0,   0,   0,   0,
        78,  83,  86,  73, 102,  82,  85,  90,
        7,  29,  21,  44,  40,  31,  44,   7,
        -17,  16,  -2,  15,  14,   0,  15, -13,
        -26,   3,  10,   9,   6,   1,   0, -23,
        -22,   9,   5, -11, -10,  -2,   3, -19,
        -31,   8,  -7, -37, -36, -14,   3, -31,
        0,   0,   0,   0,   0,   0,   0,   0],
    wnpref: [-66, -53, -75, -75, -10, -55, -58, -70,
        -3,  -6, 100, -36,   4,  62,  -4, -14,
        10,  67,   1,  74,  73,  27,  62,  -2,
        24,  24,  45,  37,  33,  41,  25,  17,
        -1,   5,  31,  21,  22,  35,   2,   0,
       -18,  10,  13,  22,  18,  15,  11, -14,
       -23, -15,   2,   0,   2,   0, -23, -20,
       -74, -23, -26, -24, -19, -35, -22, -69],
    wbpref: [-59, -78, -82, -76, -23,-107, -37, -50,
        -11,  20,  35, -42, -39,  31,   2, -22,
         -9,  39, -32,  41,  52, -10,  28, -14,
         25,  17,  20,  34,  26,  25,  15,  10,
         13,  10,  17,  23,  17,  16,   0,   7,
         14,  25,  24,  15,   8,  25,  20,  15,
         19,  20,  11,   6,   7,   6,  20,  16,
         -7,   2, -15, -12, -14, -15, -10, -10],
    wrpref: [35,  29,  33,   4,  37,  33,  56,  50,
        55,  29,  56,  67,  55,  62,  34,  60,
        19,  35,  28,  33,  45,  27,  25,  15,
         0,   5,  16,  13,  18,  -4,  -9,  -6,
       -28, -35, -16, -21, -13, -29, -46, -30,
       -42, -28, -42, -25, -25, -35, -26, -46,
       -53, -38, -31, -26, -29, -43, -44, -53,
       -30, -24, -18,   5,  -2, -18, -31, -32],
    wqpref: [6,   1,  -8,-104,  69,  24,  88,  26,
        14,  32,  60, -10,  20,  76,  57,  24,
        -2,  43,  32,  60,  72,  63,  43,   2,
         1, -16,  22,  17,  25,  20, -13,  -6,
       -14, -15,  -2,  -5,  -1, -10, -20, -22,
       -30,  -6, -13, -11, -16, -11, -16, -27,
       -36, -18,   0, -19, -15, -15, -21, -38,
       -39, -30, -31, -13, -31, -36, -34, -42],
    wkpref: [4,  54,  47, -99, -99,  60,  83, -62,
        -32,  10,  55,  56,  56,  55,  10,   3,
        -62,  12, -57,  44, -67,  28,  37, -31,
        -55,  50,  11,  -4, -19,  13,   0, -49,
        -55, -43, -52, -28, -51, -47,  -8, -50,
        -47, -42, -43, -79, -64, -32, -29, -32,
         -4,   3, -14, -50, -57, -18,  13,   4,
         17,  30,  -3, -14,   6,  -1,  40,  18],
    bppref: [0,   0,   0,   0,   0,   0,   0,   0,
        78,  83,  86,  73, 102,  82,  85,  90,
        7,  29,  21,  44,  40,  31,  44,   7,
        -17,  16,  -2,  15,  14,   0,  15, -13,
        -26,   3,  10,   9,   6,   1,   0, -23,
        -22,   9,   5, -11, -10,  -2,   3, -19,
        -31,   8,  -7, -37, -36, -14,   3, -31,
        0,   0,   0,   0,   0,   0,   0,   0].reverse().map(e => e === 0 ? e : -e),
    bnpref: [-66, -53, -75, -75, -10, -55, -58, -70,
        -3,  -6, 100, -36,   4,  62,  -4, -14,
        10,  67,   1,  74,  73,  27,  62,  -2,
        24,  24,  45,  37,  33,  41,  25,  17,
        -1,   5,  31,  21,  22,  35,   2,   0,
       -18,  10,  13,  22,  18,  15,  11, -14,
       -23, -15,   2,   0,   2,   0, -23, -20,
       -74, -23, -26, -24, -19, -35, -22, -69].reverse().map(e => e === 0 ? e : -e),
    bbpref: [-59, -78, -82, -76, -23,-107, -37, -50,
        -11,  20,  35, -42, -39,  31,   2, -22,
         -9,  39, -32,  41,  52, -10,  28, -14,
         25,  17,  20,  34,  26,  25,  15,  10,
         13,  10,  17,  23,  17,  16,   0,   7,
         14,  25,  24,  15,   8,  25,  20,  15,
         19,  20,  11,   6,   7,   6,  20,  16,
         -7,   2, -15, -12, -14, -15, -10, -10].reverse().map(e => e === 0 ? e : -e),
    brpref: [35,  29,  33,   4,  37,  33,  56,  50,
        55,  29,  56,  67,  55,  62,  34,  60,
        19,  35,  28,  33,  45,  27,  25,  15,
         0,   5,  16,  13,  18,  -4,  -9,  -6,
       -28, -35, -16, -21, -13, -29, -46, -30,
       -42, -28, -42, -25, -25, -35, -26, -46,
       -53, -38, -31, -26, -29, -43, -44, -53,
       -30, -24, -18,   5,  -2, -18, -31, -32].reverse().map(e => e === 0 ? e : -e),
    bqpref: [6,   1,  -8,-104,  69,  24,  88,  26,
        14,  32,  60, -10,  20,  76,  57,  24,
        -2,  43,  32,  60,  72,  63,  43,   2,
         1, -16,  22,  17,  25,  20, -13,  -6,
       -14, -15,  -2,  -5,  -1, -10, -20, -22,
       -30,  -6, -13, -11, -16, -11, -16, -27,
       -36, -18,   0, -19, -15, -15, -21, -38,
       -39, -30, -31, -13, -31, -36, -34, -42].reverse().map(e => e === 0 ? e : -e),
    bkpref: [4,  54,  47, -99, -99,  60,  83, -62,
        -32,  10,  55,  56,  56,  55,  10,   3,
        -62,  12, -57,  44, -67,  28,  37, -31,
        -55,  50,  11,  -4, -19,  13,   0, -49,
        -55, -43, -52, -28, -51, -47,  -8, -50,
        -47, -42, -43, -79, -64, -32, -29, -32,
         -4,   3, -14, -50, -57, -18,  13,   4,
         17,  30,  -3, -14,   6,  -1,  40,  18].reverse().map(e => e === 0 ? e : -e),
    indices: {
        bk: -60000,
        bq: -929,
        br: -479,
        bb: -320,
        bn: -280,
        bp: -100,
        wp: 100,
        wn: 280,
        wb: 320,
        wr: 479,
        wq: 929,
        wk: 60000
    },
    hash_indices: {
        K: 2,
        Q: 3,
        R: 4,
        B: 5,
        N: 6,
        P: 7,
        p: 8,
        n: 9,
        b: 10,
        r: 11,
        q: 12,
        k: 13
    },
    pawn_promos: [
        "q",
        "n",
        "r",
        "b"
    ]
}

async function delay(ms) {
    return new Promise(res => {setTimeout(res, ms)})
}

class EngineWorker {
    constructor(fen, color=BLACK) {
        this.worker = new Worker("scripts/engineworker.js")
        this.q = []
        this.worker.onmessage = (msg) => {
            this.q.push(msg.data)
        }

        this.loadOpenings().then(openings => {
            let temp = new Chess(fen)
            this.command("init", { fen, color, openings })
            if (temp.turn() === color) this.command("move")
        })
    }
    async loadOpenings() {
        const link = "openings/processed.json"
        return fetch(link).then(data => data.json())
    }
    command(cmd, data) {
        this.worker.postMessage({ cmd, data })
    }
    pop() {
        return this.q.pop()
    }
    clearQ() {
        let temp = this.q
        this.q = []
        return temp
    }
}

class Piece {
    constructor(piece, square, dim=[50, 50]) {
        this.name = piece
        this.square = square
        this.initImage(dim)
    }
    initImage(dim=[50, 50]) {
        if (this.image) this.image.remove()
        let img = new Image(dim[0], dim[1])
        img.src = "images/" + this.name + ".png"
        const getCenter = function(i) {
            let rect = i.getBoundingClientRect()
            return [rect.left + rect.width * .5, rect.top + rect.height * .5]
        }

        const clearSelec = _ => {
            let b = this.square.board.squares
            for (let y = 0; y < b.length; y++) {
                for (let x = 0; x < b[y].length; x++) {
                    b[y][x].overlayState(false, true)
                    b[y][x].move = undefined
                }
            }
        }

        const clamp = (x, y) => {
            let r = this.square.board.container.getBoundingClientRect()
            return [Math.max(r.left, Math.min(r.left + r.width, x)), Math.max(r.top, Math.min(r.top + r.height, y))]
        }
        const clickhndl = (event) => {
            if (this.square.move && event !== "drag") {
                this.square.clickhndle()
                clearSelec()
                return
            }
            clearSelec()
            if (this.square.board.game.turn() !== this.square.board.user || !this.square.board.playing) return
            for (const x of this.square.board.game.moves({square: this.square.san, verbose: true})) {
                const sq = this.square.board.getSquareFEN(x.to)
                if (sq) {
                    sq.overlayState(true, false)
                    sq.setMove(x)
                }
            }
        }
        img.addEventListener("dragstart", event => {
            event.preventDefault()
            img.style.cursor = "grabbing"
            img.classList.add("over")
            clickhndl("drag")
            let [x, y] = getCenter(img)
            const movehndl = event => {
                let [nx, ny] = clamp(event.clientX, event.clientY)
                img.style.left = nx - x + "px"
                img.style.top = ny - y + "px"
            }
            const pointhndl = event => {
                event.preventDefault()
                img.style = ""
                img.classList.remove("over")
                let sq = this.square.board.getSquareXY(event.clientX, event.clientY)
                if (sq && this.square.board.game.turn() === this.square.board.user && this.square.board.playing) {
                    if (sq.move && sq.move.flags.indexOf("p") > -1) {
                        let promoting = sq.move
                        sq.getPromotion(sq.move.color).then(data => {
                            if (data) {
                                promoting.promotion = data
                                this.square.board.move(promoting)
                            }
                        })
                    }
                    else this.square.board.move(sq.move)
                }
                document.removeEventListener("mousemove", movehndl)
                document.removeEventListener("pointerup", pointhndl)
            }
            document.addEventListener("mousemove", movehndl)
            document.addEventListener("pointerup", pointhndl)
        })
        img.addEventListener("click", clickhndl)

        this.image = img
        this.square.container.appendChild(img)
    }
}

class Square {
    constructor(x, y, piece, board) {
        this.container = document.createElement("div");
        (x + y) % 2 === 0 ? this.container.className = "square prim" : this.container.className = "square sec"
        this.selected = false
        this.board = board
        this.san = keys.letters[x] + keys.nums[y]
        this.overlay = document.createElement("div")
        this.overlay.className = "square-over hidden"
        this.clickhndle = () => {
            if (!this.move) return
            if (this.move.flags.indexOf("p") > -1) {
                this.getPromotion(this.move.color).then(data => {
                    if (data) {
                        this.move.promotion = data
                        this.board.move(this.move)
                    }
                    console.log(data)
                })
                return
            }
            this.board.move(this.move)
            this.move = undefined
        }
        this.overlay.addEventListener("click", this.clickhndle)
        this.container.appendChild(this.overlay)

        if (piece) {
            setTimeout(_ => {
                this.piece = new Piece(piece, this)
            }, 300)
        }
    }
    getPromotion(color) {
        return new Promise((res) => {
            this.board.playing = false
            let promotionEl = document.createElement("div")
            promotionEl.className = "promotion-over"
            let first = true
            const deleter = (event) => {
                if (first) {
                    first = false
                    return
                }
                promotionEl.remove()
                window.removeEventListener("click", deleter)
                this.board.playing = true
                res()
            }
            for (const x of keys.pawn_promos) {
                let container = document.createElement("div")
                container.className = "promotion-item"

                let img = new Image(50, 50)
                img.src = "images/" + color + x + ".png"
                img.onclick = () => {
                    promotionEl.remove()
                    window.removeEventListener("click", deleter)
                    this.board.playing = true
                    res(x)
                }

                container.appendChild(img)
                promotionEl.appendChild(container)
            }
            let ex = document.createElement("div")
            ex.className = "x"
            ex.innerHTML = "×"
            ex.onclick = deleter
            promotionEl.appendChild(ex)
            this.container.appendChild(promotionEl)
            window.addEventListener("click", deleter)
        })
    }
    overlayState(state, lastMove) {
        if (!state) {
            this.overlay.classList.add("hidden") 
            if (!lastMove) this.overlay.classList.remove("lastMove")
        }
        else {
            this.overlay.classList.remove("hidden")
            if (lastMove) this.overlay.classList.add("lastMove")
        }
    }
    setPiece(piece) {
        if (this.piece) this.piece.image.remove()

        this.piece = piece ?? null
        if (!piece) return
        if (piece.square) piece.square.setPiece()
        piece.square = this
        if (piece.image) this.container.appendChild(piece.image)
    }
    setMove(mv) {
        this.move = mv
    }
}

class CB {
    constructor(target, opt) {
        this.opt = opt
        this.target = target
        opt = opt ?? {}
        this.game = new Chess(opt.fen)
        this.container = document.createElement("div")
        this.container.classList = "board-cont"
        this.promoting = null
        this.squares = []
        this.lastMove = [null, null]
        this.user = WHITE
        this.engineWorker = new EngineWorker(opt.fen, this.user === WHITE ? BLACK : WHITE)
        this.playing = true
        let b = this.game.board()
        let rendering
        this.msgloop = setInterval(async _ => {
            if (rendering) return
            rendering = true
            let q = this.engineWorker.clearQ()
            for (const x of q) {
                if (x[0] === "move") this.move(x[1])
                if (x[0] === "info") this.setOutput(x[1])
                await delay(5)
            }
            rendering = false
        }, 200)

        for (let y=0; y < 8; y++) {
            let row = document.createElement("div")
            row.classList = "board-row"
            let rw  = []
            for (let x=0; x < 8; x++) {
                let sq = new Square(x, y, b[y][x] ? b[y][x].color + b[y][x].type : null, this)
                row.appendChild(sq.container)
                rw.push(sq)
            }
            this.container.appendChild(row)
            this.squares.push(rw)
        }
        this.target.addEventListener("click", event => {
            if (event.target.tagName !== "IMG")
            for (const el of this.container.querySelectorAll(".square-over")) {
                el.classList.add("hidden")
            }
        })

        let [xaxis, yaxis]= [document.createElement("div"), document.createElement("div")]
        xaxis.className = "xaxis"
        yaxis.className = "yaxis"
        keys.letters.forEach(e => {
            let box = document.createElement("div")
            box.className = "label"
            box.innerHTML = e
            xaxis.appendChild(box)
        })
        keys.nums.forEach(e => {
            let box = document.createElement("div")
            box.className = "label"
            box.innerHTML = e
            yaxis.appendChild(box)
        })
        this.container.appendChild(xaxis)
        this.container.appendChild(yaxis)

        let topbar = document.createElement("div")
        topbar.className = "topbar"
        
        let headcont = document.createElement("div")
        headcont.className = "headcont"

        let mrroboto = new Image(75, 75)
        mrroboto.src = "images/mrroboto.png"
        headcont.appendChild(mrroboto)

        let title = document.createElement("div")
        title.className = "title"
        title.innerHTML = "Mr. Roboto"
        headcont.appendChild(title)
        topbar.appendChild(headcont)

        let outcont = document.createElement("div")
        outcont.className = "outcont"
        this.output = document.createElement("div")
        this.output.className = "output"
        outcont.appendChild(this.output)
        topbar.appendChild(outcont)

        this.container.appendChild(topbar)
        this.target.appendChild(this.container)
    }
    getSquare(x, y) {
        if (x > 7 || y > 7 || y < 0 || x < 0) return
        return this.squares[y][x]
    }
    setOutput(output) {
        this.output.innerHTML = output
    }
    getSquareFEN(str) {
        if (!str || str.length !== 2) return
        return this.getSquare(keys.letters.indexOf(str[0].toLowerCase()), keys.nums.indexOf(parseInt(str[1])))
    }
    getSquareXY(x, y) {
        let rect = this.container.getBoundingClientRect()
        if (x < rect.left || x > rect.left + rect.width || y < rect.top || y > rect.top + rect.height) return
        let [mx, my] = [x - rect.left, y - rect.top]
        return this.getSquare(Math.floor(mx/(rect.width/8)), Math.floor(my/(rect.height/8)))
    }
    move(mv) {
        for (const el of this.container.querySelectorAll(".square-over")) {
            el.classList.add("hidden")
        }
        if (this.game.game_over()) return
        let move = this.game.move(mv)
        if (move) {
            for (const item of this.lastMove) {
                if (item) item.overlayState(false)
            }
            let from = this.getSquareFEN(move.from)
            let to = this.getSquareFEN(move.to)
            from.overlayState(true, true)
            to.overlayState(true, true)

            this.lastMove = [from, to]
            to.setPiece(from.piece)
            if (move.flags.indexOf("p") > -1) {
                to.piece.name = move.color + move.promotion
                to.piece.initImage()
            }
            if (move.flags.indexOf("e") > -1) {
                let [toi, fromi] = [keys.letters.indexOf(move.to[0]), keys.nums.indexOf(parseInt(move.from[1]))]
                this.getSquareFEN(keys.letters[toi] + keys.nums[fromi]).setPiece()
            }
            if (move.flags.indexOf("k") > -1) {
                let index = keys.letters.indexOf(move.to[0])
                let rookfrom = this.getSquareFEN(keys.letters[index + 1] + move.to[1])
                let rookto = this.getSquareFEN(keys.letters[index - 1] + move.to[1])
                rookto.setPiece(rookfrom.piece)
            }
            if (move.flags.indexOf("q") > -1) {
                let index = keys.letters.indexOf(move.to[0])
                let rookfrom = this.getSquareFEN(keys.letters[index - 2] + move.to[1])
                let rookto = this.getSquareFEN(keys.letters[index + 1] + move.to[1])
                rookto.setPiece(rookfrom.piece)
            }
            if (this.game.turn() !== this.user) this.engineWorker.command("move", move)
        }
        return move
    }
}