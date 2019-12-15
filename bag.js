// w for weight; v for value
const data = [
    {
        w: 3,
        v: 4,
    },
    {
        w: 6,
        v: 6,
    },
    {
        w: 3,
        v: 6,
    },
    {
        w: 8,
        v: 12,
    },
    {
        w: 6,
        v: 10,
    }
];

const payload = 10;

function bag01Solve(items, payload) {
    function initRecord(things) {
        const ret = [];
        const itemsCount = things.length;
        for (let i = 0; i < itemsCount; i ++) {
            ret[i] = [];
        }
        return ret;
    };

    function whichItems(record, items, payload) {
        const result = [];
        const itemsCount = record.length;
        let nextPayload = payload;
        for (i = itemsCount - 1; i >= 0; i --) {
            if (i === 0) {
                if (record[i][nextPayload] !== 0) {
                    nextPayload -= items[i].w;
                    result.push(i);    
                }
                break;
            }
            if (record[i][nextPayload] !== record[i - 1][nextPayload]) {
                nextPayload -= items[i].w;
                result.push(i);
            }
        }

        return result;
    }

    const record = initRecord(items);
    for (let i = 0; i < items.length; i ++) {
        for (let j = 0; j <= payload; j ++) {
            // 判断是否还能放
            if (j < items[i].w) {
                if (i === 0) {
                    record[i][j] = 0;
                } else {
                    record[i][j] = record[i - 1][j] || 0;
                }
            } else {
                // 第一排直接放
                if (i === 0) {
                    record[i][j] = items[i].v + 0;
                } else {
                    // 比较放和不放哪个大
                    record[i][j] = Math.max(record[i - 1][j], items[i].v + record[i - 1][j - items[i].w]);
                }
            }
        }
    }
    console.log(record);
    let maxValue = record[items.length - 1][payload];
    console.log(`which items?: ${whichItems(record, items, payload)}`);

    return maxValue;
}

console.log(`0-1 bag: ${bag01Solve(data, payload)}`);
