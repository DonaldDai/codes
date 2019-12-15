let data = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i ++) {
        for (let j = 0; j < arr.length - i - 1; j ++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
    return arr
}

function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i ++) {
        let smallest = arr[i];
        let smallestIndex = i;
        for (let j = i; j < arr.length - 1; j ++) {
            if (arr[j+1] < smallest) {
                smallest = arr[j+1];
                smallestIndex = j+1;
            }
        }
        [arr[i], arr[smallestIndex]] = [arr[smallestIndex], arr[i]];
    }
    return arr;
}

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i ++) {
        let candidate = arr[i];
        for (let j = 0; j < i; j ++) {
            if (candidate < arr[j]) {
                arr.splice(i, 1);
                arr.splice(j, 0, candidate);
                break;
            }
        }
    }
    return arr;
}

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const left = [];
    const right = [];
    const motherLength = arr.length;
    let pivotIndex = 0;
    if (motherLength % 2 === 0) {
        pivotIndex = motherLength >> 1;
    } else {
        pivotIndex = (motherLength + 1) >> 1;
    }
    const pivot = arr[pivotIndex];
    arr.splice(pivotIndex, 1);
    for (let i = 0; i < arr.length; i ++) {
        if (arr[i] >= pivot) {
            right.push(arr[i]);
        } else {
            left.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}

function shellSort(arr) {
    for (let step = Math.floor(arr.length >> 1); step >= 1; step = Math.floor(step >> 1)) {
        for (let startIndex = 0; startIndex < step; startIndex ++) {
            const candidateIndexes = [];
            let candidateArr = [];
            for (let j = 0; j < arr.length; j = j + step) {
                candidateIndexes.push(j);
                candidateArr.push(arr[j])
            }
            candidateArr = insertionSort(candidateArr);
            candidateIndexes.forEach((originIndex, i) => { arr[originIndex] = candidateArr[i]; });
        }
    }
    return arr
}

function mergeSort(arr) {
    for (let step = 2; step < (arr.length << 2); step = step << 2) {
        for (let startIndex = 0; startIndex < arr.length; startIndex += step) {
            let candidateArr = arr.slice(startIndex, startIndex + step);
            candidateArr.sort((a, b) => a - b);
            candidateArr.forEach((ele, i) => { arr[startIndex+i] = ele; });
        }
    }
    return arr;
}

function heapSort(arr) {
    function elect(data) {
        if (data.length <= 1) return data;
        for (let i = Math.floor(data.length >> 1) - 1; i >= 0; i --) {
            if ((data[(2 * i) + 2] !== undefined) && (data[i] < data[(2 * i) + 2])) {
                [data[i], data[(2 * i) + 2]] = [data[(2 * i) + 2], data[i]];
            }
            if (data[i] < data[(2 * i) + 1]) {
                [data[i], data[(2 * i) + 1]] = [data[(2 * i) + 1], data[i]];
            }
        }
    }

    function justify(data) {
        if (data.length <= 1) return data;
        for (let i = 0; i < Math.floor(data.length >> 1); i ++) {
            // 同上
            if ((data[(2 * i) + 2] !== undefined) && (data[i] < data[(2 * i) + 2])) {
                [data[i], data[(2 * i) + 2]] = [data[(2 * i) + 2], data[i]];
            }
            if (data[i] < data[(2 * i) + 1]) {
                [data[i], data[(2 * i) + 1]] = [data[(2 * i) + 1], data[i]];
            }
        }
    }

    let sortedArr = [];
    const initLength = arr.length
    for (let i = 0; i < initLength; i ++) {
        elect(arr);
        justify(arr);
        [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
        sortedArr.unshift(arr.pop());
    }

    return sortedArr;
}

function countingSort(arr) {
    const NumStats = {};
    for (let i = 0; i < arr.length; i ++) {
        const num = arr[i];
        if (NumStats[num] === undefined) {
            NumStats[num] = 1;
        } else {
            NumStats[num] += 1;
        }
    }

    let sortedArr = [];
    Object.keys(NumStats).sort((a, b) => Number(a) - Number(b)).forEach((num) => {
        for (let i = 1; i <= NumStats[num]; i ++) {
            sortedArr.push(Number(num));
        }
    });

    return sortedArr;
}

function bucketSort(arr) {
    const NumStats = {};
    for (let i = 0; i < arr.length; i ++) {
        const bucketName = Math.floor(arr[i] / 10);
        const num = arr[i];
        if (NumStats[bucketName] === undefined) {
            NumStats[bucketName] = [num];
        } else {
            NumStats[bucketName].push(num);
        }
    }

    let sortedArr = [];
    Object.keys(NumStats).sort((a, b) => Number(a) - Number(b)).forEach((bucketName) => {
        NumStats[bucketName].sort((a, b) => a - b);
        sortedArr = sortedArr.concat(NumStats[bucketName]);
    });

    return sortedArr;
}

function radixSort(arr) {
    let base = 1;
    const ref = 10;

    for (;;) {
        const NumStats = {};
        for (let i = 0; i < arr.length; i ++) {
            const num = arr[i];
            const bucketName = Math.floor(num / base) % ref;
            if (NumStats[bucketName] === undefined) {
                NumStats[bucketName] = [num];
            } else {
                NumStats[bucketName].push(num);
            }
        }
        let tempArr = [];
        const NumStatsKeys = Object.keys(NumStats).sort((a, b) => Number(a) - Number(b));
        NumStatsKeys.forEach((bucketName) => {
            tempArr = tempArr.concat(NumStats[bucketName]);
        });
        arr = tempArr

        if (NumStatsKeys.length === 1) {
            return arr;
        }
        base *= ref;
    }
}

console.log(`bubble sort: ${bubbleSort(deepCopy(data))}`);
console.log(`selection sort: ${selectionSort(deepCopy(data))}`);
console.log(`insertion sort: ${insertionSort(deepCopy(data))}`);
console.log(`quick sort: ${quickSort(deepCopy(data))}`);
console.log(`shell sort: ${shellSort(deepCopy(data))}`);
console.log(`merge sort: ${mergeSort(deepCopy(data))}`);
console.log(`heap sort: ${heapSort(deepCopy(data))}`);
console.log(`counting sort: ${countingSort(deepCopy(data))}`);
console.log(`bucket sort: ${bucketSort(deepCopy(data))}`);
console.log(`radix sort: ${radixSort(deepCopy(data))}`);
