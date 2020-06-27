"use strict";
var CnfState = {"audio": false};
var AudioContext = window.AudioContext || false;
if (AudioContext) {
  CnfState.audio = true;    //    Icanuse
  var oAudContx = new AudioContext();    //    HTML5 Audio
  var oAJAXReq = new XMLHttpRequest();   //    Get Sounds
  var aAudioBuffer = new Array(30);       //    Store Sound files
  var fetchSoundConfig = {sound_max: 30, sound_current: 1};    //    Sound limits
  setTimeout( function(){ fetchSound(); }, 5600);
}
function fetchSound() {
    //    AJAX a single sound binary
    oAJAXReq.open("GET", "au/a" + fetchSoundConfig.sound_current + ".mp3", true);
    oAJAXReq.responseType = "arraybuffer";
    oAJAXReq.send();
    oAJAXReq.onload = fetchSoundonload;
}
function fetchSoundonload() {
    //    The audio file has loaded via AJAX
    oAudContx.decodeAudioData(oAJAXReq.response, function (decAudBuf) {
        aAudioBuffer[ fetchSoundConfig.sound_current ] = decAudBuf;
        fetchSoundConfig.sound_current = fetchSoundConfig.sound_current + 1;
        if(fetchSoundConfig.sound_current <= fetchSoundConfig.sound_max){
            oAJAXReq = new XMLHttpRequest();
            oAJAXReq.responseType = "arraybuffer";
            fetchSound( fetchSoundConfig.sound_current );
        }
    });
};
function playAudioFile( nSound ) {
  if( CnfState.audio === true ){  //  Play MP3 if sound toggle is true
    try{
      var oSrc = oAudContx.createBufferSource();
      var volume = oAudContx.createGain();
      oSrc.buffer = aAudioBuffer[nSound];
      oSrc.connect(volume);
      volume.connect(oAudContx.destination);
      oSrc.connect(oAudContx.destination);
      oSrc.start(oAudContx.currentTime);
      return true;
    } catch( e ){}
  }
};