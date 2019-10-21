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
import { CardDetail } from '../common/account-card/account-card.component';

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

  constructor() {}
}
