import Cookies from '../js.cookie.mjs'
import {setTitleList, setVideoList, playNextVideo} from '../scripts/YTPlayer.js';

export function SetCookie(key, value)
{
    Cookies.set(key, JSON.stringify(value));
}

export function ReadCookie(key)
{
    return JSON.parse(Cookies.get(key));
}

export function ResumePlay()
{
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
