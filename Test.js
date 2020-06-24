function Randomize()
{
    var playlistID = document.getElementById('pl').value;
    console.log(playlistID);
    $.ajax({
        type: 'GET',
        data: playlistID,
        crossDomain: true,
        url: 'https://localhost:44321/api/values',
        success: function(data){
            document.write("<iframe width=\"420\" height=\"315\"src=\"https://www.youtube.com/embed/" + data[0] + "?autoplay=1\"allow=\"autoplay\"></iframe>");
            for(var i = 0; i < data.length; i++)
            {
                console.log("Data Recieved: " + data[i]);
            }
        },
        error: function (jqXHR, error, errorThrown) {
            alert(jqXHR.responseText
            +"\n" + error
            +"\n" + errorThrown);
        }
    });
}