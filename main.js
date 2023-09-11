function playSound(soundId) {
    var audio = document.getElementById(soundId);
    if (audio) {
      audio.currentTime = 0; // 再生位置をリセット
      audio.play();
    }
}

// CSVファイルの内容を仮定
const csvData = [
  ["カテゴリ1", "メニュー1", "./Resource/menu_01.wav", "2023-09-11"],
  ["カテゴリ1", "メニュー2", "./Resource/menu_02.wav", "2023-09-12"],
  // 他の行も同様に続きます
];

// HTMLボタンと音声を生成する関数
function generateButtonsFromCSV(data) {
  const container = document.body; // ボタンを追加するコンテナ要素

  data.forEach((row) => {
    const category = row[0];
    const buttonName = row[1];
    const sourceFilePath = row[2];
    const updateDate = row[3];

    const pElement = document.createElement("p");
    pElement.className = "btn";

    const aElement = document.createElement("a");
    aElement.textContent = buttonName;
    aElement.onclick = function () {
      playSound(sourceFilePath);
    };

    pElement.appendChild(aElement);
    container.appendChild(pElement);

    const audioElement = document.createElement("audio");
    audioElement.id = sourceFilePath; // ファイルパスをIDとして使用
    audioElement.preload = "auto";

    const sourceElement = document.createElement("source");
    sourceElement.src = sourceFilePath;
    sourceElement.type = "audio/wav";

    audioElement.appendChild(sourceElement);
    container.appendChild(audioElement);
  });
}

// CSVデータを使用してボタンと音声を生成
generateButtonsFromCSV(csvData);
