export const randomSelection = (SELECTIONS) => {
    const indexSelection = Math.floor(Math.random()* SELECTIONS.length)
    return SELECTIONS[indexSelection]
}
