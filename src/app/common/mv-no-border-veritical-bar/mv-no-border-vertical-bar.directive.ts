import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

export interface NBVerticalBarOptions {
	labels:string[];
	dataset:any[];
	type:string;
	xAxes_Display:boolean;
	yAxes_Display:boolean;
	xAxesTicksCallbackValue:string;
	yAxesTicksCallbackValue:string;
	xAxesPosition:string;
	yAxesPosition:string;
}

@Directive({
	selector: '[mvNBVerticalBar]'
})
export class MvNBVerticalBarDirective {
	@Input() options: NBVerticalBarOptions;
	public config: ChartConfiguration;
    private data: { labels: string[]; datasets: any[] };

	constructor(private el: ElementRef) {
	}

	ngOnInit() {
		this.data={
            labels:this.options.labels,
            datasets:this.options.dataset,
		}

		this.config = {
			type: this.options.type,
			data: this.data,
			options: {
				title: {
					display: false,
				},
				tooltips: {
					intersect: false,
					mode: 'nearest',
					xPadding: 10,
					yPadding: 10,
					caretPadding: 10
				},
				legend: {
					display: false
				},
				responsive: true,
				maintainAspectRatio: true,
				barRadius: 4,
				scales: {
					xAxes: [{
						position: this.options.xAxesPosition,
						display: this.options.xAxes_Display,
						gridLines: true,
						stacked: true,
						ticks: {
							display: true,
							fontColor: "#646c9a",
							fontSize: 13,
							padding: 10,
							// callback: function(value, index, values) {
							// 	return String(value) + this.xAxesValue;
							// },
						}
					}],
					yAxes: [{
						position:this.options.yAxesPosition,
						display: this.options.yAxes_Display,
						stacked: true,
						gridLines: true,
						ticks: {
							callback: function(value, index, values) {
								return String(value) + 'K';
							},

							display: true,
							// min: 0,
							// stepSize:10,
							// max:40,
							fontColor: "#646c9a",
							fontSize: 13,
							padding: 10
						}
					}]
				},
				layout: {
					padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0
					}
				}
			}
		}
	}

	ngAfterViewInit(): void {
		new Chart(this.el.nativeElement, this.config);
	}
}
