import os

##  _ _                _          
## (_) |              (_)         
##  _| |    _   _ _ __ _  ___ ___ 
## | | |   | | | | '__| |/ __/ __|
## | | |___| |_| | |  | | (__\__ \
## |_|______\__, |_|  |_|\___|___/
##           __/ |                
##          |___/                 
## ------------------------------------------>
## iLyrics - Get every played song lirycs!
## Author - github.com/Mondonno
## Github Repository - github.com/Mondonno/iLyrics
## Created with LOVE
## ------------------------------------------>
## This is the main file of the iLyrics python rewrite

actual_song = ""
checking_time = 5000

def clear():
    os.system('cls' if os.name == 'nt' else 'clear') # Clearing the console

def Launch():
    print("""
 _ _                _          
(_) |              (_)         
 _| |    _   _ _ __ _  ___ ___ 
| | |   | | | | '__| |/ __/ __|
| | |___| |_| | |  | | (__\\__ \\
|_|______\\__, |_|  |_|\\___|___/
          __/ |                
         |___/ 
    """)
    print("|------------------------->")
    print("| iLyrics - The best lirycs for every audio file!")
    print("| Author - github.com/Mondonno")
    print("|------------------------->\n")
    

def GetMusic():
    print("x")

def GetLyrics(author, songname):
    print("x")