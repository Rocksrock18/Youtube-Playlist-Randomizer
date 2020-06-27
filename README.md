# Youtube Playlist Randomizer

A website that lets you shuffle one or more youtube playlists.

Site can be found here: https://rocksrock18.github.io/Youtube-Playlist-Randomizer/

## The Problem with YouTube

YouTube has a built in "shuffle" feature already. **The problem is, it doesn't work.**
- Not only will videos repeat multiple times, but some videos *never get played at all.*

This site will play every video in the playlist once before randomizing the order again. You can even mix together multiple playlists, a feature YouTube has yet to add.

### Problems with YouTube's API

YouTube has an API that lets you get all sorts of information including a list of videos in a given playlist. Unfortunately, there are some complications.

Using YouTube's API requires an API key, which has a limited number of daily uses. An overload of requests leads to authorization failure, meaning you wouldn't be able to view anything at all. Usually this isn't a problem, and it worked great for several months.

However, recently authorization failure started happening on every request. This happened even though the number of requests should have been well below the daily quota.

**Long story short, this site uses an alternative method.**

## How it works



## Built With
* HTML, CSS, JavaScript
* Github text editor + Notepad

## Author
Jacob Maxson
