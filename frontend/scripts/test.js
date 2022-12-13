function debounce(func, time) {
    let timeoutID;
    return function() {
        if (timeoutID) {
            clearInterval(timeoutID);
        }
        timeoutID = setTimeout(func, time, ...arguments);
    }
}

function throttle(func, time) {
    let cooling = false;
    return function() {
        if (cooling) return;
        func(...arguments);
        cooling = true;
        setTimeout(() => {
            cooling = false;
        }, time);
    }
}

// const do1 = debounce((ah) => console.log(ah), 1000);
// setTimeout(() => {
//     do1('one');
//     console.log('first');
//     setTimeout(() => {
//         console.log('second');
//         do1('two');
//     }, 500);
// }, 0);

const th2 = throttle((ah) => console.log(ah), 1000);

let i = 0;
function pei() {
    console.log(i);
    th2(`${i++} message`);
    setTimeout(pei, 500);
}

// pei();
console.log(pei.toString());