var boardObj

function loadEls() {
    boardObj = new CB(document.getElementById("board"), {
        // fen: "r1b1kb1r/pppp1ppp/5q2/4n3/3KP3/2N3PN/PPP4P/R1BQ1B1R b kq - 0 1"
    })
}