google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
    // Recupera i colori dalle variabili CSS
    const rootStyles = getComputedStyle(document.documentElement);

    const graphbaseprimary = rootStyles.getPropertyValue('--graph-base-primary').trim();
    const graphbasesecondary = rootStyles.getPropertyValue('--graph-base-secondary').trim();
    const graphhighlightprimary = rootStyles.getPropertyValue('--graph-highlight-primary').trim();
    const graphhighlightsecondary = rootStyles.getPropertyValue('--graph-highlight-secondary').trim();

    var data = google.visualization.arrayToDataTable([
        ['Year', 'Completed', 'Not Completed', 'Average'],
        ['2022', 48, 25, 7.0],
        ['2023', 39, 17, 7.2],
        ['2024', 23, 12, 7.6]
    ]);

    var options = {
        title: 'Score Average',
        titleTextStyle: {
            fontSize: 24,
            bold: true
        },
        vAxis: {title: '# of Games'},
        hAxis: {title: 'Year'},
        seriesType: 'bars',
        series: {
            0: { color: graphbaseprimary },  // Colore primario del grafico
            1: { color: graphbasesecondary },  // Colore secondario del grafico
            2: { type: 'line', color: graphhighlightprimary, pointSize: 10, lineWidth: 3 }  // Linea con colore dinamico
        },
        legend: { position: 'bottom', alignment: 'center' },
        backgroundColor: { fill: 'transparent' },
        annotations: {
            textStyle: {
                fontSize: 12,
                bold: true,
                color: '#FFFFFF'
            },
            stem: {
                color: 'transparent'
            },
            alwaysOutside: true
        },
        isStacked: true
    };

    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

// Redraw chart on window resize
window.addEventListener('resize', drawVisualization);