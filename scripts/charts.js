let chartsData = [
  {
    symbol: "BTC/USDT",
    symbolIRR: "BTC/IRR",
    iconURL: "https://www.cryptocompare.com/media/19633/btc.png",
    apiURL:
      "https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USDT&limit=24",
    irrURL: "https://mdp.didex.com/marketdata/btc",
    data: [],
    dataIRR: [],
    change: 0,
    changeIRR: 0,
    volume: 0,
    volumeIRR: 0,
  },
  {
    symbol: "ETH/USDT",
    symbolIRR: "ETH/IRR",
    iconURL: "https://www.cryptocompare.com//media/20646/eth_logo.png",
    apiURL:
      "https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USDT&limit=24",
    irrURL: "https://mdp.didex.com/marketdata/eth",
    data: [],
    dataIRR: [],
    change: 0,
    changeIRR: 0,
    volume: 0,
    volumeIRR: 0,
  },
  {
    symbol: "DASH/USDT",
    symbolIRR: "DASH/IRR",
    iconURL: "https://www.cryptocompare.com//media/33842920/dash.png",
    apiURL:
      "https://min-api.cryptocompare.com/data/v2/histohour?fsym=DASH&tsym=USDT&limit=24",
    irrURL: "https://mdp.didex.com/marketdata/dash",
    data: [],
    dataIRR: [],
    change: 0,
    changeIRR: 0,
    volume: 0,
    volumeIRR: 0,
  },
  {
    symbol: "BCH/USDT",
    symbolIRR: "BCH/IRR",
    iconURL: "https://www.cryptocompare.com//media/35650680/bch.png",
    apiURL:
      "https://min-api.cryptocompare.com/data/v2/histohour?fsym=BCH&tsym=USDT&limit=24",
    irrURL: "https://mdp.didex.com/marketdata/bch",
    data: [],
    dataIRR: [],
    change: 0,
    changeIRR: 0,
    volume: 0,
    volumeIRR: 0,
  },
];

function getWorldChartsData() {
  chartsData.forEach(function (chartData, index) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(xhr.response);
        // const data = !window.location.hostname.endsWith(".ir")
        //   ? res.data.data
        //   : res.Data.Data;
        chartData.data = res.Data.Data.map(function (d) {
          return d.high;
        }).filter(function (d, i) {
          return [0, 4, 9, 13, 17, 20, 23].includes(i);
        });

        drawWorldPriceCharts();
        // drawLivePriceCharts();
        updateAJAXLoaders();
      }
    };
    // const url = !window.location.hostname.endsWith(".ir")
    //   ? chartData.irrURL
    //   : chartData.apiURL;
    xhr.open("GET", chartData.apiURL, true);
    xhr.send();
  });
}

function getLiveChartsData() {
  if (window.location.hostname.endsWith(".ir")) {
    chartsData.forEach(function (chartData, index) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(xhr.response);
          chartData.dataIRR = res.data.data
            .map(function (d) {
              return d.high;
            })
            .filter(function (d, i) {
              return [0, 4, 9, 13, 17, 20, 23].includes(i);
            });

          drawLivePriceCharts();
          updateAJAXLoaders();
        }
      };

      xhr.open("GET", chartData.irrURL, true);
      xhr.send();
    });
  } else {
    chartsData.forEach(function (chartData, index) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(xhr.response);

          chartData.data = res.Data.Data.map(function (d) {
            return d.high;
          }).filter(function (d, i) {
            return [0, 4, 9, 13, 17, 20, 23].includes(i);
          });

          drawLivePriceCharts();
          updateAJAXLoaders();
        }
      };

      xhr.open("GET", chartData.apiURL, true);
      xhr.send();
    });
  }
}

