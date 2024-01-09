console.log("promise script is running...");

let prom1 = new Promise((resolve, reject) => {
    let r = Math.random();
    if (r<0.5) {
        setTimeout(() => {
            console.log("Yes I am done!!!");
            resolve("resolved by TH");
        }, 2000);
    } else {
        reject("No random number was supproting you")
    }
})

let prom2 = new Promise((resolve, reject) => {
    let r = Math.random();
    if (r<0.5) {
        setTimeout(() => {
            console.log("Yes I am done!!! 2");
            resolve("resolved by TH 2");
        }, 2000);
    } else {
        reject("No random number was supproting you 2")
    }
})

let prom3 = Promise.race([prom1, prom2])

prom3.then((a)=>{
    console.log(a);
}).catch((err)=>{
    console.log(err);
})