var ctx2 = document.getElementById("chartContainer2").getContext("2d");
var newChart;

var sum = 0;
var sums = [];
var newChart;

var noofcluster = 10;

function loadData() {
  document.getElementById("noofcluster").value = noofcluster;
  sums = [];
  for (var i = 2; i < noofcluster; i++) {
    axios.get(`/calculate?id=${i}`).then(async res => {
      var ss = await 0;
      for (var j = 0; j < res.data.length; j++) {
        ss += await res.data[j].sum;
      }
      await sums.push(Math.trunc(ss));
    });
  }
}

$(document).ready(() => {
  var html = "";
  for (var i = 2; i < 102; i++) {
    html += `<option value="${i}">${i}</option>`;
  }
  document.getElementById("noofcluster").innerHTML = html;
  loadData();
});

async function makeChart() {
  var label = [];
  for (var i = 2; i < noofcluster; i++) {
    await label.push(i);
  }

  var mixedChart = new Chart(ctx2, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Sum of ",
          data: sums
        }
      ],
      labels: label
    },
    options: {
      title: {
        display: true,
        text: "Clustering of some random data"
      }
    }
  });
}

function cluster() {
  makeChart();
}

async function handlecluster() {
  var a = await document.getElementById("noofcluster").value;
  noofcluster = await a;
  loadData();
}
