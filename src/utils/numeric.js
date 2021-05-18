export const thousandsSeparators = (num) =>
{
    let numberArray = num.toString().split(".");
    numberArray[0] = numberArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return numberArray.join(".");
}