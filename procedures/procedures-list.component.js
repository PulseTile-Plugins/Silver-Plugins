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
let templateProceduresList = require('./procedures-list.html');

class ProceduresListController {
  constructor($scope, $state, $stateParams, $ngRedux, proceduresActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});
    proceduresActions.clear();
    this.actionLoadList = proceduresActions.all;

		this.isShowCreateBtn = $state.router.globals.$current.name !== 'procedures-create';
		this.isShowExpandBtn = $state.router.globals.$current.name !== 'procedures';

    /* istanbul ignore next */
		this.create = function () {
			$state.go('procedures-create', {
				patientId: $stateParams.patientId
			});
		};
    /* istanbul ignore next */
    this.go = function (id, source) {
      $state.go('procedures-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.procedures;
      const pagesInfo = store.pagesInfo;
      const pluginName = 'procedures';

      if (serviceRequests.checkIsCanLoadingListData(state, pagesInfo, pluginName, $stateParams.patientId)) {
        this.actionLoadList($stateParams.patientId);
        serviceRequests.setPluginPage(pluginName);
        usSpinnerService.spin('list-spinner');
      }
      if (state.data) {
        this.procedures = state.data;

        serviceFormatted.formattingTablesDate(this.procedures, ['date'], serviceFormatted.formatCollection.DDMMMYYYY);
        if (this.procedures && this.procedures[0] && angular.isNumber(this.procedures[0].time)) {
          serviceFormatted.formattingTablesDate(this.procedures, ['time'], serviceFormatted.formatCollection.HHmm);
        }
        serviceFormatted.filteringKeys = ['date', 'name', 'time', 'source'];
      }
      if (state.data || state.error) {
        usSpinnerService.stop('list-spinner');
        setTimeout(() => { usSpinnerService.stop('list-spinner') }, 0);
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const ProceduresListComponent = {
  template: templateProceduresList,
  controller: ProceduresListController
};

ProceduresListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'proceduresActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default ProceduresListComponent;