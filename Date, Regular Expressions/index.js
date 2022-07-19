// 1.
function getWeekDay(dateObj){
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(dateObj).getDay()]
}
//console.log(getWeekDay(Date.now())); // "Thursday" (if today is the 22nd October)
//console.log(getWeekDay(new Date(2020, 9, 22))); // "Thursday"


// 2.
function getAmountDaysToNewYear (date){
    let oneDay=86400000;
    let today = new Date(date);
    let NewYear = new Date(today.getFullYear(),0,1);
    NewYear.setFullYear(NewYear.getFullYear()+1);
   return ((NewYear.getTime()-today.getTime())/oneDay).toFixed();
}
//console.log(getAmountDaysToNewYear(Date.now())); 
//console.log(getAmountDaysToNewYear('01/01/2022')); // 365 (if today is the 1st January)
//console.log(getAmountDaysToNewYear('08/30/2022')); // 124 (if today is the 30th August)


// 3.
let oneDay=86400000;
let oneMonth = 2592000000;
let oneYear = 31536000000;
let monthInYear = 12;
let adultYears = 18;

function getApproveToPass (birthday){
    let toDay = new Date('01/01/2022');
    let age = Math.floor((toDay.getTime()-birthday.getTime())/oneYear);
    if (age>=adultYears){
        return `Hello adventurer, you may pass!`
    }
    if (age < adultYears) {
        let differenceMonth = Math.floor((adultYears*oneYear-(toDay.getTime()-birthday.getTime()))/oneMonth);
         if (differenceMonth<monthInYear){
            return `Hello adventurer, you are to young for this quest wait for few more months!`
         } else {
             let differenceYears = (differenceMonth/monthInYear).toFixed();
            return `Hello adventurer, you are to young for this quest wait for ${differenceYears} years more!`
        }
    } 
}

// const birthday17 = new Date(2004,11,29);
// const birthday22 = new Date(2006,9,22);
// const birthday18 = new Date(1999,2,02);
// console.log(getApproveToPass(birthday17)); 
// console.log(getApproveToPass(birthday22)); 
// console.log(getApproveToPass(birthday18));

// 4. 
const elementP = 'tag="p" class="text" style={color: #aeaeae;} value="Aloha!"'
const elementDiv = 'tag="div" class="main" style={width: 50%;} value="Hello World!"'
function transformStringToHtml(el) {  
    const [tagName] = el.match(new RegExp('(?<=tag=")[^"]+(?=")', 'g'));  
    const [tagValue] = el.match(new RegExp('(?<=value=")[^"]+(?=")', 'g'));  
    const tagAttributes = el.replace(/(tag=".*?")/g, '').replace(/({|})/g, '"').replace(/(value=".*?")/g, '');  
    return `<${tagName} ${tagAttributes}>${tagValue}</${tagName}>`;  
}  
console.log(transformStringToHtml(elementP));
// ‘<p class=”text” style=”color: #aeaeae;”>Hello World!</p>’

// 5. 
function isValidIdentifier(str){
    let regexp = /^\D[A-Za-z0-9$_]{1,}$/gm;
    return regexp.test(str)
}
console.log(isValidIdentifier('myVar!')); // false
console.log(isValidIdentifier('myVar$')); // true
console.log(isValidIdentifier('myVar_1')); // true
console.log(isValidIdentifier('1_myVar')); // false

//6.
const testStr = 'My name is John Smith. I am 27.'; 
function capitalize(text) {
    return text.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}
//console.log(capitalize(testStr)); // "My Name Is John Smith. I Am 27."

//7. 
function isValidPassword(str){
    return (/(?=.*\d)(?=.*[a-z])(?=[A-Z]){8,}/).test(str)
}

// console.log(isValidPassword('agent007')); // false (no uppercase letter) 
// console.log(isValidPassword('AGENT007')); // false (no lowercase letter) 
// console.log(isValidPassword('AgentOOO')); // false (no numbers) 
// console.log(isValidPassword('Age_007')); // false (too short) 
// console.log(isValidPassword('Agent007')); // true

// 8.
function bubbleSort(arr){
    for (let j = 0;j<arr.length ;j++){
        for (let i = 0; i<arr.length; i++){
            if (arr[i] > arr[i+1]) {
                let temporary = arr[i];
                arr[i] = arr[i+1];
                arr[i+1]=temporary;
            }
        }
    }
    return arr
}
//console.log(bubbleSort([7,5,2,4,3,9])); //[2, 3, 4, 5, 7, 9]

// 9. 
const inventory = [
{ name: 'milk', brand: 'happyCow', price: 2.1 },
{ name: 'chocolate', brand: 'milka', price: 3 }, 
{ name: 'beer', brand: 'hineken', price: 2.2 }, 
{ name: 'soda', brand: 'coca-cola', price: 1 }
];

function sortByItem(obj){
    if (typeof obj.array[0][obj.item] === 'string') {
        return obj.array.sort((a,b) => a[obj.item].localeCompare(b[obj.item]))
    }
    if (typeof obj.array[0][obj.item] === 'number') {
      return obj.array.sort((a, b) => parseFloat(a[obj.item]) - parseFloat(b[obj.item]));
    }
}
console.log(sortByItem({item: 'name', array: inventory})); 
// will return [
// { "name": "beer", "brand": "hineken", "price": 2.2 },
// { "name": "chocolate", "brand": "milka", "price": 3 },
// { "name": "milk", "brand": "happyCow", "price": 2.1 },
// { "name": "soda", "brand": "coca-cola", "price": 1 } ]
