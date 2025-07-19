window.onload = function() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawVisualization);
};

function drawVisualization() {
    const rootStyles = getComputedStyle(document.documentElement);
    const font = rootStyles.getPropertyValue('--font').trim();
    const graph01 = rootStyles.getPropertyValue('--graph-base01').trim();
    const graph02 = rootStyles.getPropertyValue('--graph-base02').trim();
    const graph03 = rootStyles.getPropertyValue('--graph-base03').trim();
    const highlight = rootStyles.getPropertyValue('--graph-highlight').trim();
    const Primary = rootStyles.getPropertyValue('--color-primary').trim();
    const Secondary = rootStyles.getPropertyValue('--color-secondary').trim();
    
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Completati', 'Non Completati'],
        ['2024', 27, 14],
        ['2023', 39, 17],
        ['2022', 48, 25]]);
   
    var dynamicHeight = data.getNumberOfRows() * (50 + (3 * data.getNumberOfRows()));
    var options = { width: '100%', height: '100%',title: '',
        vAxis: {textStyle: { fontName: font, color: Secondary }},
        hAxis: {textStyle: { fontName: font, color: Secondary },gridlines: { color: graph01 },minorGridlines: { count: 0 }},
        legend: {textStyle: { fontName: font, color: Secondary }, position: 'bottom', alignment: 'start', maxLines: 10},
        series: {
            0: { color: highlight },
            1: { color: graph01 }
        },
        backgroundColor: { fill: 'transparent' },
        isStacked: true,
        chartArea: {width: '100%',height: '100%',
            bottom: 60,
            left: 35,
    }};

    document.getElementById('completed-games').style.height = `${dynamicHeight}px`;
    var chart = new google.visualization.BarChart(document.getElementById('completed-games'));
    chart.draw(data, options);

    // ----------------------
    // DIVISORE -------------
    // ----------------------

    var data = google.visualization.arrayToDataTable([
        ['Year', 'Completati', 'Senza Fine', 'In Pausa', 'Abbandonati'],
        ['2024', 27,8,4,2],
        ['2023', 39,6,7,4],
        ['2022', 48,11,8,6]]);

    var dynamicHeight = data.getNumberOfRows() * (50 + (3 * data.getNumberOfRows()));
    var options = { width: '100%', height: '100%',title: '',
        vAxis: {textStyle: { fontName: font, color: Secondary }},
        hAxis: {textStyle: { fontName: font, color: Secondary },gridlines: { color: graph01 },minorGridlines: { count: 0 }},
        legend: {textStyle: { fontName: font, color: Secondary }, position: 'bottom', alignment: 'start', maxLines: 10},
        series: {
            0: { color: highlight },
            1: { color: graph01 },
            2: { color: graph02 },
            3: { color: graph03 }
        },
        backgroundColor: { fill: 'transparent' },
        isStacked: 'percent',
        chartArea: {width: '100%',height: '100%',
            bottom: 60,
            left: 35,
    }};

    document.getElementById('percentage').style.height = `${dynamicHeight}px`;
    var chart = new google.visualization.BarChart(document.getElementById('percentage'));
    chart.draw(data, options);
}
window.addEventListener('resize', drawVisualization);
document.getElementById("theme-link-switcher").addEventListener("click", drawVisualization);