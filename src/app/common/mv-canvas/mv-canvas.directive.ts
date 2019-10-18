import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

export interface ChartOptions {
	data: number[];
	color: string;
	border: number;
	fill?: boolean;
	tooltip?: boolean;
}

@Directive({
	selector: '[mvCanvas]',
	exportAs: 'mvCanvas'
})
export class MvCanvasDirective {
	@Input() options: ChartOptions;
	private chart: Chart;

	constructor(private el: ElementRef) {
	}

	ngAfterViewInit(): void {
		this.initChart(this.el, this.options.data, this.options.color, this.options.border, this.options.fill, this.options.tooltip);
	}

	initChart(src: ElementRef, data: any[], color, border, fill: boolean, tooltip: boolean) {
		fill = (typeof fill !== 'undefined') ? fill : false;
		tooltip = (typeof tooltip !== 'undefined') ? tooltip : false;

		let config: ChartConfiguration = {
			type: "line",
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
				datasets: [{
					label: '',
					borderColor: color,
					borderWidth: border,
					pointHoverRadius: 4,
					pointHoverBorderWidth: 12,
					pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
					pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
					pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
					fill: fill,
					data: data
				}]
			},
			options: {
				title: {
					display: false,
				},
				tooltips: {
					enabled: tooltip,
					intersect: false,
					mode: 'nearest',
					xPadding: 10,
					yPadding: 10,
					caretPadding: 10
				},
				legend: {
					display: false,
					labels: {
						usePointStyle: false
					}
				},
				responsive: true,
				maintainAspectRatio: true,
				hover: {
					mode: 'index'
				},
				scales: {
					xAxes: [{
						display: false,
						gridLines: {
							display: false
						},
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: false,
						gridLines: {
							display: false
						},
						scaleLabel: {
							display: true,
							labelString: 'Value'
						},
						ticks: {
							beginAtZero: true
						}
					}]
				},
				elements: {
					point: {
						radius: 4,
						borderWidth: 12
					},
				},
				layout: {
					padding: {
						left: 0,
						right: 10,
						top: 5,
						bottom: 0
					}
				}
			}
		};

		this.chart = new Chart(src.nativeElement, config);
	}

	getChart() {
		return this.chart;
	}
}
