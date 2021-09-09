import Cookies from '../js.cookie.mjs'
import {destroyQueue, setTitleList, setVideoList, playNextVideo} from '../scripts/YTPlayer.js';

export function SetCookie(key, value)
{
    console.log("In set cookie");
    console.log(value);
    Cookies.set(key, JSON.stringify(value));
}

export function ReadCookie(key)
{
    return Cookies.get(key);
}

export function ResumePlay()
{
    var vl = ReadCookie("videos");
    var tl = ReadCookie("titles");
    var current_id = ReadCookie("id");
    console.log(vl)
    console.log(tl)
    console.log(current_id)
    typeof tl !== 'undefined' && setTitleList(JSON.parse(tl));
    typeof vl !== 'undefined' && setVideoList(JSON.parse(vl));
    typeof current_id !== 'undefined' && playNextVideo(JSON.parse(current_id));
}
window.ResumePlay = ResumePlay;
