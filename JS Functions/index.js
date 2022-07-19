// #1

function calculateSum(arr) {
    return arr.reduce((previousValue, currentValue) => previousValue + currentValue,0);
}

console.log(calculateSum([1,2,3,4,5])); //15

// #2
function isTriangle(a, b, c) {
    if (a+b>c && a+c>b && b+c>a && a*b*c>0) {
        return true;
    } else {
        return false;
    }
}

console.log(isTriangle(5,6,7)); //true
console.log(isTriangle(2,9,3)); //false

// #3
function isIsogram(word) {
    return new Set(word.toLowerCase()).size === word.length;
}

console.log(isIsogram('Dermatoglyphics')); //true
console.log(isIsogram('abab')); //false

// #4
function isPalindrome(word) {
    return word.replace(/\s/g, '').split('').reverse().join('') === word.replace(/\s/g, '');
}

console.log(isPalindrome('Dermatoglyphics')); //false
console.log(isPalindrome('abbabba')); //true

// #5
function showFormattedDate(dateObj) {
    const day= dateObj.toLocaleDateString('en-EN', { day:'numeric'}); 
    const month = dateObj.toLocaleDateString('en-EN', { month:'long'}); 
    const year =dateObj.toLocaleDateString('en-EN', { year:'numeric'}); 
    return `${day} of ${month}, ${year}`;
}

console.log(showFormattedDate(new Date('05/12/22'))); //'12 of May, 2022'

// #6
const letterCount = (str, letter) => {
    return str.split(letter).length - 1;
}

console.log(letterCount('abbaba', 'b')); //3


// #7
function countRepetitions(arr) {
    const count = {};
    arr.forEach(element => {
    count[element] = (count[element] || 0) + 1;
    });
   return count;
}

console.log(countRepetitions(['banana', 'apple', 'banana'])); // { banana: 2, apple: 1 }

// #8
function calculateNumber(arr) {
    return parseInt(arr.join(''),2);
}

console.log(calculateNumber([0, 1, 0, 1])); //5
console.log(calculateNumber([1, 0, 0, 1])); //9
