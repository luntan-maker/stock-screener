// Ctrl+F5 to refresh the page in http-server .
const btn = document.getElementById("btn");
const text = document.getElementById("api")
const tick = document.getElementById("ticker")
const tradingType = document.getElementById("style");
const history = document.getElementById("hist")
const interval = document.getElementById("inter")

const multiDataBtn = document.getElementById("addData")
const slotMultiData = document.getElementById("slotForData")

const multiSmaBtn = document.getElementById("addSMA")
const slotMultiSma = document.getElementById("slotForSMA")


btn.addEventListener("click", async () =>{
  console.log("Hello")
  url=""
  console.log(tradingType.value)
  if (tradingType.value=="sma"){
    smaRange = document.getElementById("rangeOf")
    url = `http://127.0.0.1:5000/${tradingType.value}?tick=${tick.value}&range=${smaRange.value}&hist=${history.value}&interval=${interval.value}`;
  } else if(tradingType.value == "data"){
    url = `http://127.0.0.1:5000/${tradingType.value}?tick=${tick.value}&hist=${history.value}&interval=${interval.value}`;
  } else{
    alert("Nothing was caught for selection!")
    // url = ""
  }
  await fetch(url, {
    mode: 'cors'
  })
  .then(data=>{return data.text().then(text2 =>{
      var close_data = JSON.parse(text2).Close
      console.log(close_data)
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
tradingType.addEventListener("change", () => {
  const extra_stuff = document.getElementById("extraOptions")
  if(tradingType.value == "sma"){
    extra_stuff.innerHTML=""
    label = document.createElement("label")
    range=document.createElement("input")
    label.innerHTML="SMA Range: "
    range.id="rangeOf"
    extra_stuff.appendChild(label)
    extra_stuff.appendChild(range)
  } else if (tradingType.value == "data"){
    extra_stuff.innerHTML=""

  }

})
// Check boxes for multiple plots at the same time?


function parseData(close_data){
  // console.log(close_data)
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

const checkBox = document.getElementById("multigraph")

checkBox.addEventListener("change", () => {
  singleChart = document.getElementById("singleChart")
  multiChart = document.getElementById("multiChart")
  if(checkBox.checked){
    // singleChart.style.height = "0px"
    singleChart.style.display="none"
    multiChart.style.display="block"
    
  } else{
    singleChart.style.display="block"
    multiChart.style.display="none"
    

  }
})

dateRange = ["1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "ytd", "max"]
intervalRange=["1m", "2m", "5m", "15m", "30m", "60m", "90m", "1h", "1d", "5d", "1wk", "1mo", "3mo"]
multiDataBtn.addEventListener("click", () => {
  

  date = document.createElement("select")
  for (var i = 0; i < dateRange.length; i++){
    var option = document.createElement("option");
    option.value = dateRange[i];
    option.text = dateRange[i];
    date.appendChild(option)
  }

  interval = document.createElement("select")
  for (var j = 0; j < intervalRange.length; j++){
    var option = document.createElement("option");
    option.value = intervalRange[i];
    option.text = intervalRange[i];
    interval.appendChild(option)
  }

  slotMultiData.appendChild(date)
  slotMultiData.appendChild(interval)
})

multiSmaBtn.addEventListener("click", ()=>{
  alert("SMA")
})