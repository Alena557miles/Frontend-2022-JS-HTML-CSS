export const addResult = (results,a,b,roundNumber,announcement) => {
    const div = document.createElement('div');
    div.classList.add('game-score')
    div.innerText = `Round ${roundNumber}, ${a} vs. ${b}, ${announcement}`
    results.after(div)
}