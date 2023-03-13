//* Calculate percentage from chosen list
module.exports = (basePercentage, sumTotalListTarget) => {
    const result = (sumTotalListTarget * 100) / basePercentage
    //*To show with two decimal cases
    return parseFloat(Math.abs(result).toFixed(2))
}