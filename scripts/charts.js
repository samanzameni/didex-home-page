let chartsData = [
  {
    symbol: "BTC/USDT",
    iconURL: "https://www.cryptocompare.com/media/19633/btc.png",
    apiURL:
      "https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USDT&limit=24",
    data: [],
    change: 0,
    volume: 0,
  },
  {
    symbol: "ETH/USDT",
    iconURL: "https://www.cryptocompare.com//media/20646/eth_logo.png",
    apiURL:
      "https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USDT&limit=24",
    data: [],
    change: 0,
    volume: 0,
  },
  {
    symbol: "DASH/USDT",
    iconURL: "https://www.cryptocompare.com//media/33842920/dash.png",
    apiURL:
      "https://min-api.cryptocompare.com/data/v2/histohour?fsym=DASH&tsym=USDT&limit=24",
    data: [],
    change: 0,
    volume: 0,
  },
  {
    symbol: "BCH/USDT",
    iconURL: "https://www.cryptocompare.com//media/35650680/bch.png",
    apiURL:
      "https://min-api.cryptocompare.com/data/v2/histohour?fsym=BCH&tsym=USDT&limit=24",
    data: [],
    change: 0,
    volume: 0,
  },
];

function getChartsData() {
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

        drawWorldPriceCharts();
        drawLivePriceCharts();
        updateAJAXLoaders();
      }
    };
    xhr.open("GET", chartData.apiURL, true);
    xhr.send();
  });
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

      AJAX_DATA_DICT[`change_${normalizedSymbol}`] =
        chartsData[i].change.toFixed(3) + "%";

      AJAX_DATA_DICT[`volume_${normalizedSymbol}`] =
        chartsData[i].data[chartsData[i].data.length - 1];

      AJAX_DATA_DICT[`icon_${normalizedSymbol}`] = chartsData[i].iconURL;

      AJAX_DATA_DICT[`symbol_${normalizedSymbol}`] = chartsData[i].symbol;

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

getChartsData();
