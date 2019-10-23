import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

export interface HBarOptions {
	labels:string[];
	dataset:any[];
	type:string;
	xAxes_Display:boolean;
	yAxes_Display:boolean;
}

@Directive({
	selector: '[mvHorizontalBar]'
})
export class MvHorizontalBarDirective {
	@Input() options: HBarOptions;
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
						display: this.options.xAxes_Display,
						gridLines: true,
						stacked: true,
						ticks: {
							display: true,
							fontColor: "#646c9a",
							fontSize: 13,
							padding: 10,
							callback: function(value, index, values) {
								return String(value) + '%';
							},
						}
					}],
					yAxes: [{
						display: this.options.yAxes_Display,
						stacked: true,
						gridLines: true,
						ticks: {
							display: true,
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
