let chartsData = [];
const symbols = ["BTC/USDT", "ETH/USDT", "DASH/USDT", "BCH/USDT"];
const logos = [
  "https://www.cryptocompare.com/media/19633/btc.png",
  "https://www.cryptocompare.com//media/20646/eth_logo.png",
  "https://www.cryptocompare.com//media/33842920/dash.png",
  "https://www.cryptocompare.com//media/35650680/bch.png",
];

function getChartsData() {
  const urls = [
    "https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USDT&limit=24",
    "https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USDT&limit=24",
    "https://min-api.cryptocompare.com/data/v2/histohour?fsym=DASH&tsym=USDT&limit=24",
    "https://min-api.cryptocompare.com/data/v2/histohour?fsym=BCH&tsym=USDT&limit=24",
  ];

  chartsData = [];

  urls.forEach(function (url) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(xhr.response);
        chartsData.push(
          res.Data.Data.map(function (d) {
            return d.high;
          }).filter(function (d, i) {
            return [0, 4, 9, 13, 17, 20, 23].includes(i);
          })
        );

        if (chartsData.length === 4) {
          drawWorldPriceCharts();
          drawLivePriceCharts();
          updateAJAXLoaders();
        }
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  });
}

function drawWorldPriceCharts() {
  const elements = document.querySelectorAll(".charts__chartist-world-price");
  const cards = document.querySelectorAll(".charts__chart-card");
  elements.forEach(function (el, i) {
    const chart = new Chartist.Line(
      el,
      {
        series: [chartsData[i]],
      },
      {
        low: Math.min(...chartsData[i]),
        showArea: true,
        showPoint: false,
        fullWidth: false,
        chartPadding: 0,
        axisX: {
          showLabel: false,
          showGrid: false,
        },
        axisY: {
          showLabel: true,
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
        }),
      }
    );

    AJAX_DATA_DICT["change" + (i + 1)] =
      (Math.sign(chartsData[i][6] - chartsData[i][0]) === -1 ? "-" : "+") +
      (chartsData[i][6] / chartsData[i][0]).toFixed(3) +
      "%";

    AJAX_DATA_DICT["volume" + (i + 1)] = chartsData[i][6];

    cards[i].classList.remove("positive-change");
    cards[i].classList.remove("negative-change");
    cards[i].classList.add(
      Math.sign(chartsData[i][6] - chartsData[i][0]) === -1
        ? "negative-change"
        : "positive-change"
    );

    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 1000 * data.index,
            dur: 1000,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      }
    });
  });
}

function drawLivePriceCharts() {
  const elements = document.querySelectorAll(".prices__chartist-live-price");
  const cards = document.querySelectorAll(".prices__price-card");
  elements.forEach(function (el, i) {
    const chart = new Chartist.Line(
      el,
      {
        series: [chartsData[i]],
      },
      {
        low: Math.min(...chartsData[i]),
        showArea: false,
        showPoint: false,
        fullWidth: false,
        chartPadding: 0,
        axisX: {
          showLabel: false,
          showGrid: false,
        },
        axisY: {
          showLabel: false,
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
        }),
      }
    );

    cards[i].classList.remove("positive-change");
    cards[i].classList.remove("negative-change");
    cards[i].classList.add(
      Math.sign(chartsData[i][6] - chartsData[i][0]) === -1
        ? "negative-change"
        : "positive-change"
    );

    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 1000 * data.index,
            dur: 1000,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      }
    });
  });
}

getChartsData();
