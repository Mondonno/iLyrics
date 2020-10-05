set theStateM to ""
set theStateS to ""
set theStateQ to ""

tell application "Music"
	if it is running then
		 
		set theStateM to player state as text
		
		if theStateM is "playing" then
			return "APPLE_MUSIC"
		else if theStateM is not "playing" then
			log "STOPED_APPLEMUSIC"
		end if
	end if
end tell

tell application "Spotify"
	if it is running then
		set c to the current track
		
		set theStateS to player state as text
		
		if theStateS is "playing" then
			return "SPOTIFY"
		else if theStateS is not "playing" then
			log "STOPED_SPOTIFY"
		end if
	end if
end tell

tell application "QuickTime Player"
if it is running then
try
	set theStateQ to get playing of document 1 
	
	if theStateQ is true then
		return "QUICKTIMEPLAYER"
	else
		log "STOPED_QUICKTIMEPLAYER"
	end if 
	on error 
		log "ERR"
	end try
	end if
end tell

