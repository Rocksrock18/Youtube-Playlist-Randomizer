import {SetCookie, ReadCookie} from '../scripts/CookieManager.js';
import {Reshuffle} from '../scripts/Shuffler.js';
var videoList = [];
var titleList = [];
var nextVideo;
var index;
var listLength;
var player;
var prevIndex;

export function isInvalid(numVideos)
{
    if(numVideos === 0)
    {
        alert("Either no videos were in the given playlist, or all videos already exist in the current one.");
        return true;
    }
    return false;
}

export function GetVideos()
{
    return videoList;
}

export function GetTitles()
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

export function playNextVideo(vid)
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
    SetCookie("id", vid)
    if(oldVid != undefined)
    {
        oldVid.classList.remove("CurrentlyPlaying");
    }
    newVid.classList.add("CurrentlyPlaying");
}

export function setVideoList(vl)
{
    videoList = vl;
    SetCookie("videos", vl)
    listLength = videoList.length;
    index = 0;
    nextVideo = videoList[index];
    initializeQueue();
    playNextVideo(nextVideo);
}

export function resetCurrentVid()
{
    var vid = videoList[prevIndex];
    if(vid != undefined)
    {
        var listElement = document.getElementById(vid);
        listElement.classList.add("CurrentlyPlaying");
    }
}

export function initializeQueue()
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

export function destroyQueue()
{
    prevIndex = index;
    var ol = document.getElementById("dynlist");
    for(var i = 0; i < videoList.length; i++)
    {
        var li = document.getElementById(videoList[i]);
        ol.removeChild(li);
    }
}

export function setTitleList(tl)
{
    titleList = tl;
    SetCookie("titles", tl)
}

export function Example()
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
window.Example = Example;