function drawWorldPriceCharts() {
  const elements = document.querySelectorAll(".charts__chartist-world-price");
  const cards = document.querySelectorAll(".charts__chart-card");
  elements.forEach(function (el, i) {
    if (chartsData[i].data.length > 0) {
      const chart = new Chartist.Line(
        el,
        {
          series: [chartsData[i].data],
        },
        {
          low:
            chartsData[i].data.length > 0 ? Math.min(...chartsData[i].data) : 0,
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

      const normalizedSymbol = chartsData[i].symbol.split("/").join("");
      const sign = Math.sign(
        chartsData[i].data[chartsData[i].data.length - 1] -
          chartsData[i].data[0]
      );
      const val =
        chartsData[i].data[chartsData[i].data.length - 1] /
        chartsData[i].data[0];

      chartsData[i].change = sign * val;
      chartsData[i].volume = chartsData[i].data[chartsData[i].data.length - 1];

      window.AJAX_DATA_DICT[`change_${normalizedSymbol}`] =
        chartsData[i].change.toFixed(3) + "%";

      window.AJAX_DATA_DICT[`volume_${normalizedSymbol}`] =
        chartsData[i].data[chartsData[i].data.length - 1];

      window.AJAX_DATA_DICT[`icon_${normalizedSymbol}`] = chartsData[i].iconURL;

      window.AJAX_DATA_DICT[`symbol_${normalizedSymbol}`] =
        chartsData[i].symbol;

      cards[i].classList.remove("positive-change");
      cards[i].classList.remove("negative-change");
      cards[i].classList.add(
        Math.sign(chartsData[i].change) === -1
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
    }
  });
}

function drawLivePriceCharts() {
  const elements = document.querySelectorAll(".prices__chartist-live-price");
  const cards = document.querySelectorAll(".prices__price-card");

  cards.forEach(function (el, i) {
    if (chartsData[i].dataIRR.length > 0) {
      const normalizedSymbol = chartsData[i].symbol.split("/").join("");
      const sign = Math.sign(
        chartsData[i].dataIRR[chartsData[i].dataIRR.length - 1] -
          chartsData[i].dataIRR[0]
      );
      const val =
        chartsData[i].dataIRR[chartsData[i].dataIRR.length - 1] /
        chartsData[i].dataIRR[0];

      chartsData[i].changeIRR = sign * val;
      chartsData[i].volumeIRR =
        chartsData[i].dataIRR[chartsData[i].dataIRR.length - 1];

      window.AJAX_DATA_DICT[`symbolLive_${normalizedSymbol}`] =
        chartsData[i].symbolIRR;

      window.AJAX_DATA_DICT[`changeLive_${normalizedSymbol}`] =
        chartsData[i].changeIRR.toFixed(3) + "%";

      window.AJAX_DATA_DICT[`volumeLive_${normalizedSymbol}`] =
        chartsData[i].dataIRR[chartsData[i].dataIRR.length - 1];

      cards[i].classList.remove("positive-change");
      cards[i].classList.remove("negative-change");
      cards[i].classList.add(
        Math.sign(chartsData[i].change) === -1
          ? "negative-change"
          : "positive-change"
      );
    } else {
      const normalizedSymbol = chartsData[i].symbol.split("/").join("");
      const sign = Math.sign(
        chartsData[i].data[chartsData[i].data.length - 1] -
          chartsData[i].data[0]
      );
      const val =
        chartsData[i].data[chartsData[i].data.length - 1] /
        chartsData[i].data[0];

      chartsData[i].change = sign * val;
      chartsData[i].volume = chartsData[i].data[chartsData[i].data.length - 1];

      window.AJAX_DATA_DICT[`symbolLive_${normalizedSymbol}`] =
        chartsData[i].symbol;

      window.AJAX_DATA_DICT[`changeLive_${normalizedSymbol}`] =
        chartsData[i].change.toFixed(3) + "%";

      window.AJAX_DATA_DICT[`volumeLive_${normalizedSymbol}`] =
        chartsData[i].data[chartsData[i].data.length - 1];

      cards[i].classList.remove("positive-change");
      cards[i].classList.remove("negative-change");
      cards[i].classList.add(
        Math.sign(chartsData[i].change) === -1
          ? "negative-change"
          : "positive-change"
      );
    }
  });
}

getWorldChartsData();
getLiveChartsData();
