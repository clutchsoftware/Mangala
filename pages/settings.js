const { listenerCount } = require("events");
const fs = require("fs");

class Score {
  constructor(user_name, score, zorluk, zaman, rakip) {
    this.user_name = user_name;
    this.score = score;
    this.zorluk = zorluk;
    this.zaman = zaman;
    this.rakip = rakip;
    this.calcScore = Number(score) * Number(zorluk);
  }
  getMaxScore() {
    return this.calcScore;
  }
}
class Data {
  constructor(user_name, zorluk_setting, score_list) {
    this.user_name = user_name;
    this.score_list = score_list;
    this.zorluk_setting = zorluk_setting;
  }
  score_ekle(score) {
    score_list.push(score);
  }
  setUserName(user_name) {
    this.user_name = user_name;
  }
}
var score_list = [];

function readData() {
  // json dosyasını okur ve parse edilmis halini dondurur.
  var temp;
  var data;
  temp = fs.readFileSync("./data.json", { encoding: "utf8", flag: "r" });

  try {
    data = JSON.parse(temp);
  } catch (error) {
    console.log("readData() can not parse JSON", error, " on ->", temp);
    let rand = Math.floor(Math.random() * 100000) % user_name_list.length;
    data = new Data(user_name_list[rand], 1, []);
    writeData(data);
  }
  // console.log("51 tmep: ", temp);
  return data;
}

function writeData(data) {
  // nesneyi alır ne json haline cevirir ardından dosyaya yazar.
  // nesneyi alır ne json haline cevirir ardından dosyaya yazar.
  const jsonString = JSON.stringify(data);

  fs.writeFileSync("./data.json", jsonString);
}

/*
let a = new Score("muaz dervent", "12", "Hard", "simdi");
score_list.push(a);
var data = new Data("muaz dervent", score_list);*/
//var data;
var user_name_list = [
  "Barbaros",
  "Haydut",
  "Hürrem Sultan",
  "Kraliçe Elizabeth",
  "Fasulye",
];

function setUsername(u_name) {
  var data = readData();
  data.user_name = u_name;
  writeData(data);
}

function getUsername() {
  // Kullanıcı username'i getir
  var data = readData();
  return data.user_name;
}

function setZorlukSeviyesi(zorluk) {
  var data = readData();
  data.zorluk_setting = zorluk;
  writeData(data);
}
function getZorlukSetting() {
  var data = readData();
  return data.zorluk_setting;
}

function addScore(score, rakip) {
  var data = readData();
  var d = new Date();
  let a = new Score(
    data.user_name,
    score,
    data.zorluk_setting,
    d.getTime(),
    rakip
  );
  data.score_list.push(a);
  writeData(data);
}

function compare(a, b) {
  if (a.calcScore < b.calcScore) {
    return -1;
  }
  if (a.calcScore > b.calcScore) {
    return 1;
  }
  return 0;
}

function getScoreList() {
  let data = readData();
  return data.score_list;
}
function getSortScoreList() {
  let x = getScoreList();
  return x.sort(compare);
}

function updateSetting(isim, zorluk) {
  var data = readData();
  data.user_name = isim;
  data.zorluk_setting = zorluk;
  writeData(data);
}

module.exports = {
  getUsername,
  addScore,
  getZorlukSetting,
};
