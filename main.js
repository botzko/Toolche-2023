let b = document.querySelector(".b");
let e = document.querySelector(".e");
let cb = document.querySelector(".cb");
let ce = document.querySelector(".ce");

const msg = {  
    "event":"subscribe",
    "feed":"ticker",
    "product_ids":[  
        "PF_XBTUSD",
        "PI_ETHUSD"
    ]
}


webSocket = new WebSocket("wss://futures.kraken.com/ws/v1");
webSocket.onmessage = function (event) {
    console.log(event.data);
    console.log(JSON.parse(event.data).product_id);
    if(JSON.parse(event.data).product_id == "PF_XBTUSD"){
        b.innerHTML = parseFloat(JSON.parse(event.data).markPrice).toFixed(2);
        cb.innerHTML = parseFloat(JSON.parse(event.data).change).toFixed(2)+"%";
        if(JSON.parse(event.data).change>0){
            cb.classList.add("g");    
        }else{
            cb.classList.remove("g");
        }
    }else{
        e.innerHTML = parseFloat(JSON.parse(event.data).markPrice).toFixed(2);
        ce.innerHTML = parseFloat(JSON.parse(event.data).change).toFixed(2)+"%";
        if(JSON.parse(event.data).change>0){
            ce.classList.add("g");    
        }else{
            ce.classList.remove("g");
        }
    }
}


webSocket.onopen = function(event) {
    webSocket.send(JSON.stringify(msg));
}