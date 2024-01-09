console.log("Script is running...");

let currentSong = new Audio();
let hue = 100;
let songsObj = {};
let songOl = document.querySelector('.songList').querySelector('ol');

function secondsToMinutesSeconds(seconds){
    if (isNaN(seconds) || (seconds < 0)){
        return '00:00';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formatedMinutes = String(minutes).padStart(2, '0');
    const formatedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formatedMinutes}:${formatedSeconds}`;
}

async function getPlaylists(){
    let a = await fetch('./songs/')
    let response = await a.text();
    // console.log(response);
    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    let playLists = [];
    // for (let index = 0; index < as.length; index++) {
    //     const element = as[index];
    //     // console.log(element.innerHTML)
    //     if (element.innerHTML != '../' && element.innerHTML != '.htaccess') {
    //         playLists.push(element.innerHTML);
    //     }
    // }
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.includes('songs') && !(element.href.includes('?')) && !(element.href.includes('.htaccess'))) {
            // console.log(as[index]);
            playLists.push(element.innerText);
        }
    }
    // console.log(playLists)
    return playLists;
}

async function getSongs(folder) {
    let a = await fetch(`./${folder}/`);
    let response = await a.text();
    // console.log(response);
    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    // console.log(as)
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // console.log(element);
            songName = element.innerText;
            songHref = element.href;
            songsObj[songName] = songHref;
        }
    }
    return songsObj;
}

const playMusic = (musicSrc, musicName, pause = false) => {
    currentSong.src = musicSrc;
    if (!pause){
        currentSong.play();
        play.src = './img/pause.svg';
    }
    document.querySelector('.songinfo').innerHTML = musicName;
    // document.querySelector('.playbar').style.animation = 'neon-border 1s infinite alternate';
}

async function main() {
    let playLists = await getPlaylists();
    // console.log(playLists)
    let playListContainer = document.querySelector('.cardContainer');

    for (const playlist of playLists) {
        let a = await fetch(`./songs/${playlist}/info.json`);
        let response = await a.json();
        playListContainer.innerHTML += `<div folder="${playlist}" class="card rounded">
        <div class="play">
            <img src="./img/playbtn.svg" alt="">
        </div>
        <img class="rounded" src="./songs/${playlist}/cover.jpg" alt="">
        <h2>${response.title}!</h2>
        <p>${response.description}!</p>
        </div>`
    }

    songsObj = await getSongs('songs/cs');
    let songs = Object.keys(songsObj);

    firstSongName = songs[0].replaceAll('.mp3', ' ').replaceAll('-', ' ').replace(songs[0].charAt(0), songs[0].charAt(0).toUpperCase());
    playMusic(songsObj[songs[0]], firstSongName, true);
    // console.log(songs);

    for (const song of songs) {
        analysedSongName = song.replaceAll('.mp3', ' ').replaceAll('-', ' ').replace(song.charAt(0), song.charAt(0).toUpperCase());
        songOl.innerHTML += `<li>
        <img class="invert" src="./img/music.svg" alt="">
        <div class="info">
            <div class="songName" songref = "${songsObj[song]}">${analysedSongName}</div>
            <div class="songArtist">Tatwadarshi</div>
        </div>
        <div class="playnow">
            <span>Play now</span>
            <div class="play">
                <img src="./img/playbtn.svg" alt="">
            </div>
        </div>
    </li>`;
    }

    // Attach an event listiner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName('li')).forEach(e => {
        e.addEventListener('click', () => {
            let clickedSong = e.querySelector('.info').firstElementChild.getAttribute('songref');
            let musicName = e.querySelector('.info').firstElementChild.innerHTML;
            playMusic(clickedSong, musicName);
            hue=100;
            document.querySelector('.playbar').style.boxShadow = `0 0 50px 2px hsl(${hue}, 100%, 50%), inset 0 0 70px 0 hsla(${hue}, 50%, 50%, 0.5)`;
        })
    })

    // Attach event listiner to previous, play and next
    play.addEventListener('click', () => {
        if (currentSong.src) {
            if (currentSong.paused) {
                currentSong.play();
                play.src = './img/pause.svg'
            }
            else {
                currentSong.pause();
                play.src = './img/playbtn2.svg';
                hue=100;
                document.querySelector('.playbar').style.boxShadow = `0 0 50px 2px hsl(${hue}, 100%, 50%), inset 0 0 90px 9px hsla(${hue}, 50%, 50%, 0.5)`;
            }
        }
    })

    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector('.songtime').innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector('.circle').style.left = (currentSong.currentTime/currentSong.duration) * 100 + '%';
        if (hue>=360) {
            hue = 0;
        }
        hue+=currentSong.currentTime;
        document.querySelector('.playbar').style.boxShadow = `0 0 50px 2px hsl(${hue}, 100%, 50%), inset 0 0 90px 9px hsla(${hue}, 50%, 50%, 0.5)`;
        if (currentSong.currentTime == currentSong.duration){
            hue = 100;
            play.src = './img/playbtn2.svg';
            currentSong.currentTime = 0;
        }
    })

    // Add event listener to seek bar
    document.querySelector('.seekbar').addEventListener('click', (e)=>{
        document.querySelector('.circle').style.left = (e.offsetX/e.target.getBoundingClientRect().width) * 100 + '%';
        currentSong.currentTime = currentSong.duration * (e.offsetX/e.target.getBoundingClientRect().width);
    })

    // Add event listener to hamburger
    document.querySelector('.hamburger').addEventListener('click', ()=>{
        document.querySelector('.left').style.transform = 'translateX(0)';
    })

    // Add event listener to close
    document.querySelector('.close').addEventListener('click', ()=>{
        document.querySelector('.left').style.transform = 'translateX(-100%)';
    })

    // Add event listenter to previous and next
    previous.addEventListener('click', ()=>{
        songrefs = Object.values(songsObj);
        songnames = Object.keys(songsObj);
        index = songrefs.indexOf(currentSong.src)
        if (index>0) {
            song = songnames[index-1];
            song = analysedSongName = song.replaceAll('.mp3', ' ').replaceAll('-', ' ').replace(song.charAt(0), song.charAt(0).toUpperCase());
            playMusic(songrefs[index-1], song);
            
        }
    })
    next.addEventListener('click', ()=>{
        songrefs = Object.values(songsObj);
        songnames = Object.keys(songsObj);
        index = songrefs.indexOf(currentSong.src)
        if (index+2<=songrefs.length) {
            song = songnames[index+1];
            song = analysedSongName = song.replaceAll('.mp3', ' ').replaceAll('-', ' ').replace(song.charAt(0), song.charAt(0).toUpperCase());
            playMusic(songrefs[index+1], song);
        }
    })

    // Add event listener to volume
    document.querySelector('.range').getElementsByTagName('input')[0].addEventListener('change', (e)=>{
        // console.log(e.target.value)
        currentSong.volume = parseInt(e.target.value)/100;
        if (e.target.value == 0) {
            volume.src = './img/volumeL.svg';
        }
        else if (e.target.value == 100) {
            volume.src = './img/volumeH.svg';
        }
        else{
            volume.src = './img/volume.svg';
        }
    })

    volume.addEventListener('click', ()=>{
        volumeLevel = document.querySelector('.range').getElementsByTagName('input')[0];
        // console.log(volumeLevel);
        if (volumeLevel.value != 0) {
            volumeLevel.value = 0;
            currentSong.volume = 0
            volume.src = './img/volumeL.svg';
        }
        else{
            volumeLevel.value = 10;
            volume.src = './img/volume.svg';
        }
        currentSong.volume = parseInt(volumeLevel.value)/100;
    })

    // Load the playlist whenever a card is clicked
    Array.from(document.getElementsByClassName('card')).forEach(e=>{
        e.addEventListener('click', async item=>{
            songsObj = {};
            let currFolder = e.getAttribute('folder');
            songsObj = await getSongs(`songs/${currFolder}`);
            let songs = Object.keys(songsObj);
            // console.log(songs);
            songOl.innerHTML = '';
            for (const song of songs) {
                analysedSongName = song.replaceAll('.mp3', ' ').replaceAll('-', ' ').replace(song.charAt(0), song.charAt(0).toUpperCase());
                songOl.innerHTML += `<li>
                <img class="invert" src="./img/music.svg" alt="">
                <div class="info">
                    <div class="songName" songref = "${songsObj[song]}">${analysedSongName}</div>
                    <div class="songArtist">Tatwadarshi</div>
                </div>
                <div class="playnow">
                    <span>Play now</span>
                    <div class="play">
                        <img src="./img/playbtn.svg" alt="">
                    </div>
                </div>
            </li>`;
            }

            Array.from(document.querySelector(".songList").getElementsByTagName('li')).forEach(e => {
                e.addEventListener('click', () => {
                    let clickedSong = e.querySelector('.info').firstElementChild.getAttribute('songref');
                    let musicName = e.querySelector('.info').firstElementChild.innerHTML;
                    playMusic(clickedSong, musicName);
                    console.log(clickedSong);
                    hue=100;
                    document.querySelector('.playbar').style.boxShadow = `0 0 50px 2px hsl(${hue}, 100%, 50%), inset 0 0 70px 0 hsla(${hue}, 50%, 50%, 0.5)`;
                })
            })
        })
    })
}

main();