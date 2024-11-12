google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
    const rootStyles = getComputedStyle(document.documentElement);
    const graphbaseprimary = rootStyles.getPropertyValue('--graph-base-primary').trim();
    const graphbasesecondary = rootStyles.getPropertyValue('--graph-base-secondary').trim();
    const font = rootStyles.getPropertyValue('--font').trim();
    const colorPrimary = rootStyles.getPropertyValue('--color-primary').trim();
    const colorSecondary = rootStyles.getPropertyValue('--color-secondary').trim();

    var data = google.visualization.arrayToDataTable([
        ['Year', 'Completed', 'Not Completed'],  // Rimosso 'Average'
        ['2022', 48, 25],
        ['2023', 39, 17],
        ['2024', 23, 12]
    ]);

    var options = {
        title: 'Score Average',
        titleTextStyle: {
            fontSize: 24,
            bold: true,
            fontName: font,
            color: colorPrimary
        },
        vAxis: {
            title: '',
            textStyle: { fontName: font, olor: colorSecondary }
        },
        hAxis: {
            title: '',
            textStyle: { fontName: font, olor: colorSecondary }
        },
        legend: {
            position: 'bottom',
            alignment: 'center',
            maxLines: 10,
            textStyle: { fontName: font, olor: colorSecondary }
        },
        series: {
            0: { color: graphbaseprimary },
            1: { color: graphbasesecondary }
        },
        backgroundColor: { fill: 'transparent' },
        isStacked: true
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

window.addEventListener('resize', drawVisualization);
