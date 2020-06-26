
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
