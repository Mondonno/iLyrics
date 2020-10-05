/*
  _ _                _          
 (_) |              (_)         
  _| |    _   _ _ __ _  ___ ___ 
 | | |   | | | | '__| |/ __/ __|
 | | |___| |_| | |  | | (__\__ \
 |_|______\__, |_|  |_|\___|___/
           __/ |                
          |___/                 
 ------------------------------------------>
 iLyrics - Get every played song lirycs!
 Author - github.com/Mondonno
 Github Repository - github.com/Mondonno/iLyrics
 Created with LOVE & Apache License
 ------------------------------------------>
*/

// <- LIBS ->
// Here is the required libraries for this node.js app
const request = require("request")
const cheerio = require("./node_modules/cheerio")
const fs = require("fs");
const mac = require("./modules/Mac.js") 
const win = require("./modules/Windows.js") //Working on it to be on use!

// <- VARS ->
var configFile = require("./modules/pinfo.json"); //Config file declaration
var actual_song; //Here is landing the actually song playing

/*
-> Player:
Q = QuickTime player
M = iTunes Music
S = Spotify
*/
let LastPlayed = configFile.last_played; //LastPlayed module (SOON)
let checking_interval = configFile.checking; //You can change it on ./modules/pinfo.json

// <- LOGIC ->
async function der_check() {
  function require_files() {
    try {
      require("./applescript_f")
      require("./modules/Mac.js")
      require("./modules/Windows.js")
      require("./modules/pinfo.json")
      return true
      
    } catch (error) {
      return false
    }
  }
  /*
  Checking system predispositions & acctualy version for this app etc.
  Really basic
  */
  var system = "0" //Can be 0 or 1
  /*
  0 - MacOS
  1 - Windows
  */
  
  var version = ""; version = require("./package.json").version // Version of the runned app
  let act_version = ""; //Acctually version
  let wifi = false;
  if(await new Promise(async resolve => {request("https://github.com/Mondonno/iLyrics",async function (error, response, html) {if(error) resolve(true)})}))
  {
   wifi = false
  }else {
    wifi = true
  }
  if(version == act_version){}
  else if(version != act_version) return "NO_VERSION"
  if(!wifi) return "NO_WIFI"
  if(!require_files()) return "NO_REQUIRED_FILES" 


  
}
async function Launch(){ // Initial Func
/*
This method starting the iLyrics procces!
Main method here!
*/
for (let index = 0; index < 20; index++) {
console.clear();
}
  console.log(
`
 _ _                _          
(_) |              (_)         
 _| |    _   _ _ __ _  ___ ___ 
| | |   | | | | '__| |/ __/ __|
| | |___| |_| | |  | | (__\\__ \\
|_|______\\__, |_|  |_|\\___|___/
          __/ |                
         |___/ 


` 
  )
console.log("⎡⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯>")
console.log("⎜ iLyrics - The best lirycs for every audio file!")
console.log("⎜ Author - github.com/Mondonno")
console.log("⎣⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯>\n")

// return
// if(der_check() == "NO_WIFI") return console.log("ERROR: No internet (required to get lyrics)")
// if(der_check() == "SYSTEM_NOT_AVAIBLE") return console.log("ERROR: This system our app do not recoginizing!\nCheck out github.com/Mondonno/iLyrics")
// if(der_check() == "NO_REQUIRED_FILES") return console.log("ERROR: Go and reinstall the app! The required files do not found!")
// if(der_check() == "NO_VERSION") return console.log("Let's go and update app! New version avaible! github.com/Mondonno/iLyrics")

setInterval(CheckMusic,checking_interval);
}

