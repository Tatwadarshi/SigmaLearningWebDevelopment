console.log("script is running");

const fun1 = (a) => {
    console.log(a);
}

function scriptOnload(src, callfn){
    let sc = document.createElement("script");
    sc.src = src;
    sc.onload = callfn("ok");
    document.body.append(sc);
}

scriptOnload("script2.js", fun1);