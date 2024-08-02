const roomList = require('../src/data/roomsData.json');
const fs = require('fs');

const Header = "Id,Number,Availability,Type,Description,Offer,Price,Discount,Cancellation\n"
let Body = "";

roomList.sort((a,b) => {
    let value = 0;
    if(a.price < b.price)
        value = 1;
    else if(a.price > b.price)
        value = -1;

    return value;
});

roomList.forEach(room => {
    Body += `${room.id},${room.roomNumber},${room.availability},${room.roomType},${room.description},
    ${room.offer},${room.price},${room.discount},${room.cancellation}\n`;
})

fs.writeFileSync('./test_file.txt', Header+Body)