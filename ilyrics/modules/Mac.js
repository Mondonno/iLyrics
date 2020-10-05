/*
Copyrights: iLyrics & github.com/Mondonno

This method getting actually playing song from: 
- Apple music (iTunes)
- Spotify
- QuickTime Player
*/

const applescript = require("applescript")
const config = require("./pinfo.json");
const fileMetadata = require('file-metadata');
var dir = "scripts/applescript_f"

async function ExecuteAPS(path){
  const rtn_ = await new Promise(resolve => {
    applescript.execFile(path ,(err, rtn) => {
      if (err) {
        console.log("ERROR WHEN TRY TO GET OSCPT FILES!");
        console.error("EXIT CODE: " + err.exitCode);
        console.error(err.message)
      } else {
          resolve(rtn)
      }
    })
  })
  return rtn_
}

async function QuickTimePlayerExtract(path) {
  try {
  let correct = "";
  correct = path.replace("Macintosh HD", "")
  let new_ = correct.split(":");
  for (let index = 0; index < new_.length; index++) {
      if(index != new_.length -1 ){
        new_[index] = new_[index] + "/"
      }
  
  }
  let completed = "";
  for (let index = 0; index < new_.length; index++) {
      completed+=new_[index];
  }

  const metadata = await fileMetadata(completed)
  
  if(!metadata.title) {
    if(!metadata.authors){
    return metadata.displayName + "≼*≸*≽" +""
    }else{
      return metadata.displayName + "≼*≸*≽" +metadata.authors[0]
    }
  }
  if(!metadata.authors) {
    if(metadata.title){
     return metadata.title + "≼*≸*≽" + ""
    }else{
      return metadata.displayName + "≼*≸*≽" + ""
    }
  }
  return metadata.title + "≼*≸*≽" +metadata.authors[0]
}catch(e){
  return "" + "≼*≸*≽" + ""
}
}

async function CheckIfPlayingMac(){;
    let script_path = `./${dir}/get_music.applescript`;
    let checking_p_path = `./${dir}/check_player.applescript`
    let IsQuickTimePlayer;

    const player_t = await ExecuteAPS(checking_p_path); //Here is the var what is specifing what player are playing

    if(player_t == "QUICKTIMEPLAYER"){
      IsQuickTimePlayer = true
    }else{
      IsQuickTimePlayer = false
    }

    const returned = await ExecuteAPS(script_path); // returning the data what is playing
    
    if(IsQuickTimePlayer){
      let extracted = await QuickTimePlayerExtract(returned);
      return extracted + "≼*≸*≽" + player_t
    }

    if(!returned){
      return "NOT"
    }
    return returned + "≼*≸*≽" + player_t ;
}
 
module.exports = {
CheckIfPlayingMac,
}
