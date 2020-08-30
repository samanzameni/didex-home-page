function drawWorldPriceCharts() {
  const elements = document.querySelectorAll(".charts__chartist-world-price");
  elements.forEach(function (el) {
    const chart = new Chartist.Line(
      el,
      {
        series: [[1, 5, 2, 9, 4, 3, 10]],
      },
      {
        low: 0,
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
  elements.forEach(function (el) {
    const chart = new Chartist.Line(
      el,
      {
        series: [[38, 46, 90, 37, 55, 58, 11, 75, 48, 52]],
      },
      {
        low: 0,
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

drawWorldPriceCharts();
drawLivePriceCharts();
