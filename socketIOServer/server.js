// Server Side
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const http = require("http").createServer(app);

const io = require("socket.io")(http);

var gameRooms = []; // Kullanıcıların oluşturmuş oldukları odalar

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.of("/game").on("connection", (socket) => {
  socket.emit("welcome", "hello to <namespcaess>");

  // Oda Oluşturma
  socket.on("odaOlustur", function (roomKey) {
    gameRooms.push(roomKey); //oda için oluşturulan key
    console.log(`odaOlustur..: "${roomKey}" odasi olusturuldu.`);
    return socket.emit("odaBasariliSekildeOlusturuldu", roomKey);
  });

  // Odaya katılma
  socket.on("joinRoom", (roomKey, username) => {
    if (gameRooms.includes(roomKey)) {
      socket.join(roomKey);
      io.of("/game").in(roomKey).emit("newUser", username); //odaya biri girdiğinde tetiklenir
      console.log(
        `joinRoom..: "${roomKey}" odasina "${username}" giris yapti.`
      );
      return socket.emit("success", roomKey);
    } else {
      console.log(
        `joinRoom..: "${roomKey}" odasina "${username}" giris yaptilamadi.`
      );
      return socket.emit("err", roomKey);
    }
  });

  // Odadan ayrılma
  //? username
  socket.on("disconnection", (roomKey) => {
    console.log(`disconnection...: "${roomKey}" odasindan ayrildi.`);
    let index = gameRooms.indexOf(roomKey); //roomKey'e ait index değeri
    if (index > -1) {
      gameRooms.splice(index, 1); // odadan ayrilma gerceklestiginde oda silinir
    }
    return socket.emit("disconnectionRoom", roomKey);
  });

  //Mesaj gönderme
  socket.on("newMsg", (username, msg, roomKey) => {
    console.log(
      `newMsg...: "${username}" kisisinden "${roomKey}" odasindan "${msg}" mesaji yollandi.`
    );
    socket.broadcast.to(roomKey).emit("newMessage", msg); //oda içindeki her user için gönderilir.
  });
});

http.listen(port, () => {
  console.log(`Server is on http://localhost:${port}`);
});
