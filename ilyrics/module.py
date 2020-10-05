#-*- mode: python -*-
# -*- coding: utf-8 -*-
import sys
from sys import argv
sys.path.extend("/usr/local/lib/python2.7/dist-packages/")
import os
import re

from unidecode import unidecode

# matches braces with feat included or text after -, also adds support for Bollywood songs by matching (From "<words>")
brc = re.compile(r'([(\[](feat|ft|From "[^"]*")[^)\]]*[)\]]|- .*)', re.I)
aln = re.compile(r'[^ \-a-zA-Z0-9]+')  # matches non space or - or alphanumeric characters
spc = re.compile(' *- *| +')  # matches one or more spaces
wth = re.compile(r'(?: *\(with )([^)]+)\)')  # capture text after with
nlt = re.compile(r'[^\x00-\x7F\x80-\xFF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]')  # match only latin characters,
# built using latin character tables (basic, supplement, extended a,b and extended additional)

f,sng,artist = argv
def stripper(song, artist):
   
    song = re.sub(brc, '', song).strip()  # remove braces and included text with feat and text after '- '
    ft = wth.search(song)  # find supporting artists if any
    if ft:
        song = song.replace(ft.group(), '')  # remove (with supporting artists) from song
        ar = ft.group(1)  # the supporting artist(s)
        if '&' in ar:  # check if more than one supporting artist and add them to artist
            artist += '-'+ar
        else:
            artist += '-and-'+ar
    song_data = artist + '-' + song
    # swap some special characters
    url_data = song_data.replace('&', 'and')
    # replace /, !, _ with space to support more songs
    url_data = url_data.replace('/', ' ').replace('!', ' ').replace('_', ' ')
    for ch in ['Ø', 'ø']:
        if ch in url_data:
            url_data = url_data.replace(ch, '')
    url_data = re.sub(nlt, '', url_data)  # remove non-latin characters before unidecode
    url_data = unidecode(url_data)  # convert accents and other diacritics
    url_data = re.sub(aln, '', url_data)  # remove punctuation and other characters
    url_data = re.sub(spc, '-', url_data.strip())  # substitute one or more spaces to -
    return url_data

print(stripper(sng,artist))