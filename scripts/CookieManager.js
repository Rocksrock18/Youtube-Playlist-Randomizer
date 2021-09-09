
function SetCookie(key, value)
{
    Cookies.set(key, value);
}

function ReadCookie(key)
{
    return Cookies.get(key);
}

function ResumePlay()
{
    var vl = ReadCookie("videos");
    var tl = ReadCookie("titles");
    var current_id = ReadCookie("id");
    typeof tl !== 'undefined' && setTitleList(tl);
    typeof vl !== 'undefined' && setVideoList(vl);
    typeof current_id !== 'undefined' && playNextVideo(current_id);
}

ResumePlay();
console.log(Cookies.get())
