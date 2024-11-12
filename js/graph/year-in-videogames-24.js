window.onload = function() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawVisualization);
};

function drawVisualization() {
    const rootStyles = getComputedStyle(document.documentElement);
    const font = rootStyles.getPropertyValue('--font').trim();

    const graphbaseprimary = rootStyles.getPropertyValue('--graph-base-primary').trim();
    const graphbasesecondary = rootStyles.getPropertyValue('--graph-base-secondary').trim();
    const graphhighlightprimary = rootStyles.getPropertyValue('--graph-highlight-primary').trim();
    const graphhighlightsecondary = rootStyles.getPropertyValue('--graph-highlight-secondary').trim();
    const graphhighlighttertiary = rootStyles.getPropertyValue('--graph-highlight-tertiary').trim();
    const colorPrimary = rootStyles.getPropertyValue('--color-primary').trim();
    const colorSecondary = rootStyles.getPropertyValue('--color-secondary').trim();
    
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Completati', 'Non Completati'],
        ['2024', 23, 12],
        ['2023', 39, 17],
        ['2022', 48, 25]]);

    var dynamicHeight = data.getNumberOfRows() * (50 + (3 * data.getNumberOfRows()));
    var options = { width: '100%', height: '100%',title: '',
        vAxis: {textStyle: { fontName: font, color: colorSecondary }},
        hAxis: {textStyle: { fontName: font, color: colorSecondary },gridlines: { color: graphbaseprimary },minorGridlines: { count: 0 }},
        legend: {textStyle: { fontName: font, color: colorSecondary }, position: 'bottom', alignment: 'center', maxLines: 10},
        series: {
            0: { color: graphhighlightprimary },
            1: { color: graphbaseprimary }
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
        ['2024', 23,4,7,1],
        ['2023', 39,6,7,4],
        ['2022', 48,11,8,6]]);

    var dynamicHeight = data.getNumberOfRows() * (50 + (3 * data.getNumberOfRows()));
    var options = { width: '100%', height: '100%',title: '',
        vAxis: {textStyle: { fontName: font, color: colorSecondary }},
        hAxis: {textStyle: { fontName: font, color: colorSecondary },gridlines: { color: graphbaseprimary },minorGridlines: { count: 0 }},
        legend: {textStyle: { fontName: font, color: colorSecondary }, position: 'bottom', alignment: 'center', maxLines: 10},
        series: {
            0: { color: graphhighlightprimary },
            1: { color: graphhighlightsecondary },
            2: { color: graphhighlighttertiary },
            3: { color: graphbaseprimary }
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