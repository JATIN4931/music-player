
fetch('./js/data.json')
    .then(response => response.json())
    .then(data => console.log(data));

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

//initialize the variable
let songIndex = 0;
const songContainer = document.getElementById('songContainer');
let list = [];
let cover = [];
let songName = [];
fetch('/js/data.json')
    .then((response) => response.json())
    .then((data) => {
        let obj = data.song;
        obj = shuffle(obj);
        for (let i = 0; i < obj.length; i++) {
            list.push(obj[i].filePath);
            cover.push(`url('/img/${obj[i].coverPath}')`)
            songName.push(obj.a)
            let container = document.createElement("div");
            container.classList.add("songitem");
            let img = document.createElement("img");
            img.setAttribute("src", `../img/${obj[i].coverPath}`)
            let span = document.createElement("span");
            span.classList.add("songname");
            span.innerText = `${obj[i].songName}`;
            let songlistplay = document.createElement("span");
            let timestamp = document.createElement("span");
            timestamp.innerText = `${obj[i].time}`;
            let songitemplay = document.createElement("i");
            songlistplay.classList.add("songlistplay");
            timestamp.classList.add("timestamp");
            songitemplay.classList.add("far", "songitemplay", "fa-1x", "fa-play-circle");
            timestamp.appendChild(songitemplay);
            songlistplay.appendChild(timestamp)
            container.appendChild(img);
            container.appendChild(span);
            container.appendChild(songlistplay);
            songContainer.appendChild(container);
        }

        let background = document.getElementById("main");
        let audioElement = new Audio(list[0]);
        let masterplay = document.getElementById('masterplay');
        let sname = document.getElementById('name');
        let myprogressbar = document.getElementById('myprogressbar');
        let gif = document.getElementById('gif');
        const previous = document.getElementById("previous");
        previous.addEventListener('click', () => {
            audioElement.pause();
            if (songIndex < 0) {
                songIndex = 1;
            }
            songIndex--;
            audioElement = new Audio(list[songIndex]);
            background.style.background = cover[songIndex];
            sname.innerText = `${list[songIndex]}`;
            audioElement.play();
            audioElement.addEventListener('timeupdate', () => {
                progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

                myprogressbar.value = progress;
            })
            myprogressbar.addEventListener('change', () => {
                audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
            })
        })
        const next = document.getElementById("next");
        next.addEventListener('click', () => {
            audioElement.pause();
            if (songIndex > obj.length) {
                songIndex = 0;
            }
            songIndex++;
            audioElement = new Audio(list[songIndex]);
            background.style.background = cover[songIndex];
            sname.innerText = `${list[songIndex]}`;
            audioElement.play();
            audioElement.addEventListener('timeupdate', () => {
                progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

                myprogressbar.value = progress;
            })
            myprogressbar.addEventListener('change', () => {
                audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
            })
        })

        masterplay.addEventListener('click', () => {
                if (audioElement.paused || audioElement.currentTime <= 0) {
                    audioElement.play();
                    masterplay.classList.remove('fa-play-circle');
                    masterplay.classList.add('fa-pause-circle');
                    sname.innerText = `${list[songIndex]}`;
                    gif.style.opacity = 1;
                } else {
                    audioElement.pause();
                    masterplay.classList.remove('fa-pause-circle');
                    masterplay.classList.add('fa-play-circle');
                    sname.innerText = `${list[songIndex]}`;
                    gif.style.opacity = 0;
                }
            })
            //listen to events

        audioElement.addEventListener('timeupdate', () => {

            let audioElement = document.querySelector('audio');

            audioElement.addEventListener('play', function() {
                document.body.classList.add('transition');
            });

            //update seekbar
            progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

            myprogressbar.value = progress;
        })
        myprogressbar.addEventListener('change', () => {
            audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
        })
        const makeAllPlays = () => {
            element.classList.add('fa-pause-circle');
            Array.from(document.getElementsByClassName('songItemPlays')).forEach((element) => {})
        }
    });