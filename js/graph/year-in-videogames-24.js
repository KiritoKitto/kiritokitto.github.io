google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
    // Recupera i colori dalle variabili CSS
    const rootStyles = getComputedStyle(document.documentElement);

    const graphbaseprimary = rootStyles.getPropertyValue('--graph-base-primary').trim();
    const graphbasesecondary = rootStyles.getPropertyValue('--graph-base-secondary').trim();
    const graphhighlightprimary = rootStyles.getPropertyValue('--graph-highlight-primary').trim();
    const graphhighlightsecondary = rootStyles.getPropertyValue('--graph-highlight-secondary').trim();
    const font = rootStyles.getPropertyValue('--font').trim();  // Aggiungi la variabile font
    const colorPrimary = rootStyles.getPropertyValue('--color-primary').trim();  // Colore primario
    const colorSecondary = rootStyles.getPropertyValue('--color-secondary').trim();  // Colore secondario

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
            fontName: font,
            color: colorPrimary  // Colore del titolo
        },
        vAxis: {
            title: '# of Games',
            titleTextStyle: {
                fontName: font,
                color: colorPrimary  // Colore del titolo asse verticale primario
            },
            textStyle: {
                fontName: font,
                color: colorSecondary  // Colore del testo dell'asse verticale primario
            }
        },
        vAxes: {  // Modifica vAxes per aggiungere il secondo asse
            0: {
                title: '# of Games',
                titleTextStyle: {
                    fontName: font,
                    color: colorPrimary  // Colore del titolo asse verticale primario
                },
                textStyle: {
                    fontName: font,
                    color: colorSecondary  // Colore del testo dell'asse verticale primario
                }
            },
            1: {  // Definisce il secondo asse verticale
                title: 'Average',
                titleTextStyle: {
                    fontName: font,
                    color: colorPrimary  // Colore del titolo del secondo asse
                },
                textStyle: {
                    fontName: font,
                    color: colorSecondary  // Colore del testo del secondo asse
                },
                viewWindow: {
                    min: 6,  // Imposta il range da 6 a 8
                    max: 8
                }
            }
        },
        hAxis: {
            title: 'Year',
            titleTextStyle: {
                fontName: font,
                color: colorPrimary  // Colore del titolo asse orizzontale
            },
            textStyle: {
                fontName: font,
                color: colorSecondary  // Colore del testo dell'asse orizzontale
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
                fontName: font,
                color: colorPrimary  // Colore della legenda
            },
            maxLines: 3,  // Limita a 3 righe nella legenda (puoi aumentare se necessario)
            layout: 'vertical'  // Permette di fare andare a capo la legenda
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

window.addEventListener('resize', drawVisualization);
document.getElementById("theme-link-switcher").addEventListener("click", drawVisualization);