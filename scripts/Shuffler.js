import {destroyQueue, isInvalid, setTitleList, setVideoList, initializeQueue, resetCurrentVid, GetVideos, GetTitles} from '../scripts/YTPlayer.js';

var busy = false;

export function Randomize()
{
    if(!busy)
    {
        busy = true;
        destroyQueue();
        var url = document.getElementById('pl').value;
        var link = 'https://yt-playlist-randomizer.herokuapp.com/api?url='+url;
        $.ajax({
            type: 'POST',
            url: link,
            success: function(data){
                busy = false;
                var videos = data["videos"];
                var titles = data["titles"];
                if(!isInvalid(titles.length))
                {
                    setTitleList(titles);
                    setVideoList(videos);
                    Reshuffle();
                }
                else{
                    initializeQueue();
                    resetCurrentVid();
                }
            },
            error: function () {
                busy = false;
                alert("The connection to the server failed. Check permissions and try again.");
            }
        });
    }
}

export function Reshuffle()
{
    if(!busy)
    {
        busy = true;
        destroyQueue();
        var videos = GetVideos();
        var titles = GetTitles();
        var newVideoList = [];
        var newTitleList = [];
        var numVideos = videos.length;
        for(var i = 0; i < numVideos; i++)
        {
            var index = Math.floor(Math.random() * videos.length);
            newVideoList[i] = videos[index];
            newTitleList[i] = titles[index];
            videos.splice(index, 1);
            titles.splice(index, 1);
        }
        setTitleList(newTitleList);
        setVideoList(newVideoList);
        busy = false;
    }
}

export function Append()
{
    if(!busy)
    {
        busy = true;
        var videos = GetVideos();
        var titles = GetTitles();
        destroyQueue();
        var url = document.getElementById('apl').value;
        var link = 'https://yt-playlist-randomizer.herokuapp.com/api?url='+url;
        $.ajax({
            type: 'POST',
            url: link,
            success: function(data){
                busy = false;
                console.log(videos)
                console.log(titles)
                var new_vids = data["videos"];
                var new_titles = data["titles"];
                var count = 0;
                for (let i = 0; i < new_vids.length; i++) {
                    if(!(videos.includes(new_vids[i])))
                    {
                        videos[videos.length] = new_vids[i];
                        titles[titles.length] = new_titles[i];
                        count++;  
                    }       
                }
                if(!isInvalid(count))
                {
                    setTitleList(titles);
                    setVideoList(videos);
                    Reshuffle();
                }
                else{
                    initializeQueue();
                    resetCurrentVid();
                }
            },
            error: function () {
                busy = false;
                alert("The connection to the server failed. Check permissions and try again.");
            }
        });
    }
}
window.Reshuffle = Reshuffle;
window.Randomize = Randomize;
window.Append = Append;
