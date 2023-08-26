let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songTimeStamp =Array.from(document.getElementsByClassName('timeStamp'));

let songs = [
    { songName: "Roman Reigns", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    { songName: "Triple H", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    { songName: "Broken Dreams", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    { songName: "Judas Effect", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    { songName: "Edge", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    { songName: "Baron Corbin", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    { songName: "Faasle", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    { songName: "Waqt ki Baatein", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    { songName: "Alag Aasman", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    { songName: "Until i found you", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    { songName: "Taking Over", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    { songName: "Aarambh hai prachand", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    { songName: "Fire", filePath: "songs/13.mp3", coverPath: "covers/13.jpg"},
    { songName: "Cupid", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
    { songName: "Die For You", filePath: "songs/15.mp3", coverPath: "covers/15.jpg"},
    { songName: "Enemy", filePath: "songs/16.mp3", coverPath: "covers/16.jpg"}
];
// array of objects
// audioElement.play();
songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});

// songTimeStamp.forEach((element) => {
//     element.innerText=`${parseInt(audioElement.duration)}`;
// });
// audioElement.src = 'songs/1.mp3';


const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');

    });
};

// listen to events
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity=1;
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            let elementId=parseInt(element.id);
            if(elementId == songIndex)
            {
                element.classList.add('fa-circle-pause');
                element.classList.remove('fa-circle-play');
                // console.log(element)
            }
        });
        playingSong();
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause')
        gif.style.opacity=0;
        makeAllPlays();

    }
});

audioElement.addEventListener('timeupdate',() => {
    //update seek bar
    // console.log('timeupdate');
    var progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress)
    myProgressBar.value = progress
    if(progress == 100)
    {
        songIndex++;
        if(songIndex == songs.length) songIndex = 0;
        audioElement.src=`songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        playingSong();
        makeAllPlays();
        solvingMiniPause();
    }
});
myProgressBar.addEventListener('change', () => {
    // audioElement.currentTime =myProgressBar.value; // it is in percent
    audioElement.currentTime =myProgressBar.value * audioElement.duration / 100;
});



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>
{
    element.addEventListener('click', (e)=> {
        if(e.target.classList.contains('fa-circle-play'))
        {
            songIndex=parseInt(e.target.id);
            makeAllPlays();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause')
            gif.style.opacity=1;
            audioElement.src=`songs/${songIndex+1}.mp3`;
            audioElement.currentTime=0;
            audioElement.play();
            masterSongName.innerText = songs[songIndex].songName;
            playingSong();
        }
        else{
            makeAllPlays();
            e.target.classList.add('fa-circle-play');
            e.target.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause')
            gif.style.opacity=0;
            audioElement.pause();
            masterSongName.innerText = songs[songIndex].songName; 
            playingSong();
        }
    })
});

document.getElementById('previous').addEventListener('click',() => {
    songIndex--;
    if(songIndex <= 0) songIndex=songs.length-1; 
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause')
    gif.style.opacity=1;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    makeAllPlays();
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        let elementId=parseInt(element.id);
        if(elementId == songIndex)
        {
            element.classList.add('fa-circle-pause');
            element.classList.remove('fa-circle-play');
            // console.log(element)
        }
    });
    playingSong();
});
document.getElementById('next').addEventListener('click',() => {
    songIndex++;
    if(songIndex == songs.length) songIndex=0; 
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause')
    gif.style.opacity=1;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    makeAllPlays();
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        let elementId=parseInt(element.id);
        if(elementId == songIndex)
        {
            element.classList.add('fa-circle-pause');
            element.classList.remove('fa-circle-play');
            // console.log(element)
        }
    });
    playingSong();
});
document.getElementById('leftSkip').addEventListener('click', () => {
    audioElement.currentTime = audioElement.currentTime - 10;
    if(audioElement.currentTime <= 10) audioElement.currentTime = 0;
    myProgressBar.value=audioElement.currentTime;
});
document.getElementById('rightSkip').addEventListener('click', () => {
    audioElement.currentTime = audioElement.currentTime + 10;
    if(audioElement.currentTime >= audioElement.duration) 
        audioElement.currentTime = audioElement.duration-10;
    myProgressBar.value=audioElement.currentTime;
});

function playingSong()
{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
        // console.log(element);
        if(element.id == songIndex)
        {
            element.classList.add('playingSong');
            let IMAGE =element.getElementsByTagName('img');
            IMAGE[0].classList.add('rotate');
        }
        else 
        {
            element.classList.remove('playingSong');
            let IMAGE =element.getElementsByTagName('img');
            IMAGE[0].classList.remove('rotate');
        }
    })
};
function solvingMiniPause()
{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        if(element.id==songIndex)
        {
            element.classList.add('fa-circle-pause');
            element.classList.remove('fa-circle-play');
        }
    });
}