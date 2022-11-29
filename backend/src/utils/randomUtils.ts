// return [0, max)
export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

// return [lo, hi]
export function getRandomIntRange(lo: number, hi: number) {
    return lo + getRandomInt(hi - lo + 1);
}

export function getRandomElement<T>(arr: T[]) {
    return arr[getRandomInt(arr.length)]
}