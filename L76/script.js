// async function getData(){
//     return new Promise((resolve, reject)=>{
//         setTimeout(() => {
//             resolve(445);
//         }, 3500);
//     })
// }

import {GoogleGenerativeAI} from "https://esm.run/@google/generative-ai";

const api_key = "AIzaSyCTUhuiX8UAm1ETitsh6bkTUCJ8vKzRHHo";

async function getData(link){
    let data = await fetch(link);
    let processedData = await data.json();
    return processedData["message"];
}

async function main(){
    let data = await getData("https://dog.ceo/api/breeds/image/random");
    let img = document.createElement("img");
    img.src = data;
    img.alt = "wait for dog"
    document.getElementsByClassName("container")[0].append(img);
    console.log("data: ", data);
    console.log("-------------------------------");
    // let data2 = await getData("https://esm.run/@google/generative-ai");
    // console.log(data2);
    const genAI = new GoogleGenerativeAI(api_key);
    console.log(genAI);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    console.log(model);
    let prompt = "Write a story about a school boy.";
    let result = await model.generateContent(prompt);
    // console.log(result+"ok");
    let response = await result.response;
    let text = response.text();
}

main();