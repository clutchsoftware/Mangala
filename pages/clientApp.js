//client
const io = require("socket.io-client");

//Connect  http://localhost:3000
let game = io.connect("https://mangala-server.herokuapp.com/game");
//let game = io.connect("http://localhost:3000/game");

const username = "Kerim";

// server kontrol
game.on("welcome", (data) => {
  console.log(data);
});

// ODA OLUSTUR
//let randomKey = Math.random().toString(36).substr(2, 5); // odalar için random key
const odaOlusturContainer = document.getElementById("odaOlustur");
const odaOlusturBtn = document.getElementById("odaOlusturBtn");
odaOlusturBtn.onclick = () => {
  let elemt = document.createElement("p");
  //Server kısmında key adında oda olustur.
  console.log("girdi");
  game.emit("odaOlustur", randomKey);
  game.on("odaBasariliSekildeOlusturuldu", (odaninKeyDegeri) => {
    elemt.textContent = odaninKeyDegeri + " odası oluşturuldu.";
  });
  odaOlusturContainer.appendChild(elemt);
  let elemt2 = document.createElement("p");
  game.emit("joinRoom", randomKey, username);
  game.on("success", (key) => {
    elemt2.textContent = key + " odasına giriş yapıldı.";
  });
  game.on("err", (key) => {
    elemt2.textContent = key + " odasına giriş yapılamadı.";
  });
  odaOlusturContainer.appendChild(elemt2);

  let elemt3 = document.createElement("p");
  game.on("newUser", (username) => {
    elemt3.textContent = username + " odaya katıldı.";
  });
  odaOlusturContainer.appendChild(elemt3);
};

// ODAYA KATIL
const odayaKatilContainer = document.getElementById("odayaKatil");
const odayaKatilBtn = document.getElementById("odayaKatilBtn");
const odayaKatilInput = document.getElementById("odayaKatilInput");
odayaKatilBtn.onclick = () => {
  let roomKey = odayaKatilInput.value;
  game.emit("joinRoom", roomKey, "Muaz"); //username dinamik olmalı!
  let elemt = document.createElement("p");
  game.on("success", (roomKey) => {
    elemt.textContent = roomKey + " odasına giriş yapıldı.";
  });
  game.on("err", (roomKey) => {
    elemt.textContent = roomKey + " odasına giriş yapılamadı.";
  });
  odayaKatilContainer.appendChild(elemt);
};

// ODADAN AYRIL
const odadanAyrilBtn = document.getElementById("odadanAyrilBtn");
odadanAyrilBtn.onclick = () => {
  let roomKey = odayaKatilInput.value;
  game.emit("disconnection", roomKey);
  let elemt = document.createElement("p");

  game.on("disconnectionRoom", (key) => {
    elemt.textContent = key + " odasından ayrıldın.";
  });
  odayaKatilContainer.appendChild(elemt);
};

// MESAJ YOLLAMA <OdayaKatıl>
function sendMessage() {
  let odayaKatilInput = document.getElementById("odayaKatilInput");
  let roomKey = odayaKatilInput.value; // Odaya katıl alanı için etkin
  let input = document.getElementById("mesajGonderOdayaKatilInput");
  let msg = input.value;
  input.value = "";
  game.emit("newMsg", "Muaz", msg, roomKey);
}
const mesajGonderBtnOdayaKatil = document.getElementById(
  "mesajGonderBtnOdayaKatil"
);
mesajGonderBtnOdayaKatil.onclick = () => {
  sendMessage();
};

// MESAJI ALMA <OdaOlustur>
function addMessage(container, username, msg) {
  let elemt = document.createElement("p");
  elemt.textContent = `${username}:${msg}`;
  container.appendChild(elemt);
}

game.on("newMessage", (username, msg) => {
  console.log(`newMessage...: "${username}" kisisinden "${msg}" mesajı geldi.`);
  addMessage(odaOlusturContainer, username, msg);
});
