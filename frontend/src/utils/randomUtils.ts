// return [0, max)
export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// return [lo, hi]
export function getRandomIntRange(lo, hi) {
    return lo + getRandomInt(hi - lo + 1);
}

export function getRandomElement<T>(arr: T[]): T {
    return arr[getRandomInt(arr.length)]
}