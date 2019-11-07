var ctx1 = document.getElementById("chartContainer1").getContext("2d");
// var ctx2 = document.getElementById("chartContainer2").getContext("2d");

var options = {
  responsive: true,
  maintainAspectRatio: false
};

var myChart;
var newChart;
var numberOfCluster = 10;
var sum = 0;

$(document).ready(function() {
  axios.get("/getData").then(res => {
    axios.get(`/calculate?id=${numberOfCluster}`).then(async res1 => {
  
      var html = "";
      for (var i = 1; i < 40; i++) {
        html += `<option value="${i + 1}">${i + 1}</option>`;
      }
      document.getElementById("choose").innerHTML = html;

      var data = [];

      data.push({
        label: "Population",
        data: res.data,
        borderColor: "#FFFF00",
        backgroundColor: "#FFFF00"
      });

      var dd = await [];
      for (var i = 0; i < res1.data.length; i++) {
        await dd.push({ x: res1.data[i].x, y: res1.data[i].y });
      }

      data.push({
        label: "Clusters",
        data: dd,
        borderColor: "#FF00FF",
        backgroundColor: "#FF00FF"
      });

      myChart = new Chart(ctx1, {
        type: "scatter",
        data: {
          datasets: data
        },
        options: options
      });
    });
  });
});

function emptyCluster() {
  for (var i = 0; i < numberOfCluster; i++) {
    myChart.data.datasets[1].data.pop();
  }
  myChart.update();
  numberOfCluster = 0;
}

async function updatecluster(data) {
  for (var i = 0; i < data.length; i++) {
    await myChart.data.datasets[1].data.push({
      x: data[i].x,
      y: data[i].y
    });
  }
  myChart.update();
}

async function changecluster() {
  emptyCluster();
  var cluster = document.getElementById("choose").value;
  numberOfCluster = cluster;
  axios.get(`/calculate?id=${cluster}`).then(async res => {
    updatecluster(res.data);
  });
}
