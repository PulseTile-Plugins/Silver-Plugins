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

let templatePersonalnotesList = require('./personalnotes-list.html');

class PersonalnotesListController {
  constructor($scope, $state, $stateParams, $ngRedux, personalnotesActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});
    personalnotesActions.clear();
    this.actionLoadList = personalnotesActions.all;

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'personalNotes-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'personalNotes';

    /* istanbul ignore next */
    this.create = function () {
      $state.go('personalNotes-create', {
        patientId: $stateParams.patientId
      });
    };
    /* istanbul ignore next */
    this.go = function (id, source) {
      $state.go('personalNotes-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.personalnotes;
      const pagesInfo = store.pagesInfo;
      const pluginName = 'personalNotes';

      if (serviceRequests.checkIsCanLoadingListData(state, pagesInfo, pluginName, $stateParams.patientId)) {
        this.actionLoadList($stateParams.patientId);
        serviceRequests.setPluginPage(pluginName);
        usSpinnerService.spin('list-spinner');
      }
      if (state.data) {
        this.personalNotes = state.data;

        serviceFormatted.formattingTablesDate(this.personalNotes, ['dateCreated'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['noteType', 'author', 'dateCreated', 'source'];
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

const PersonalnotesListComponent = {
  template: templatePersonalnotesList,
  controller: PersonalnotesListController
};

PersonalnotesListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'personalnotesActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default PersonalnotesListComponent;