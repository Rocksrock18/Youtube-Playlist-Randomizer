var videoList = [];
var titleList = [];
var nextVideo;
var index;
var listLength;
var player;
var prevIndex;

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

function isInvalid(numVideos)
{
    if(numVideos == 0)
    {
        alert("Either no videos were in the given playlist, or all videos already exist in the current one.");
        return true;
    }
    return false;
}

function GetVideos()
{
    return videoList;
}

function GetTitles()
{
    return titleList;
}

function findIndexByID(vid)
{
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
    var index = findIndexByID(vid);
    if(index != -1)
    {
        player.loadVideoById(vid);
        var currVid = document.getElementById("currentvideolabel");
        currVid.innerHTML = "<b>Current Video:</b>     " + (index+1) + ". " + titleList[index];
        ChangeCurrentVideo(vid);
    }
}

function ChangeCurrentVideo(vid)
{
    var newVid = document.getElementById(vid);
    var oldVid = document.getElementsByClassName("CurrentlyPlaying")[0];
    if(oldVid != undefined)
    {
        oldVid.classList.remove("CurrentlyPlaying");
    }
    newVid.classList.add("CurrentlyPlaying");
}

function setVideoList(vl)
{
    videoList = vl;
    listLength = videoList.length;
    index = 0;
    nextVideo = videoList[index];
    initializeQueue();
    playNextVideo(nextVideo);
}

function resetCurrentVid()
{
    var vid = videoList[prevIndex];
    if(vid != undefined)
    {
        var listElement = document.getElementById(vid);
        listElement.classList.add("CurrentlyPlaying");
    }
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
    prevIndex = index;
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
}

function Example()
{
    alert("Here's an example url: https://www.youtube.com/playlist?list=PLpJl5XaLHtLX-pDk4kctGxtF4nq6BIyjg\n\nPlaylist ID: PLpJl5XaLHtLX-pDk4kctGxtF4nq6BIyjg");
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
            Reshuffle();
        }
    }
}
