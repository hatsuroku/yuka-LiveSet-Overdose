// return [0, max)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// return [lo, hi]
function getRandomIntRange(lo, hi) {
    return lo + getRandomInt(hi - lo + 1);
}

function getRandomElement(arr) {
    return arr[getRandomInt(arr.length)]
}


module.exports = {
    getRandomInt,
    getRandomIntRange,
    getRandomElement
}