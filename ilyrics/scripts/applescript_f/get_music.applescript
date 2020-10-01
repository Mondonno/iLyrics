set theStateM to ""
set theStateS to ""
set theStateQ to ""

tell application "Music"
	if it is running then
		 
		set theStateM to player state as text
		
		if theStateM is "playing" then
			return (name of current track as text) & "≼*≸*≽" & (artist of current track as text)
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
			return (name of c as text) & "≼*≸*≽" & (artist of c as text)
		else if theStateS is not "playing" then
			log "STOPED_SPOTIFY"
		end if
	end if
end tell

tell application "QuickTime Player"
try
	set theStateQ to get playing of document 1 
	if theStateQ is true then
		set f_path to file of document 1 as text
		return f_path
	else
		log "STOPED_QUICKTIMEPLAYER"
	end if 
	on error
		log "ERR"
	end try
end tell