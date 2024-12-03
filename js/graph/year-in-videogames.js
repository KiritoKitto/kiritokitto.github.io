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
    
    const Completati = [
        ["Stato", "Numero"],
        ["Finiti", 8],  // Cambia i valori con i tuoi dati
        ["Non Finiti", 5],
    ];

    const data = google.visualization.arrayToDataTable(Completati);
    const options = {
        pieHole: 0.6,
        colors: ["#28a745", "#dc3545"], // Verde per finiti, rosso per non finiti
        pieSliceText: "none",
        legend: "none",
        tooltip: { trigger: "none" },
        chartArea: { width: "100%", height: "100%" },
        backgroundColor: { fill: 'transparent' },
        isStacked: 'percent',
    }

    const chart = new google.visualization.PieChart(document.getElementById("donut_chart"));
    chart.draw(data, options);

    // Aggiungi la percentuale al centro
    const total = Completati[1][1] + Completati[2][1];
    const percentComplete = ((Completati[1][1] / total) * 100).toFixed(1);

    document.getElementById("percentage").innerHTML = `${percentComplete}%`;
}