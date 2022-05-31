
const btn = document.getElementById("btn");
const text = document.getElementById("api")
const tick = document.getElementById("ticker")
const tradingType = document.getElementById("style");
const history = document.getElementById("hist")
btn.addEventListener("click", () =>{
  
const url = `http://127.0.0.1:5000/${tradingType.value}?tick=${tick.value}&range=20&hist=${history.value}`;
fetch(url, {
  mode: 'cors'
})
.then(data=>{return data.text().then(text2 =>{
    var close_data = JSON.parse(text2).Close
    
    var data = parseData(close_data);
    var labels = data[0]
    var datum = data[1]
    plotData(labels, datum)
    

  })
  if (error !== null) {
        console.log('exec error: ' + error);
  }
  })
})

//add event listener for style.
// sma option needs a window for window to dynamically pop up.

function parseData(close_data){
  labels2 = []
  datum = []
  for (let [key, value] of Object.entries(close_data)){
    labels2.push(new Date(parseInt(key)));
    datum.push(value);
  }
  return [labels2, datum]
}

function plotData(labels, data){
  var trace1 = {
    x: labels,//#[1, 2, 3, 4],
    y: data,
    type: 'scatter'
  };
  
  var data = [trace1]//, trace2];

  Plotly.newPlot('myDiv', data);
  
}