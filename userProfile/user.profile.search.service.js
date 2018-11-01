/// <reference path="../core/core.repository.js" />
/// <reference path="../../../build/js/ams.core.js" />
/// <reference path="../models/UserProfileModel.js" />
/// <reference path="../models/DivisionModel.js" />
/// <reference path="../app.configuration.js" />


(function () {
    'use strict';
    angular.module(g_Config.appName).service('userProfileSearchService', userProfileSearchService);
    userProfileSearchService.$inject = ['$q'];
    function userProfileSearchService($q) {
        var vm = this;
        //vm.userProfileRepository = new service.ListRepository({ title: "UserProfile" });
        vm.userProfileRepository = new service.ListRepository(g_Config.Web.Lists.UserProfile);
        vm.DivisionRepository = new service.ListRepository(g_Config.Web.Lists.Division);

        vm.fn = {
            search: search,
            getDivision: getDivision,
        };
        
        vm.camlQuery = new CAMLQuery();

        // search function
        function search(options) {
            var result = {
                success: false,
                data: null
            }
            var opt = $.extend({}, {
                criteria: {
                    accountName: "",
                    Division: "",
                    Department:"",
                },
                positionNext: "",
                viewFields: null,
                orderBy: "",
                isDesc: true
            }, options);
            var defer = $q.defer();
            var criteriaList = [];
            var caml = "";
            if (opt.criteria) {

                if (opt.criteria.accountName) {
                    criteriaList.push(vm.camlQuery.createCAMLCriteria({ comparison: "Contains", fieldName: "AccountName", fieldType: "Text", fieldValue: opt.criteria.accountName }));
                }
                if (opt.criteria.Division ) {
                    criteriaList.push(vm.camlQuery.createCAMLCriteria({ comparison: "Eq", fieldName: "Division", fieldType: "Text", fieldValue: opt.criteria.Division }));
                }
                if (opt.criteria.Department) {
                    criteriaList.push(vm.camlQuery.createCAMLCriteria({ comparison: "Contains", fieldName: "Department", fieldType: "Text", fieldValue: opt.criteria.Department }));
                }

            }
            if (criteriaList.length > 0) {
                var strCaml = criteriaList.length == 1 ? criteriaList[0] : vm.camlQuery.joinConditionCAMLCriteria({ criteriaCollection: criteriaList, logicalOperators: "And" });

            }
            caml = String.format("<Where>{0}</Where><OrderBy><FieldRef Name='{1}' Ascending='{2}'/></OrderBy>", strCaml, opt.orderBy, opt.isDesc ? "FALSE" : "TRUE");

            vm.userProfileRepository.getListItems({
                filter: caml,
                select: opt.viewFields,
                top: 10,
                positionNext: opt.positionNext,
                useDeferred: true
            }).done(function (res) {
                result.success = res.success;
                if (res.success) {
                    if (res.data && !util.isEmpty(res.data.rows)) {
                        result.data = res.data.rows.map(e=>new UserProfileModel(e));
                    }
                    if (res.data && res.data.ListItemCollectionPositionNext) {
                        result.positionNext = res.data.ListItemCollectionPositionNext;
                    }
                }
                else {
                    //Add log here
                }
                defer.resolve(result);
            });

            return defer.promise;
        }
        
        // get division form app config
        function getDivision() {
            var defer = $q.defer();
            var result = {
                success: false,
                data: null
            }
            vm.DivisionRepository.getListItems({
                useDeferred: true
            }).done(function (res) {
                result.success = res.success;
                if (res.success) {
                    if (res.data && !util.isEmpty(res.data.rows)) {
                        result.data = res.data.rows.map(e=> new DivisionModel(e));
                    }
                }
                else {
                    //console.log("fail");
                }
                defer.resolve(result);
            });
            return defer.promise;
        }
        return vm.fn;
    }
})();