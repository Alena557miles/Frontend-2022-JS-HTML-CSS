// Your code goes here
'use strict';



let space = true;
let space2 = true;
let arr = [];

while (space) {
    let firstNum = prompt('Enter first number','');
    if (firstNum.length ===0 || isNaN(firstNum)){
    alert('Invalid input data');
         } else {
            space = false;
            firstNum = parseInt(firstNum);
            while (space2){
                let secondNum = prompt('Enter second number','');
                if (secondNum.length ===0 || isNaN(secondNum)){
                    alert('Invalid input data')    
                } else {
                    space2 = false;
                    secondNum = parseInt(secondNum);
                    if (firstNum > secondNum){
                                alert('Invalid input data');
                            } else if (firstNum===secondNum || firstNum+1===secondNum){
                                alert(`There are no numbers between ${firstNum} & ${secondNum}`);
                            } else {
                                let y = 0;
                                for (let i = firstNum+1; i < secondNum; i++){
                                    arr[y] = i;
                                    y++;
                                    
                                }
                    alert(`First number: ${firstNum}\nSecond number: ${secondNum}\n\nNumbers between: ${arr.join(' ')}`)
                            }
                    }
    }
}
}
