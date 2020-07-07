# Youtube Playlist Randomizer

A website that lets you shuffle one or more youtube playlists.

Site can be found here: https://rocksrock18.github.io/Youtube-Playlist-Randomizer/

## The Problem with YouTube

YouTube has a built in "shuffle" feature already. **The problem is, it doesn't work.**
- Not only will videos repeat multiple times, but some videos *never get played at all.*

This site will play every video in the playlist once before randomizing the order again. You can even mix multiple playlists together.

### Problems with YouTube's API

YouTube has an API that lets you get all sorts of information, including a list of videos in a given playlist. Unfortunately, there are some complications.

Using YouTube's API requires an API key, which has a limited number of daily uses. An overload of requests leads to authorization failure, meaning you wouldn't be able to view anything at all. Usually this isn't a problem, and it worked great for several months.

However, recently authorization failure started happening on every request. This happened even though the number of requests should have been well below the daily quota.

**Long story short, this site uses an alternative method.**

## How it works

1. The site takes in a playlist id, and generates the source page of the playlist entered.
2. The source page is parsed in order to find the video id's and titles of each video in the playlist.
   - By default, the source page only generates the first 100 videos in the playlist.
3. Each video is compiled into a list and then placed in a random order.
   - The order can be reshuffled at any time.
4. Additional playlists can be appended to the list, and the order will be shuffled again.

### Working with Large Playlists

If a playlist has more than 100 videos in it, only the first 100 will be generated. **Luckily, there is a workaround.**

* By splitting the large playlists into 100 video chunks, each additional playlist can be appended until every video is in the mix.
* YouTube does not currently have a way to easily split playlists, so this will have to be done manually.

## Accessibility

Certain playlists/videos cannot be accessed due to their privacy level. Any playlist that is **private**,
or that **has a private video in it**, cannot be played.

* **Note:** Sometimes YouTube will auto-generate playlists for a user. These are not recognized as "official" playlists, and hence cannot
be accessed.

## Built With
* Visual Studio (Back-end)
* Visual Studio Code (Front-end)

## Author
Jacob Maxson
