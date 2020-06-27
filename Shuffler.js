
function Randomize()
{
    destroyQueue();
    var playlistID = document.getElementById('pl').value;
    var link = 'https://youtubeplaylistrandomizer.azurewebsites.net/api/values?playlistID='+playlistID;
    $.ajax({
        type: 'GET',
        url: link,
        success: function(data){
            var videos = [];
            var titles = [];
            for(var key in data) {
                if(!(videos.includes(key))
                {
                    videos[videos.length] = key;
                    titles[titles.length] = data[key];   
                }         
            }
            if(!isInvalid(titles.length))
            {
                setTitleList(titles);
                setVideoList(videos);
            }
        },
        error: function () {
            alert("The connection to the server failed. Check permissions and try again.");
        }
    });
}

function Reshuffle()
{
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
}

function Append()
{
    destroyQueue();
    var playlistID = document.getElementById('apl').value;
    var link = 'https://youtubeplaylistrandomizer.azurewebsites.net/api/values?playlistID='+playlistID;
    $.ajax({
        type: 'GET',
        url: link,
        success: function(data){
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
            }
        },
        error: function () {
            alert("The connection to the server failed. Check permissions and try again.");
        }
    });
}
