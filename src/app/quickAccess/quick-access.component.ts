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
import { ChartOptions } from '../common/mv-graph/mv-graph.directive';
import { HBarOptions } from 'app/common/mv-horizontal-bar/mv-horizontal-bar.directive';
import { NBVerticalBarOptions } from '../common/mv-no-border-veritical-bar/mv-no-border-vertical-bar.directive';
import { BVerticalBarOptions } from '../common/mv-border-vertical-bar/mv-border-vertical-bar.directive';

@Component({
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss']
})
export class QuickAccessComponent {

  public firstCard: CardDetail = {
    header: "Incoming wires",
    subHeaders: [{ quantity: 3, context: "Matches", time: "Today", color: "primary" }],
    listBody: [
      { quantity: 4, context: "Matches", time: "This Week" },
      { quantity: 14, context: "Matches", time: "This Month" },
      { quantity: 35, context: "Matches", time: "This Year" }
    ]
  };
  public secondCard: CardDetail = {
    header: "Deposits",
    description: "Deposits over $4000",
    subHeaders: [
      { quantity: 5, context: "Matches", time: "Today", color: "primary" },
      { quantity: 1, context: "Alert", time: "Today", color: "danger" },
    ],
    listBody: [
      { quantity: 7, context: "Matches", time: "This Week" },
      { quantity: 12, context: "Matches", time: "This Month" },
      { quantity: 23, context: "Matches", time: "This Year" }
    ]
  };
  public thirdCard: CardDetail = {
    header: "Accounts",
    description: "New Accounts Created",
    subHeaders: [{ quantity: 12, context: "New Accounts", time: "Today", color: "success" }],
    listBody: [
      { quantity: 30, context: "Matches", time: "This Week" },
      { quantity: 86, context: "Matches", time: "This Month" },
      { quantity: 114, context: "Matches", time: "This Year" }
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

  public firstHBarOptions: HBarOptions = {
    type:'horizontalBar',
			labels: ['Used Channel 1', 'Used Channels 2', 'Used Channels 3'],
			dataset:[{ backgroundColor: "#5867dd", data: [ 50, 45, 0 ] }],
			xAxes_Display:true,
			yAxes_Display:true
  }
  public secondHBarOptions: HBarOptions = {
    type:'horizontalBar',
    labels: ['Used Channel 1', 'Used Channels 2', 'Used Channels 3'],
    dataset:[{ backgroundColor: "#5867dd", data: [ 15, 80, 10 ] }],
    xAxes_Display:true,
    yAxes_Display:false
  }
  public nbVBarOptions: NBVerticalBarOptions = {
    type: 'bar',
    xAxes_Display: true,
    yAxes_Display: true,
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
    xAxesTicksCallbackValue: "",
    yAxesTicksCallbackValue: "K",
    xAxesPosition: 'top',
    yAxesPosition: 'left',
    dataset: [{
      backgroundColor: "#5867dd",
      data: [ 11, 15, 40, 30, 10, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23 ]
    }]
  }
  public firstBVBarOptions: BVerticalBarOptions = {
    type:'bar',
    labels:["AIRITIME","AIRITIME","AIRITIME", "BILL PAYMENT", "TRANSFERS"],
    dataset: [{
      backgroundColor: "#5867dd",
      data: [ 62.735, 65.786, 293.260, 70.055, 103.432 ],
    }]
  }
  public secondBVBarOptions: BVerticalBarOptions = {
    type:'bar',
    labels:["AIRITIME","AIRITIME","AIRITIME", "BILL PAYMENT", "TRANSFERS"],
    dataset: [{
      backgroundColor: "#5867dd",
      data: [ 0.030458563, 0.030525392, 0.148931527, 0.070471148, 2.324310685 ],
    }]
  }
  public vBarOptions: BVerticalBarOptions = {
    type:'bar',
    labels:["Week6","Week7","Week8", "Week9", "Week10", "Week11", "Week12", "Week13"],
    dataset: [{
      backgroundColor: "#5867dd",
      data: [ 100, 100, 100, 100, 100, 100, 100, 100 ],
    }]
  }

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
 
  }

  ngAfterViewInit() {
    this.pieChart = new Chart(this.pieChart.nativeElement, this.pieChartConfig);
  }
}
