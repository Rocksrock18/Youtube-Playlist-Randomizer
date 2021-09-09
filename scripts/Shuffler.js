var busy = false;

function Randomize()
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

function Reshuffle()
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

function Append()
{
    if(!busy)
    {
        busy = true;
        destroyQueue();
        var playlistID = document.getElementById('apl').value;
        var link = 'https://youtubeplaylistrandomizer.azurewebsites.net/api/values?playlistID='+playlistID;
        $.ajax({
            type: 'GET',
            url: link,
            success: function(data){
                busy = false;
                var videos = GetVideos();
                var titles = GetTitles();
                var count = 0;
                for(var key in data) {
                    if(!(videos.includes(key)))
                    {
                        videos[videos.length] = key;
                        titles[titles.length] = data[key];
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
