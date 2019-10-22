/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { CardDetail } from '../common/account-card/account-card.component';
import { Chart, ChartConfiguration } from 'chart.js';
import { type } from '../store/util';

export interface ChartOptions{
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

@Component({
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss']
})
export class QuickAccessComponent {

  public firstCard: CardDetail = {
    header: "Incoming wires",
    subHeaders: [
      {
        quantity: 3,
        context: "Matches",
        time: "Today",
        color: "primary"
      }
    ],
    listBody: [
      {
        quantity: 4,
        context: "Matches",
        time: "This Week"
      },
      {
        quantity: 14,
        context: "Matches",
        time: "This Month"
      },
      {
        quantity: 35,
        context: "Matches",
        time: "This Year"
      }
    ]
  };
  public secondCard: CardDetail = {
    header: "Deposits",
    description: "Deposits over $4000",
    subHeaders: [
      {
        quantity: 5,
        context: "Matches",
        time: "Today",
        color: "primary"
      },
      {
        quantity: 1,
        context: "Alert",
        time: "Today",
        color: "danger"
      },
    ],
    listBody: [
      {
        quantity: 7,
        context: "Matches",
        time: "This Week"
      },
      {
        quantity: 12,
        context: "Matches",
        time: "This Month"
      },
      {
        quantity: 23,
        context: "Matches",
        time: "This Year"
      }
    ]
  };
  public thirdCard: CardDetail = {
    header: "Accounts",
    description: "New Accounts Created",
    subHeaders: [
      {
        quantity: 12,
        context: "New Accounts",
        time: "Today",
        color: "success"
      }
    ],
    listBody: [
      {
        quantity: 30,
        context: "Matches",
        time: "This Week"
      },
      {
        quantity: 86,
        context: "Matches",
        time: "This Month"
      },
      {
        quantity: 114,
        context: "Matches",
        time: "This Year"
      }
    ]
  };

  public options: ChartOptions =  {
    ShowContent: false,
    dataset: [],
    type: "line",
    fill: false,
    labels: [],
    yAxes_min: 0,
    yAxes_max: 3,
    yAxes_stepSize: 1,
    xAxes_position: "bottom",
    yAxes_position: "left"
  };

  @ViewChild('chart') chart: ElementRef;
  @ViewChild('pieChart') pieChart: ElementRef;

  public config: ChartConfiguration;
  public pieChartConfig: ChartConfiguration;
  private data:{labels:string[], datasets:any[]};

  constructor() {}

  ngOnInit() {
    this.data = {
      labels: ["Mobile", "Online"],
      datasets: [{
        backgroundColor: ["teal", "green"], 
        data: [35.15, 64.58], 
        label: "Dataset 1"
      }]
    }

    this.pieChartConfig = {
      type: "pie",
			data: this.data,
			options: {
				responsive: true,
				title:{
          display:false,
          text:'Pie Chart'
        },
        legend:false,
        animation:{
          animationScale:true,
          animationRotate:true
        }
			}
    }
    
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

  ngAfterViewInit() {
    this.chart = new Chart(this.chart.nativeElement, this.config);
    this.pieChart = new Chart(this.pieChart.nativeElement, this.pieChartConfig);
  }
}