async function CheckMusic()
{
  /*
  Here the program checking every 5 secounds if the song is playing
  If yes getting info and formatting it
  Then getting liyrcs from getted info

  "NOT" returned: Any music are playing
  "SongName≼*≸*≽Author≼*≸*≽Player" returned: Music is playing, splitting and getting sreperationed info
  */

  if(await mac.CheckIfPlayingMac() == "NOT"){
    if(actual_song != "NOT"){
      actual_song = "NOT";
      console.clear();
      console.clear();
      console.clear();
      console.log("Any music are playing / The music is paused/stopped")
      return
    }
    return
        }

    if(`${await mac.CheckIfPlayingMac()}`.includes("≼*≸*≽")){
    let song = await mac.CheckIfPlayingMac()
    if(song != actual_song){
    actual_song = song;
    let songinfo = song.split("≼*≸*≽")
    let mscAuthor = songinfo[1]
    let mscSongName = songinfo[0]
    let player_type = songinfo[2]
    if(!mscSongName) {
      console.clear();
      console.log(`The music attriubtes do not includes: Music Name | ${mscAuthor}`);
      return}
    else if(!mscAuthor){
      console.clear(); 
      console.log(`The music attriubtes do not includes: Music Author | ${mscSongName}`);
      return
    }
    console.log(mscAuthor + " " +  mscSongName + " "+ player_type )
    if(!player_type) return console.log("Did you hacking? We can not recoginize the player");

    switch (player_type) {
      case "APPLE_MUSIC":
        player_type = "Apple Music (iTunes)"
        break;
    case "SPOTIFY":
    player_type = "Spotify"
    break;
    case "QUICKTIMEPLAYER":
      player_type = "QuickTime Player"
      break;
      default:
        break;
    }
    
console.clear();
console.log
(
`
| ------------------------->
| SONG NAME: ${mscSongName}
| AUTHOR: ${mscAuthor}
| PLAYER: ${player_type}
| ------------------------->
`
)
//Calling lyrics api
console.log(`-> DISPLAYING LYRICS FOR: ${mscSongName}`, "")
let song_url = `${await customizer(mscSongName,mscAuthor)}-lyrics`
const lyrics = await GetLyrics(mscSongName,mscAuthor);

if(lyrics == "ERR"){
  // console.clear()
  console.log(`-> SONG URL: genius.com/${song_url}\n`)
  console.log("Error occourned! Are you connected to internet?")
}else if (!lyrics){
 // console.clear()
 console.log(`-> SONG URL: genius.com/${song_url}\n`)
  console.log("Lyrics for this song are unavaible!")
}
else {
 console.clear()
 console.log("\n<---------------------------------------------------------------------->")
console.log(lyrics)
console.log(`\n-> SONG URL: genius.com/${song_url}\n`)
}

  }
    }
}

async function customizer(song, artist){
  
  /*
  Customizing the string to be able to insert into Genius API
  Replacing spaces and blank symbols to -
  Some examples.
  > customizer('On Top Of The World', 'Imagine Dragons')
  > 'Imagine-Dragons-On-Top-Of-The-World-Lyrics'
  And we formatting it into: https://genius.com/Imagine-dragons-on-top-of-the-world-lyrics

  :param song: Song name
  :param artist: Artist name

  In return you are getting the path
  
  UPDATE!
  We are working on JavaScript version of this method but now for fater start we are using ./module.py & child procces for this method
  */

 let spawn = require("child_process").spawn

 let pyArgs = ["module.py", '\''+song+ '\'', '\'' + artist + '\'']
 let pyScript = spawn("python3", ["module.py", '\'' + song+ '\'','\''+artist+ '\'']);
const pyData = await new Promise(resolve =>{ pyScript.stdout.on('data', function(data) {
     resolve(data.toString())
 });
}
)
let new_url = ""
  for (let index = 0; index < pyData.length; index++) {
    new_url += pyData[index].replace("\n","");
  }
return new_url

}

async function GetLyrics(song,artist){ //Connecting to the Lyrics API and getting lyrics
  /*
  Here we are connecting to the API 
  1. Customizing and converting song and artist into a path
  2. Creating url_dt
  3. Requesting to API if not internet/lyrics unavaible returning null
  4. Searching for div with lyrics and downloading lyrics
  5. Returning lyrics in string

  This method returning only lyrics and formatting them, anything else

  :param song: Song Name
  :param artist: Artist Name
  */
 
  let str_path = await customizer(song,artist)
  var url_dt = `https://genius.com/${str_path}-lyrics`;

  var options = 
  {
    url : url_dt,
  }
  const req_lyrics = await new Promise(async resolve => {
   request(url_dt,async function (error, response, html) { 
      if(error){
        resolve("ERR")
        return
      }
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      let lyrics_div = $('div.lyrics').text();
      console.log(lyrics_div)
      if(lyrics_div){
          resolve(lyrics_div)
      }else{
          resolve(null)
      }
    }else if (response.statusCode == 400){
      resolve("404")
    }
    else{
      resolve("UNDEF_ERR")
    }
  });
  })
  let lyrics = await req_lyrics
  if(!lyrics){
    //Working on it!
    // if(der_check() == "NO_WIFI"){
    //   return "\nNo wifi, please connect to internet!"
    // }
  }
  return lyrics //If all is ok lyrics are returning


}

// Launching the iLyrics process
Launch();

module.exports = {
  Launch,
  actual_song,
  checking_interval
}