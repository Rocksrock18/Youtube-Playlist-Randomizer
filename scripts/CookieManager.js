import Cookies from '../js.cookie.mjs'
import {destroyQueue, setTitleList, setVideoList, playNextVideo} from '../scripts/YTPlayer.js';

export function SetCookie(key, value)
{
    localStorage.setItem(key, value)
    //Cookies.set(key, JSON.stringify(value));
}

export function ReadCookie(key)
{
    return localStorage.getItem(key);
    //return Cookies.get(key);
}

export function ResumePlay()
{
    //Cookies.set("titles", "Hello world!");
    var vl = ReadCookie("videos");
    var tl = ReadCookie("titles");
    var current_id = ReadCookie("id");
    console.log(vl)
    console.log(tl)
    console.log(current_id)
    typeof tl !== 'undefined' && setTitleList(tl);
    typeof vl !== 'undefined' && setVideoList(vl);
    typeof current_id !== 'undefined' && playNextVideo(current_id);
}
window.ResumePlay = ResumePlay;
