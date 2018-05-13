const mongoClient = require('mongodb').MongoClient;
import socketio from 'socket.io';
import randomint from 'random-int';
import randomfloat from 'random-float';
const connection = closure => mongoClient.connect('mongodb://localhost:27017/test', (err, db)=> err? console.log(err) : closure(db));
var type = 0;
module.exports = server => {
    var io = socketio.listen(server);
    io.on('connection', socket => {
        socket.on('change-type', value => type = value);
        setInterval(()=>{
            connection(db => db.collection('test').find().toArray((err, result)=>{
                for(let i =0; i< result.length; i++){
                    let min_price = parseFloat(parseFloat(result[i].price) - parseFloat(result[i].price*5/100)).toFixed(2);
                    let max_price = parseFloat(parseFloat(result[i].price) + parseFloat(result[i].price*5/100)).toFixed(2);
                    result[i].price = randomfloat(parseFloat(min_price), parseFloat(max_price)).toFixed(2);
                    result[i].volume += randomint(10,30);
                    result[i].value = Math.round(result[i].price * result[i].volume);
                }
                let i=0;
                let loopUpdate = (m_id, m_price, m_volume, m_value) => db.collection('test').update({_id: m_id}, {$set: {price: m_price, volume: m_volume, value: m_value}})
                .then(()=>{
                  if(i < result.length) {
                    loopUpdate(result[i]._id, result[i].price, result[i].volume, result[i].value);
                    i++;
                  }
                  else{
                    if (type ===0) db.collection('test').find().limit(30).toArray((err, final_result)=>err? socket.emit('reload', false) : socket.emit('reload', final_result));
                    else if(type ===1)  db.collection('test').find().sort({value: -1}).limit(20).toArray((err, final_result)=>err? socket.emit('reload', false) : socket.emit('reload', final_result));
                    else db.collection('test').find().sort({value: 1}).limit(20).toArray((err, final_result)=>err? socket.emit('reload', false) : socket.emit('reload', final_result));
                }    
                }).catch();
                loopUpdate(result[i]._id, result[i].price, result[i].volume, result[i].value);
             }))
        }, 5000);
    })
    return io;
}