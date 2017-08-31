
// We get currency data from the server

class GetCurrencyData{
    constructor(){
        this.xhr = new XMLHttpRequest();
        this.currencyData = {};
    }

    // We send GET request to /data and then set data to callback

    getData(callback){
        let xhr = this.xhr;
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let currencyData = JSON.parse(xhr.responseText);
                callback(currencyData);
            }
        }.bind(this);
        xhr.open("GET", "/data", true);
        xhr.send();
    }

}



