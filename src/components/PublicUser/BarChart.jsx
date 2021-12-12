import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const BarChart = () => {
	let labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return (
		<Bar
			data={{
				labels: labels,
				datasets: [{
					label: 'My First Dataset',
					// data: [65, 59, 80, 81, 56, 55, 40],
					data: [1, 5, 7, 3, 8, 12, 6, 1, 4, 8, 5, 2],
					backgroundColor: [
						'"#2563EB"',
					],
				}]
			}}
			width={600}
			height={500}
			options={{
				responsive: true,
				animation: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: {
						ticks: {
							beginAtZero: true,
							font: { size: 14 },
						},
						grid: { display: false },
					},
					xAxes: {
						grid: { display: false },
					},
				},
				plugins: {
					legend: {
						labels: {
							font: { size: 16 },
							boxHeight: 15,
							boxWidth: 15,
							padding: 0,
							usePointStyle: true,
							padding: 5,
						},
						align: "start",
						maxWidth: 200,
						maxHeight: 50,
					},
					title: {
						display: true,
						text: "Complaint",
						font: { size: 18 },
						position: "top",
						align: "start",
						padding: { top: 10, bottom: 5 },
					},
					tooltip: {
						padding: 16,
						bodyFont: { size: 16 },
					},
				},
			}}
		/>
	);
};

export default BarChart;
