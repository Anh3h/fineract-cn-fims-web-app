import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { BVerticalBarOptions } from '../mv-border-vertical-bar/mv-border-vertical-bar.directive';

@Directive({
	selector: '[mvVerticalBar]'
})
export class MvVerticBarDirective {
	@Input() options: BVerticalBarOptions;
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
			type: 'bar',
            data: this.data,
            options: {
                legend: {
                    "display": false
                },
                tooltips: {
                    "enabled": true
                },
                scales: {
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: true,
                        },
                        ticks: {
                            padding: 10,
                            max: 100,
                            stepSize:50,
                            display: true,
                            beginAtZero: true,
                            callback: function(value, index, values) {
								return String(value) + '%';
							},
                        }
                    }],
                    xAxes: [{
                        position:'bottom',
                        display:true,
                        gridLines: {
                            display: true,
                        },
                        ticks: {
                            padding: 10,
                            autoSkip:true,
                            maxRotation:90,
                            minRotation:90,
                            beginAtZero: true
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
