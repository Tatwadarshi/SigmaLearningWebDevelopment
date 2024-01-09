async function sleep() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(24);
        }, 1000);
    })
}

function sum(a, b, c) {
    return a + b + c;
}

(async function main() {
    // a = await sleep();
    // console.log(a);
    // b = await sleep();
    // console.log(b);
    let [x, y, z, ...rest] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log(x, y, z, rest);
    let obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
    }
    let { b, c } = obj;
    console.log(b, c);
    // Spread operator
    let arr = [3, 5, 2];
    console.log(sum(arr[0], arr[1], arr[2]));
    console.log(sum(...arr));
})()


(function () {
    var script = document.createElement('script');
    script.src = "//cdn.jsdelivr.net/npm/eruda";
    document.body.appendChild(script);
    script.onload = function () {
        eruda.init()
    }
}
)();
