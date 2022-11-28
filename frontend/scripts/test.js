// return [0 .. max)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// return [lo .. hi]
function getRandomIntRange(lo, hi) {
    return lo + getRandomInt(hi - lo + 1);
}

let cnt = Array(61).fill(0)

for (let i = 0; i < 100; ++i) {
    ++cnt[getRandomIntRange(5, 60)]
}

console.log(cnt.slice(5))
console.log(cnt.reduce((acc, now) => acc + now))