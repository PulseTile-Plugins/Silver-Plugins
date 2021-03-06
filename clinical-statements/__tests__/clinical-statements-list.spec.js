import ClinicalstatementsListComponent from '../clinicalstatements-list.component';

describe('Clinical statements List', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _clinicalstatementsActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = ClinicalstatementsListComponent.template;

    ctrl = controller(ClinicalstatementsListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      clinicalstatementsActions: _clinicalstatementsActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'setCurrentPageData');

    ctrl.actionLoadList();
    ctrl.create();
    ctrl.go();
    ctrl.setCurrentPageData();
  });

  it('Template exist', function() {
      expect(template).toBeDefined();
  });
  it('Controller exist', function() {
      expect(ctrl).toBeDefined();
  });

  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
  it('create was called', function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it('go was called', function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});