var videoList;
var titleList;
var nextVideo;
var index;
var listLength;
var player;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

function findIndexByID(vid)
{
    console.log(vid);
    for(var i = 0; i < videoList.length; i++)
    {
        var video = videoList[i];
        if(video === vid)
        {
            return i;
        }
    }
    return -1;
}

function skipToVideo(e)
{
    var vid = e.target.id;
    index = findIndexByID(vid);
    if(index == -1)
    {
        alert("Error: Video not found");
    }
    else
    {
        playNextVideo(vid);
    }
}

function playNextVideo(vid)
{
    player.loadVideoById(vid)
}

function setVideoList(vl)
{
    videoList = vl;
    listLength = videoList.length;
    index = 0;
    nextVideo = videoList[index];
    playNextVideo(nextVideo);
}

function initializeQueue()
{
    var ol = document.getElementById("dynlist");
    for(var i = 0; i < titleList.length; i++)
    {
        var li = document.createElement("li");
        li.setAttribute('id', videoList[i]);
        li.addEventListener("click", skipToVideo);
        li.appendChild(document.createTextNode(titleList[i]));
        ol.appendChild(li);
    }
}

function destroyQueue()
{
    var ol = document.getElementById("dynlist");
    for(var i = 0; i < videoList.length; i++)
    {
        var li = document.getElementById(videoList[i]);
        ol.removeChild(li);
    }
}

function setTitleList(tl)
{
    titleList = tl;
    initializeQueue();
}

// autoplay video
function onPlayerReady(event) {
    event.target.playVideo();
}

// when video ends
function onPlayerStateChange(event) {        
    if(event.data === 0) {            
        index++;
        if(index != listLength)
        {
            nextVideo = videoList[index];
            playNextVideo(nextVideo);
        }
        else
        {
            destroyQueue();
            Randomize();
        }
    }
}
