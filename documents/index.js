/*
 ~  Copyright 2017 Ripple Foundation C.I.C. Ltd
 ~  
 ~  Licensed under the Apache License, Version 2.0 (the "License");
 ~  you may not use this file except in compliance with the License.
 ~  You may obtain a copy of the License at
 ~  
 ~    http://www.apache.org/licenses/LICENSE-2.0

 ~  Unless required by applicable law or agreed to in writing, software
 ~  distributed under the License is distributed on an "AS IS" BASIS,
 ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~  See the License for the specific language governing permissions and
 ~  limitations under the License.
 */
import routes from "./index.route";
import reducer from "./documents-reducer-all";
import documentsListComponent from './documents-list.component';
import documentsDetailComponent from './documents-detail.component';
import { documentsDetailReferralComponent } from './documents-detail-type.component';
import { documentsDetailDischargeComponent } from './documents-detail-type.component';
import documentsActions from './documents-actions';

export default {
  "name": 'documents',
  "routes": routes,
  "reducer": reducer,
  "components": {
    documentsListComponent,
    documentsDetailComponent,
    documentsDetailReferralComponent,
    documentsDetailDischargeComponent
  },
  "actions": {
    documentsActions
  },
  "sidebarInfo": {
    name: 'documents',
    link: 'documents',
    title: 'Documents'
  }
}