import {SetCookie, ReadCookie} from '../scripts/CookieManager.js';
import {Reshuffle} from '../scripts/Shuffler.js';
window.videoList = [];
var titleList = [];
var nextVideo;
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
    return window.videoList;
}

export function GetTitles()
{
    return titleList;
}

function findIndexByID(vid)
{
    for(var i = 0; i < window.videoList.length; i++)
    {
        var video = window.videoList[i];
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
    window.index = findIndexByID(vid);
    if(window.index == -1)
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
    window.index = findIndexByID(vid);
    if(window.index != -1)
    {
        window.player.loadVideoById(vid);
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
    window.videoList = vl;
    SetCookie("videos", vl)
    window.listLength = videoList.length;
    window.index = 0;
    nextVideo = window.videoList[0];
    initializeQueue();
    playNextVideo(nextVideo);
}

export function resetCurrentVid()
{
    var vid = window.videoList[prevIndex];
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
        li.setAttribute('id', window.videoList[i]);
        li.addEventListener("click", skipToVideo);
        li.appendChild(document.createTextNode(titleList[i]));
        ol.appendChild(li);
    }
}

export function destroyQueue()
{
    prevIndex = window.index;
    var ol = document.getElementById("dynlist");
    for(var i = 0; i < window.videoList.length; i++)
    {
        var li = document.getElementById(window.videoList[i]);
        ol.removeChild(li);
    }
}

export function setTitleList(t_list)
{
    titleList = t_list;
    SetCookie("titles", t_list);
}

export function Example()
{
    alert("Here's an example url: https://www.youtube.com/playlist?list=PLpJl5XaLHtLX-pDk4kctGxtF4nq6BIyjg");
}
window.Example = Example
