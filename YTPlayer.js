var videoList;
var nextVideo;
var index;
var listLength;
var player;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

function playNextVideo(vid)
{
    player.loadVideoById(vid)
}

function setVideoList(vl)
{
    console.log("Called!");
    videoList = vl;
    listLength = videoList.length;
    index = 0;
    nextVideo = videoList[index];
    playNextVideo(nextVideo);
}

// autoplay video
function onPlayerReady(event) {
    event.target.playVideo();
}

// when video ends
function onPlayerStateChange(event) {        
    if(event.data === 0) {            
        index++;
        if(index != listLength)
        {
            nextVideo = videoList[index];
            playNextVideo(nextVideo);
        }
        else
        {
            Randomize();
        }
    }
}
