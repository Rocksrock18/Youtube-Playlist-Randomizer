var videos;

function Randomize()
{
    var playlistID = document.getElementById('pl').value;
    var link = 'https://localhost:44321/api/values?playlistID='+playlistID;
    console.log("Link: " + link);
    $.ajax({
        type: 'GET',
        data: playlistID,
        crossDomain: true,
        url: link,
        success: function(data){
            for(var i = 0; i < data.length; i++)
            {
                console.log("Data Recieved: " + data[i]);
            }
            videos = data;
            setVideoList(videos);
        },
        error: function (jqXHR, error, errorThrown) {
            alert(jqXHR.responseText
            +"\n" + error
            +"\n" + errorThrown);
        }
    });
}
