const THOUSAND = 1000;
const MILLION = 1000000;
const BILLION = 1000000000;

const commaFormatter = (num: string): string => {
    return num;
}

const inRadians = (degrees: number): number => degrees * Math.PI / 180;

const kbmFormatter = (num: number): string => {
    if (num >= BILLION) return `${(num / BILLION).toFixed(1)}B`;
    else if (num >= MILLION) return `${(num / MILLION).toFixed(1)}M`;
    else if (num >= THOUSAND) return `${(num / THOUSAND).toFixed(1)}K`;
    else return `${num}`;
}

const jumbleArray = (arr: Array<any>): Array<any> => {
    let jumbled = [];
    while (arr.length) {
        let idx = Math.floor(Math.random() * arr.length);
        jumbled.push(arr.splice(idx, 1)[0]);
    }
    return jumbled;
}

const throttle = (func: Function, throttleTime: number) => {
    // first call is executed immediately, subsequent calls are ignored till the throttle time expires
    let throttle = false;
    return () => {
        if (!throttle) {
            throttle = true;
            func();
            setTimeout(() => {
                throttle = false;
            }, throttleTime);
        }
    }
}

const debounce = (func: Function, debounceTime: number) => {
    // in successive calls, only the last call is executed and that too after the debounce time
    let timerId = 0;
    return () => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func();
        }, debounceTime);
    }
}

export { commaFormatter, inRadians, kbmFormatter, jumbleArray, throttle, debounce }