// Buiseness Name Generator Project

let adjectives = {
    1: "Crazy",
    2: "Amazing",
    3: "Fire"
}

let shopName = {
    1: "Engine",
    2: "Foods",
    3: "Garments"
}

let anotherWord = {
    1: "Bros",
    2: "Limited",
    3: "Hub"
}

let randAdj;
let randShop;
let randAnother;

let finalName;


let randomNameGenerator = () => {
    randAdj = Math.round(Math.random() * (Object.keys(adjectives).length - 1)) + 1;
    randShop = Math.round(Math.random() * (Object.keys(shopName).length - 1)) + 1;
    randAnother = Math.round(Math.random() * (Object.keys(anotherWord).length - 1)) + 1;


    // console.log(randAdj);
    // console.log(randShop);
    // console.log(randAnother);

    finalName = `${adjectives[randAdj]} ${shopName[randShop]} ${anotherWord[randAnother]}`;
    console.log(finalName);
    alert(`The name Generated is: ${finalName}`);
}

// while(1){
//     randomNameGenerator();
// }

while(confirm("Do you want to generate Name for your buisness?")){
    randomNameGenerator();
}
