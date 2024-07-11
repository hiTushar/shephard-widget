const THOUSAND = 1000;
const MILLION = 1000000;
const BILLION = 1000000000;

const commaFormatter: string = (num: string) => {
    return ''
}

const inRadians: number = (degrees: number) => degrees * Math.PI / 180;

const kbmFormatter: String = (num: number) => {
    if(num >= BILLION) return `${(num / BILLION).toFixed(2)}B`;
    else if(num >= MILLION) return `${(num / MILLION).toFixed(2)}M`;
    else if(num >= THOUSAND) return `${(num / THOUSAND).toFixed(2)}K`;
    else return `${num}`;
}

const jumbleArray: Array<any> = (arr: Array<any>) => {
    let jumbled = [];
    while(arr.length) {
        let idx = Math.floor(Math.random() * arr.length);
        jumbled.push(arr.splice(idx, 1)[0]);
    }
    return jumbled;
}

export { commaFormatter, inRadians, kbmFormatter, jumbleArray }