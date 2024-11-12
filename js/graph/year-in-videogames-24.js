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
        ['Year', 'Completed', 'Not Completed'],
        ['2024', 23, 12],
        ['2023', 39, 17],
        ['2022', 48, 25]
    ]);

    // Calcola l'altezza in base al numero di righe, moltiplicando per un valore base
    var dynamicHeight = data.getNumberOfRows() * (70 + (3 * data.getNumberOfRows()));

    var options = {
        width: '100%',
        height: '100%',
        title: '# of Completed Games',
        titleTextStyle: {
            fontSize: 24,
            bold: true,
            fontName: font,
            color: colorPrimary
        },
        vAxis: {
            title: '',
            textStyle: {
                fontName: font,
                color: colorSecondary
            }
        },
        hAxis: {
            title: '',
            textStyle: {
                fontName: font,
                color: colorSecondary
            }
        },
        legend: {
            position: 'bottom',
            alignment: 'center',
            maxLines: 10,
            textStyle: {
                fontName: font,
                color: colorPrimary
            }
        },
        series: {
            0: { color: graphbaseprimary },
            1: { color: graphbasesecondary }
        },
        backgroundColor: { fill: 'transparent' },
        isStacked: true,
        chartArea: {  // Configura l'area del grafico per sfruttare l'altezza dinamica
        	width: '90%',
            height: '80%',  // Mantieni circa l'80% dell'altezza per il grafico
            top: 60,
            bottom: 60
        }
    };

    // Imposta l'altezza del div del grafico in base all'altezza calcolata
    document.getElementById('chart_div').style.height = `${dynamicHeight}px`;

    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

window.addEventListener('resize', drawVisualization);