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
import {Component} from '@angular/core';

@Component({
  templateUrl: './quick-access.component.html',
  styles: [`
    mat-card-title.mat-card-title, p {
      margin-bottom: 0px
    }
    .details {
      padding: 8px;
    }
    .details strong {
      font-size: 16px
    }
  `]
})
export class QuickAccessComponent {

  constructor() {}

  public chartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public chartLegend = false;
  public chartOne = {
    color: [{
      backgroundColor: ['rgba(255, 255, 255, 0)'],
      borderColor: ['rgba(54, 162, 235, 1)'],
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      pointBorderColor: 'rgba(54, 162, 235, 1)',
    }],
    type: 'line',
    labels: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'],
    datasets: [
        {data: [65, 59, 80, 81, 56, 55, 40]}
      ]
  };
  public chartTwo = {
    color: [{
      backgroundColor: [
        '#20c997', '#20c997', '#20c997', '#20c997', '#20c997', '#20c997',
      ],
      borderColor: ['#20c997', '#20c997', '#20c997', '#20c997', '#20c997', '#20c997']
    }],
    type: 'bar',
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {data: [12, 19, 3, 5, 2, 3]}
      ]
  };

}
