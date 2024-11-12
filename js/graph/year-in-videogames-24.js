google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
    // Recupera i colori dalle variabili CSS
    const rootStyles = getComputedStyle(document.documentElement);

    const graphbaseprimary = rootStyles.getPropertyValue('--graph-base-primary').trim();
    const graphbasesecondary = rootStyles.getPropertyValue('--graph-base-secondary').trim();
    const graphhighlightprimary = rootStyles.getPropertyValue('--graph-highlight-primary').trim();
    const graphhighlightsecondary = rootStyles.getPropertyValue('--graph-highlight-secondary').trim();

    const colorprimary = rootStyles.getPropertyValue('--color-primary').trim();
    const colorsecondary = rootStyles.getPropertyValue('--color-secondary').trim();

    const font = rootStyles.getPropertyValue('--font').trim();

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
            bold: true,
            fontName: font,  // Usa il font definito nella variabile
            color: colorprimary,
        },
        vAxis: {
            title: '# of Games',
            textStyle: {
                fontName: font,  // Applica il font agli assi
                color: colorsecondary,
            }
        },
        vAxis2: {  // Aggiungi il secondo asse verticale
            title: 'Average',
            textStyle: {
                fontName: font,
                color: colorsecondary,
            },
            viewWindow: {
                min: 0  // Imposta il minimo valore visibile sull'asse secondario (opzionale)
            }
        },
        hAxis: {
            title: 'Year',
            textStyle: {
                fontName: font,  // Applica il font agli assi
                color: colorsecondary,
            }
        },
        seriesType: 'bars',
        series: {
            0: { color: graphbaseprimary, targetAxisIndex: 0 },  // Colore per "Completed" e "Not Completed", usa il primo asse
            1: { color: graphbasesecondary, targetAxisIndex: 0 },  // Colore per "Not Completed", usa il primo asse
            2: { type: 'line', color: graphhighlightprimary, pointSize: 10, lineWidth: 3, targetAxisIndex: 1 }  // Linea per "Average", usa il secondo asse
        },
        legend: {
            position: 'bottom',
            alignment: 'center',
            textStyle: {
                fontName: font  // Applica il font alla legenda
            }
        },
        backgroundColor: { fill: 'transparent' },
        annotations: {
            textStyle: {
                fontSize: 12,
                bold: true,
                color: '#FFFFFF',
                fontName: font  // Applica il font alle annotazioni
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
document.getElementById("theme-link-switcher").addEventListener("click", drawVisualization);