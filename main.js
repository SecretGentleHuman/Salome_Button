// CSVファイルのURL（sample.csvを配置した場所に合わせて変更してください）
const csvFileUrl = 'sound_list.csv';

function playSound(soundId) {
  var audio = document.getElementById(soundId);
  if (audio) {
    audio.currentTime = 0; // 再生位置をリセット
    audio.play();
  }
}

// CSVファイルを読み込む関数
function readCSVFile(url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const lines = data.split('\n');
      const csvData = [];

      // CSVデータを処理
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        csvData.push(values);
      }

      // カテゴリごとにグループ化
      const groupedData = groupByCategory(csvData);

      // カテゴリごとにHTML要素を生成
      generateCategoryElements(groupedData);
    })
    .catch((error) => {
      console.error('CSVファイルの読み込み中にエラーが発生しました:', error);
    });
}

// カテゴリごとにデータをグループ化する関数
function groupByCategory(data) {
  const groupedData = new Map();

  data.forEach((row) => {
    const category = row[0];

    if (!groupedData.has(category)) {
      groupedData.set(category, []);
    }

    groupedData.get(category).push(row);
  });

  return groupedData;
}

// カテゴリごとにHTML要素を生成する関数
function generateCategoryElements(groupedData) {
  const container = document.body;
  var count = 0;

  groupedData.forEach((categoryData, category) => {
    const h2Element = document.createElement("h2");
    h2Element.textContent = category;
    container.appendChild(h2Element);

    categoryData.forEach((row, index) => {
      const buttonName = row[1];
      const sourceFilePath = row[2];

      const pElement = document.createElement("p");
      pElement.className = "btn";

      const aElement = document.createElement("a");
      aElement.textContent = buttonName;
      // aElement を pElement に追加
      pElement.appendChild(aElement);
      // pElement を container に追加
      container.appendChild(pElement);

      aElement.setAttribute('onclick', `playSound(sound${count + 1})`);

      const audioElement = document.createElement("audio");
      audioElement.id = `sound${count + 1}`;
      audioElement.preload = "auto";

      const sourceElement = document.createElement("source");
      sourceElement.src = sourceFilePath;
      sourceElement.type = "audio/wav";

      audioElement.appendChild(sourceElement);
      container.appendChild(audioElement);
      count += 1;
    });
  });
}

// CSVファイルを読み込んで処理開始
readCSVFile(csvFileUrl);
