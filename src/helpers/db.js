import {db} from "../services/firebase";

export function readChats() {
    let array = [];
    db.ref('chats').on('value', snapshot => {
        snapshot.forEach(snap => {
            array.push(snap.val())
        });
        return array;
    });
}

export function writeChats(mssg) {
    return db.ref('chats').push({
        content: mssg.content,
        timestamp: mssg.timestamp,
        uid: mssg.uid
    });
}