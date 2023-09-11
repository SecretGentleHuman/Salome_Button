function playSound(soundId) {
    var audio = document.getElementById(soundId);
    if (audio) {
      audio.currentTime = 0; // 再生位置をリセット
      audio.play();
    }
}