var xValues = ['COMP', 'IT', 'EXTC', 'EX', 'ELECT', 'MECH', 'CIVIL', 'PROD', 'TEX'];
var yValues = piedata;
var barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145",
    "#FF00FF",
    "#40E0D0",
    "#ff7518",
    "#50C878"
];



new Chart("PieChart", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        plugins: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "No Of Eligible Students Selected"
            },
            hoverOffset: 6
        }
    }
});