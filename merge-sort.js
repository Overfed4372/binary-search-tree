export default function mergeSort (list) {
    if (list.length <= 1) {
        return list;
    }
    const breakPoint = list.length/2;
    let leftSide = list.slice(0, breakPoint);
    let rightSide = list.slice(breakPoint);
    leftSide = mergeSort(leftSide);
    rightSide = mergeSort(rightSide);
    return merge(leftSide, rightSide);
    
    function merge(leftArr, rightArr) {
        let mergedArr = [];
        while (leftArr.length > 0 && rightArr.length > 0) {
            if (rightArr.at(0)< leftArr.at(0)) {
                mergedArr.push(rightArr.at(0));
                rightArr.shift();
            //remove duplicate values
            } else if (rightArr.at(0) === leftArr.at(0)) {
                mergedArr.push(rightArr.at(0));
                rightArr.shift();
                leftArr.shift();
            //
            } else {
                mergedArr.push(leftArr.at(0));
                leftArr.shift();
            }
        }
        if (leftArr.length === 0) {
            mergedArr = mergedArr.concat(rightArr);
        } else if (rightArr.length === 0) {
            mergedArr = mergedArr.concat(leftArr);
        }
        return mergedArr;
    }
}
// console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1, -1]));
// console.log(mergeSort([105, 79, 100, 110, 105, 79, 100, -1, -2, -2, -34]));
// [-34,  -2,  -1, 79, 100, 105, 110]
// console.log(mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));