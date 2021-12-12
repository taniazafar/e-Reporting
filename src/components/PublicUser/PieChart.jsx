// import React from "react";
// import { Doughnut } from "react-chartjs-2";

// const PieChart = (props) => {
// 	let labels = props.labels;
// 	let data = props.data;
// 	console.log(labels, data);
// 	return (
// 		<Doughnut
// 			data={{
// 				// labels: ["Crimes", "Water", "Sanitation", "Electricity"],
// 				// labels: ["Crimes", "Water"],
// 				labels: labels,
// 				datasets: [
// 					{
// 						data: data,
// 						backgroundColor: [
// 							// "#2563EB",
// 							// "#" + color(),
// 							"#DC2626",
// 							"#F59E0B",
// 							"#DB2777",
// 							"#A3E635",
// 							"#2563EB",
// 							// "#991B1B",
// 							// "#" + color(),
// 							// "#" + color(),
// 							// "#" + color(),
// 							// "#" + color(),
// 							// "#4B5563",
// 							// "#7C3AED",
// 							// "#7C3AED",
// 							// "#7C3AED",
// 						],
// 					},
// 					// Math.floor(Math.random()*16777215).toString(16);
// 				],
// 			}}
// 			height={300}
// 			width={500}
// 			options={{
// 				borderWidth: 1,
// 				maintainAspectRatio: false,
// 				scales: {
// 					yAxes: {
// 						ticks: {
// 							beginAtZero: true,
// 							display: false,
// 						},
// 						grid: { display: false, borderWidth: 0 },
// 					},
// 				},
// 				plugins: {
// 					legend: {
// 						position: "bottom",
// 						labels: {
// 							font: { size: 16 },
// 							boxHeight: 15,
// 							boxWidth: 15,
// 							padding: 0,
// 							usePointStyle: true,
// 							padding: 20,
// 						},
// 					},
// 					title: {
// 						display: true,
// 						text: "Issues By Year",
// 						font: { size: 18 },
// 						position: "top",
// 						align: "start",
// 						padding: { top: 10, bottom: 10 },
// 					},
// 				},
// 			}}
// 		/>
// 	);
// };

// export default PieChart;
