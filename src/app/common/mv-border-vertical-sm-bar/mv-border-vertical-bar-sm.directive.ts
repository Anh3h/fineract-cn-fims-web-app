import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { BVerticalBarOptions } from '../mv-border-vertical-bar/mv-border-vertical-bar.directive';

@Directive({
	selector: '[mvBVerticalBarSM]'
})
export class MvBVerticBarSMDirective {
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
                "hover": {
                    "animationDuration": 0
                },
                "animation": {
                    "duration": 1,
                    "onComplete": function () {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;

                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index]*1000000000;
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                },
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
                            max: 3,
                            stepSize:1,
                            display: true,
                            beginAtZero: true,
                            callback: function(value, index, values) {
								return String(value) + 'B';
							},
                        }
                    }],
                    xAxes: [{
                        position:'top',
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
