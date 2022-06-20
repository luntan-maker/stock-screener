// const { range } = require("lodash");

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
const multiChartBtn = document.getElementById("multiChartButton")
const checkBox = document.getElementById("multigraph")
dateRange = ["1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "ytd", "max"]
intervalRange=["1m", "2m", "5m", "15m", "30m", "60m", "90m", "1h", "1d", "5d", "1wk", "1mo", "3mo"]


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

multiDataBtn.addEventListener("click", () => {


  var date = document.createElement("select")
  date.id="date"
  for (var i = 0; i < dateRange.length; i++){
    var option = document.createElement("option");
    option.value = dateRange[i];
    option.text = dateRange[i];
    date.appendChild(option)
  }

  var interval = document.createElement("select")
  interval.id="interval"
  for (var j = 0; j < intervalRange.length; j++){
    var option = document.createElement("option");
    option.value = intervalRange[j];
    option.text = intervalRange[j];
    interval.appendChild(option)
  }

  var intervalLabel = document.createElement("label")
  intervalLabel.innerHTML = "Interval range: " 

  var dateLabel = document.createElement("label")
  dateLabel.innerHTML = "Date range: " 

  var tickerLabel = document.createElement("label")
  tickerLabel.innerHTML = "Ticker: "
  var tickerInput = document.createElement("input")
  tickerInput.id="tick"


  var deleteButton = document.createElement("button")
  deleteButton.textContent = "Delete"
  deleteButton.addEventListener("click", (event)=>{
    event.target.parentNode.parentNode.removeChild(event.target.parentNode)
  })

  throwAwayDiv = document.createElement("div")

  var breakInContent = document.createElement("br")

  throwAwayDiv.appendChild(tickerLabel)
  throwAwayDiv.appendChild(tickerInput)
  throwAwayDiv.appendChild(dateLabel)
  throwAwayDiv.appendChild(date)
  throwAwayDiv.appendChild(intervalLabel)
  throwAwayDiv.appendChild(interval)
  throwAwayDiv.appendChild(deleteButton)
  throwAwayDiv.appendChild(breakInContent)
  slotMultiData.appendChild(throwAwayDiv)
})

multiSmaBtn.addEventListener("click", ()=>{

  var date = document.createElement("select")
  date.id="date"
  for (var i = 0; i < dateRange.length; i++){
    var option = document.createElement("option");
    option.value = dateRange[i];
    option.text = dateRange[i];
    date.appendChild(option)
  }

  var interval = document.createElement("select")
  interval.id="interval"
  for (var j = 0; j < intervalRange.length; j++){
    var option = document.createElement("option");
    option.value = intervalRange[j];
    option.text = intervalRange[j];
    interval.appendChild(option)
  }

  var intervalLabel = document.createElement("label")
  intervalLabel.innerHTML = "Interval range: " 

  var dateLabel = document.createElement("label")
  dateLabel.innerHTML = "Date range: " 

  var tickerLabel = document.createElement("label")
  tickerLabel.innerHTML = "Ticker: "
  var tickerInput = document.createElement("input")
  tickerInput.id="tick"

  var deleteButton = document.createElement("button")
  deleteButton.textContent = "Delete"
  deleteButton.addEventListener("click", (event)=>{
    event.target.parentNode.parentNode.removeChild(event.target.parentNode)
  })

  throwAwayDiv = document.createElement("div")

  rangeLabel = document.createElement("label")
  range=document.createElement("input")
  rangeLabel.innerHTML="SMA Range: "
  range.id="smaRange"

  var breakInContent = document.createElement("br")

  throwAwayDiv.appendChild(tickerLabel)
  throwAwayDiv.appendChild(tickerInput)
  throwAwayDiv.appendChild(dateLabel)
  throwAwayDiv.appendChild(date)
  throwAwayDiv.appendChild(intervalLabel)
  throwAwayDiv.appendChild(interval)
  throwAwayDiv.appendChild(rangeLabel)
  throwAwayDiv.appendChild(range)
  throwAwayDiv.appendChild(deleteButton)
  throwAwayDiv.appendChild(breakInContent)
  slotMultiSma.appendChild(throwAwayDiv)
})

multiChartBtn.addEventListener("click", () => {
  var labels = []
  var strings = []
  for (var i = 0; i<slotMultiData.childElementCount; i++){
    var childNode = slotMultiData.childNodes[i]
    var tick = childNode.querySelector("#tick").value
    var date = childNode.querySelector("#date").value
    var interval = childNode.querySelector("#interval").value
    var string = `http://127.0.0.1:5000/data?tick=${tick}&hist=${date}&interval=${interval}`
    var label = `${tick} ${date} ${interval} data`
    strings.push(string)
    labels.push(label)
  }
  for (var j = 0; j<slotMultiSma.childElementCount; j++){
    var childNode = slotMultiSma.childNodes[j]
    var tick = childNode.querySelector("#tick").value
    var date = childNode.querySelector("#date").value
    var interval = childNode.querySelector("#interval").value
    var range = childNode.querySelector("#smaRange").value
    var string = `http://127.0.0.1:5000/sma?tick=${tick}&range=${range}&hist=${date}&interval=${interval}`
    var label = `${tick} ${date} ${interval} sma`
    strings.push(string)
    labels.push(label)
  }

  
  datas = []
  strings.map(async (string) => {
    var temp = await fetch(string)
      .then(data=>{data.text()
        .then(text2 =>{
        datas.push(text2)
        if (datas.length == strings.length){
          handler(datas, labels)
        }
      }
      )})
})})


function handler(data, labels){
  console.log(data,labels)
  ret_arr = []
  for(var i =0; i< data.length; i++){
    var close_data = JSON.parse(data[i]).Close
    plotData = parseData(close_data)
    var trace1 = {
      x: plotData[0],
      y: plotData[1],
      name: labels[i],
      type: 'scatter'
    };
    ret_arr.push(trace1)
  }

  Plotly.newPlot('myDiv', ret_arr);

}