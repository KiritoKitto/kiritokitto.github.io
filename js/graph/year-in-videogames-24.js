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
    const colorPrimary = rootStyles.getPropertyValue('--color-primary').trim();
    const colorSecondary = rootStyles.getPropertyValue('--color-secondary').trim();
    
    drawCompletedGames();
    drawPercentage();
}

function drawCompletedGames() {
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Completed', 'Not Completed'],
        ['2024', 23, 12],
        ['2023', 39, 17],
        ['2022', 48, 25]
    ]);

    var dynamicHeight = data.getNumberOfRows() * (50 + (3 * data.getNumberOfRows()));

    var options = {
        width: '100%',
        height: '100%',
        title: '',
        vAxis: {
            title: '',
            textStyle: { fontName: font, color: colorSecondary }
        },
        hAxis: {
            title: '',
            textStyle: { fontName: font, color: colorSecondary },
            gridlines: { color: graphbaseprimary },
            minorGridlines: { count: 0 }
        },
        legend: {
            position: 'bottom',
            alignment: 'center',
            maxLines: 10,
            textStyle: { fontName: font, color: colorSecondary }
        },
        series: {
            0: { color: graphhighlightprimary },
            1: { color: graphbaseprimary }
        },
        backgroundColor: { fill: 'transparent' },
        isStacked: true,
        chartArea: {
            width: '100%',
            height: '100%',
            bottom: 60,
            left: 35,
        }
    };

    document.getElementById('completed-games').style.height = `${dynamicHeight}px`;

    var chart = new google.visualization.BarChart(document.getElementById('completed-games'));
    chart.draw(data, options);
}

function drawPercentage() {
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Completed', 'Not Completed'],
        ['2024', 23, 12],
        ['2023', 39, 17],
        ['2022', 48, 25]
    ]);

    var dynamicHeight = data.getNumberOfRows() * (50 + (3 * data.getNumberOfRows()));

    var options = {
        width: '100%',
        height: '100%',
        title: '',
        vAxis: {
            title: '',
            textStyle: { fontName: font, color: colorSecondary }
        },
        hAxis: {
            title: '',
            textStyle: { fontName: font, color: colorSecondary },
            gridlines: { color: graphbaseprimary },
            minorGridlines: { count: 0 }
        },
        legend: {
            position: 'bottom',
            alignment: 'center',
            maxLines: 10,
            textStyle: { fontName: font, color: colorSecondary }
        },
        series: {
            0: { color: graphhighlightprimary },
            1: { color: graphbaseprimary }
        },
        backgroundColor: { fill: 'transparent' },
        isStacked: true,
        chartArea: {
            width: '100%',
            height: '100%',
            bottom: 60,
            left: 35,
        }
    };

    document.getElementById('percentage').style.height = `${dynamicHeight}px`;

    var chart = new google.visualization.BarChart(document.getElementById('percentage'));
    chart.draw(data, options);
}

window.addEventListener('resize', drawVisualization);
document.getElementById("theme-link-switcher").addEventListener("click", drawVisualization);