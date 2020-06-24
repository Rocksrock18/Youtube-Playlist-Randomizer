var videoList;
var nextVideo;
var index;
var player;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: '0Bmhjf0rKe8',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

function setVideoList(vl)
{
    videoList = vl;
    index = 0;
    nextVideo = videoList[index];
}

// autoplay video
function onPlayerReady(event) {
    event.target.playVideo();
}

// when video ends
function onPlayerStateChange(event) {        
    if(event.data === 0) {            
        index++;
        nextVideo = videoList[index];
        var video = document.getElementById('player');
        video.videoId = nextVideo;
    }
}
