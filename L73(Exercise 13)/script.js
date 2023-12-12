// // console.log("Initial Testing");

function createCard(title, cName, views, monthsOld, duration, thumbnail, container = "container") {
    views = parseInt(views);
    if (views>=1000 & views<1000000) {
        views = views/1000;
        views = Math.round(views);
        views = views.toString() + "K";
    }
    else if (views>=1000000 & views<1000000000) {
        views = views/1000000;
        views = views.toFixed(2);
        views = views.toString() + "M";
    }
    else if(views>=1000000000){
        views = views/1000000000;
        views = views.toFixed(2);
        views = views.toString() + "B";
    }
    cont = document.getElementsByClassName(container)[0];
    card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
        `
        <div class="thumb-container">
        <img src="${thumbnail}" alt="...">
        <span class="duration">${duration}</span>
        </div>
        <div class="info">
        <div class="title">${title}</div>
        <div class="other-infos">
            <span class="channel-name">${cName}</span>
            <span class="gap-fill"> • </span>
            <span class="views">${views} views</span>
            <span class="gap-fill"> • </span>
            <span class="months-old">${monthsOld} months ago</span>
        </div>
        </div>
        `;
    cont.append(card);
}

btn = document.getElementById("create");

btn.addEventListener('click', ()=>{
    title = prompt("Enter the title of the video");
    cName = prompt("Enter the channel name of the video");
    views = prompt("Enter the number of views of the video");
    monthsOld = prompt("How many month old the video is?");
    duration = prompt("Enter the duration of the video");
    thumbnail = prompt("Enter the link/path of the video thumbnail");
    createCard(title, cName, views, monthsOld, duration, thumbnail);
})

createCard("Installing VS Code & How Websites Work | Sigma Web Development Course - Tutorial #1", "CodeWithTH", 789780, 4, "31:20", "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw");

createCard("Installing VS Code & How Websites Work | Sigma Web Development Course - Tutorial #1", "CodeWithTH", 789780, 4, "31:20", "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw");