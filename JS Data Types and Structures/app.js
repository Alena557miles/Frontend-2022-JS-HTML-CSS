// #1
let num = 16;

function extractCurrencyValue(param) {
    let data = parseInt(param);
    param = param.replace(/[a-zа-яё]/gi, '');
    if (data.toString().length>=num){ 
        param = BigInt(param);
    }   
    return param
}

console.log(extractCurrencyValue('120 USD')); // 120
console.log(extractCurrencyValue('1283948234720742 EUR')); // 1283948234720742n


// #2

let object = {
    name: 'Ann',
    age: 16,
    hobbies: undefined,
    degree: null,
    isChild: false,
    isTeen: true,
    isAdult: false
}

function clearObject(obj) { 
    Object.keys(obj).forEach(key => {
        if (!obj[key]){
            delete obj[key];
        }
    });
    return obj;    
}

console.log(clearObject(object)); // { name: 'Ann', age: 16, isTeen: true }


// #3

function getUnique(param) {
    return Symbol(param);
} 

console.log(getUnique('Test')) // Symbol('Test')

// #4
let dayAux = 86400000,
    weekAux= 604800000,
    monthAux=2592000000,
    diffAux = 60000;
function countBetweenTwoDays(startDate, endDate) {
    let offsetStartDate = new Date(startDate).getTimezoneOffset();
    let offsetEndDate = new Date(endDate).getTimezoneOffset();
    let offsetDates = offsetEndDate - offsetStartDate;
    let diffDate = new Date(endDate) - new Date(startDate)- offsetDates*diffAux,
        days = Math.floor(diffDate/dayAux),
        weeks = Math.floor(diffDate/weekAux),
        month = Math.floor(diffDate/monthAux);

    return `The difference between dates is: ${days} day(-s), ${weeks} week(-s),  ${month} month(-s)`;
}
console.log(countBetweenTwoDays('03/22/22', '05/25/22')); // The difference between dates is: 64 day(-s), 9 week(-s), 2 month(-s)

// #5

function filterArrayWithSet(arr){
    const filterArrayBySet = [... new Set(arr)];
    return filterArrayBySet;
}

//console.log(filterArrayWithSet([1, 2, 2, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9])); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

function filterArray(arr) {
    const filterArray = arr.filter((element, index) => {
        return arr.indexOf(element) === index;
    });
      return filterArray;
}
//console.log(filterArray([1, 2, 2, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9])); // [1, 2, 3, 4, 5, 6, 7, 8, 9]



