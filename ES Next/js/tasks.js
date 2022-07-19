 /* eslint-disable no-magic-numbers */ 
// 1
const arr = ['1','3', '4', '2', '5', '8', '-4'];
function getMaxElement(array){
    return Math.max(...array.filter(num => num % 2 === 0))
}
console.log(getMaxElement(arr))

//2
let a = 3;
let b = 5;

[a, b] = [b, a]

console.log(a);
console.log(b);

//3
function getValue(item){
    return item ?? '-'
}
console.log(getValue(0));
console.log(getValue(4));
console.log(getValue('someText'));
console.log(getValue(null));
console.log(getValue(undefined));

//4
const arrayOfArrays = [
    ['name', 'dan'],
    ['age', '21'],
    ['city','Lviv']
];
function getObjFromArray(arr1){
    return Object.fromEntries(arr1)
}
console.log(getObjFromArray(arrayOfArrays));

//5
const obj1 = { name: 'nick'};
function addUniquedId(arg){
    return {...arg, id: Symbol()}
}
console.log(addUniquedId(obj1));
console.log(addUniquedId({name: 'buffy' }));
console.log(Object.keys(obj1).includes('id'));


//6
const oldObj = {
    name: 'willow',
    details: {id:1, age:47, university: 'LNU'}
};
function getRegroupObject(oldObj){
    const {university = 'LNU', name: firstName, details : user} = oldObj;
    const {age, id } = user;
    return {
        university,
        user: {age,firstName, id}
    }
}
console.log(getRegroupObject(oldObj));

//7
const array = [2, 3, 4, 2, 4, 'a', 'c', 'a'];
function getArrayWithUniqueElements(array){
    return [...new Set(array)]
}
console.log(getArrayWithUniqueElements(array))

//8 
const phoneNumber = '0123456789'
function hideNumber(item){
    return item.slice(6,10).padStart(10,'*')
}
console.log(hideNumber(phoneNumber))

//9
function add(a,b){
    if(a === undefined){
        throw Error('a is a required');
    }
    if(b === undefined){
        throw Error('b is a required');
    }
    return a+b
}
console.log(add(2,3));
//console.log(add(2));

//10
function* generateIterableSequence() {
    yield 'I';
    yield 'love';
    yield 'EPAM';
  }
const generatorObject = generateIterableSequence()
for (let value of generatorObject) {
    console.log(value);
}