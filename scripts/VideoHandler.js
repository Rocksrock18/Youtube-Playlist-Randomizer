function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    window.player = player;
    console.log("test");
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
            Reshuffle();
        }
    }
}
