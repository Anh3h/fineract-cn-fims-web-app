import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

export interface ChartOptions {
	ShowContent: boolean;
	dataset:any[];
	type:string;
	fill:boolean;
	labels:string[];
	yAxes_min:number;
	yAxes_max:number;
	yAxes_stepSize:number;
	xAxes_position:string;
	yAxes_position:string;
}

@Directive({
	selector: '[mvGraph]'
})
export class MvGraphDirective {
	@Input() options: ChartOptions;
	public config: ChartConfiguration;

	constructor(private el: ElementRef) {
	}

	ngOnInit() {
		this.config = {
			type: this.options.type,
			data: {
				labels: ['Feb 3', 'Feb 8', 'Feb 13', 'Feb 18', 'Feb 23', 'Feb 28', 'Mar 5', 'Mar 10', 'Mar 15', 'Mar 20', 'Mar 25', 'Mar 30', 'Apr 4'],
				datasets: [
          {
            fill: false,
            borderColor:'red',
            backgroundColor: Chart.helpers.color("#716aca").alpha(0.6).rgbString(),
            pointHoverRadius: 4,
            pointHoverBorderWidth: 12,
            pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
            pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
            pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
            pointHoverBackgroundColor: "#716aca",
            data: [0, 1, 2, 3, 3,2,1,2,2,1,3,0,2]
          },
          {
			fill: false,
			borderColor:'green',
			backgroundColor: Chart.helpers.color("#716aca").alpha(0.2).rgbString(),
			pointHoverRadius: 4,
			pointHoverBorderWidth: 12,
			pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
			pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
			pointHoverBackgroundColor: "#716aca",
			pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
			data: [2,1,2,3, 2,1,2,3, 2,1,2,3, 0]
		}
        ]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				legend: false,
				scales: {
					xAxes: [{
						position:this.options.xAxes_position,
						categoryPercentage: 0.35,
						barPercentage: 0.70,
						display: true,
						scaleLabel: {
							display: false,
							labelString: 'Month'
						},
						gridLines: false,
						ticks: {
							display: true,
							beginAtZero: true,
							fontColor: "#646c9a",
							fontSize: 13,
							padding: 10
						}
					}],
					yAxes: [{
						position:this.options.yAxes_position,
						categoryPercentage: 0.35,
						barPercentage: 0.70,
						display: true,
						scaleLabel: {
							display: false,
							labelString: 'Value'
						},
						gridLines: {
							color: "#afb4d4",
							drawBorder: false,
							offsetGridLines: false,
							drawTicks: false,
							borderDash: [3, 4],
							zeroLineWidth: 1,
							zeroLineColor: "#afb4d4",
							zeroLineBorderDash: [3, 4]
						},
						ticks: {
							callback: function(value, index, values) {
								return value + "M";
							},
							max: this.options.yAxes_max,
							stepSize: this.options.yAxes_stepSize,
							display: true,
							min: this.options.yAxes_min,
							fontColor: "#646c9a",
							fontSize: 13,
							padding: 10
						}
					}]
				},
				title: {
					display: false
				},
				hover: {
					mode: 'index'
				},
				tooltips: {
					enabled: true,
					intersect: false,
					mode: 'nearest',
					bodySpacing: 5,
					yPadding: 10,
					xPadding: 10,
					caretPadding: 0,
					displayColors: false,
					backgroundColor: "#716aca",
					titleFontColor: '#ffffff',
					cornerRadius: 4,
					footerSpacing: 0,
					titleSpacing: 0
				},
				layout: {
					padding: {
						left: 0,
						right: 0,
						top: 5,
						bottom: 5
					}
				}
			}
		};
	}

	ngAfterViewInit(): void {
		new Chart(this.el.nativeElement, this.config);
	}
}
