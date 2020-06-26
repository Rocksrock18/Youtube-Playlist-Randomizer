
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
                setTitleList(titles);
                setVideoList(videos);
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
        newTitleList[i] = titles[index];
        videos.splice(index, 1);
        titles.splice(index, 1);
    }
    setTitleList(newTitleList);
    setVideoList(newVideoList);
}
