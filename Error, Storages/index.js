const clickBtn= document.getElementById('click');
const start = document.getElementById('start');
const bestRes = document.getElementById('bestResult');
const bestResAll = document.getElementById('bestResultAll');
const clear = document.getElementById('clearBestResult');
const clearAll = document.getElementById('clearBestResultAll');
let bestResultAll = 0;
let bestResultCur = 0;
let count = 0;
let timer = 5000;
function clickFunction(){
    ++count;
}
function countClickOnTime(){
    clickBtn.addEventListener('click',clickFunction);
    setTimeout(function(){
        clickBtn.addEventListener('click', clickFunction);
        alert(`You clicked ${count} times.`);
        if (count > JSON.parse(sessionStorage.getItem('currentResult'))) {
            bestResultCur = count;
            sessionStorage.setItem('currentResult', JSON.stringify(count)); 
        }
        if (count > JSON.parse(localStorage.getItem('bestResult'))){
            bestResultAll = count;
            localStorage.setItem('bestResult',JSON.stringify(count));
            localStorage.setItem('winner',document.getElementById('nickname').value.trim())
        } 
        clickBtn.removeEventListener('click',clickFunction);
    },timer);
}
function isEmpty(el){
    try {
       if (el === '') {
           throw 'Empty nickname'
        }
    } catch (err){
        alert(err);
    }
}
start.addEventListener('click',() => {
    const nickname = document.getElementById('nickname').value.trim();
    console.log(nickname)
    if (nickname !== ''){
            countClickOnTime();
            } else {
               isEmpty(nickname);
            }      
    count = 0;
});
bestRes.addEventListener('click', () => {
    alert(`Best result is ${JSON.parse(sessionStorage.getItem('currentResult'))} `)
});
bestResAll.addEventListener('click',() => {
    alert(`Best result for the whole time is: ${JSON.parse(localStorage.getItem('bestResult'))} `+
    `by ${localStorage.getItem('winner')}`);
});
clear.addEventListener('click',() => {
    sessionStorage.setItem('currentResult', 0);
    bestResultCur = 0;
    alert(`Best result is cleared`)
});
clearAll.addEventListener('click',() => {
    localStorage.setItem('bestResult',0);
    bestResultAll = 0;
    localStorage.setItem('winner',null);
    alert(`Best result for whole time is cleared`)
});


