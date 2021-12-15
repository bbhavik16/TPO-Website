const ctx = document.getElementById('barchart')
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['COMP', 'IT', 'EXTC', 'EX', 'ELECT', 'MECH', 'CIVIL', 'PROD', 'TEX'],
        datasets: [{
            label: 'Average CTC',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],


            borderWidth: 1
        }],

    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        animations: {
            backgroundColor: {
                type: 'color',
                delay: 1000,
                duration: 5000,
                easing: 'easeInQuad',
                to: 'blue',
                from: 'lightGreen',
                loop: true,
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'BRANCH-WISE PLACEMENT',
                color: "black",
                padding: {
                    top: 10,
                    bottom: 5
                }
            },
            legend: {
                labels: {
                    boxWidth: 0,
                    color: "black",
                }
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                color: "black"
            }

        }

    }
});

