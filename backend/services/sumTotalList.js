//* Calculate all values from chosen list
module.exports = (listTarget) => {
    const sum = listTarget.reduce((acc, cur) => acc + cur.value, 0)
    //*To show with two decimal cases
    return parseFloat(Math.abs(sum).toFixed(2))
}