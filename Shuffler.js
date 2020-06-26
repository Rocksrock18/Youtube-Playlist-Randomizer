
function Randomize()
{
    destroyQueue();
    var playlistID = document.getElementById('pl').value;
    var link = 'https://localhost:44321/api/values?playlistID='+playlistID;
    $.ajax({
        type: 'GET',
        url: link,
        success: function(data){
            var videos = [];
            var titles = [];
            for(var key in data) {
                videos[videos.length] = key;
                titles[titles.length] = data[key];              
            }
            if(!isInvalid(titles.length))
            {
                setVideoList(videos);
                setTitleList(titles);
            }
        },
        error: function (jqXHR, error, errorThrown) {
            alert(jqXHR.responseText
            +"\n" + error
            +"\n" + errorThrown);
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
        newTitleList[i] = titles[i];
        videos.splice(index, 1);
        titles.splice(index, 1);
    }
    setVideoList(newVideoList);
    setTitleList(newTitleList);
}
