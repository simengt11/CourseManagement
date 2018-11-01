
(function () {
    'use strict';
    angular.module(g_Config.appName).controller('userProfileSearchController', userProfileSearchController);

    userProfileSearchController.$inject = ["userProfileSearchService"];

    function userProfileSearchController(userProfileSearchService) {
        var vm = this;
    	vm.vars = {
    	    gridData: { results: [] },
    	    tableState: null,
    	    isLoadingShown: false,
    	    positionNext: "",
    	    oldParamSearch: null,
			cbboxDivision:{ results: [] },
			Division:"",
			accountName:"",
			Department:""
    	};
        
    	vm.fn = {
    	    searchUserProfile: searchUserProfile,
    	    callServer: callServer,
    	    getDivision: getDivision,
    	    btnResetSearchCriteria: btnResetSearchCriteria,
    	    initShowMore: initShowMore,
			checkAll: checkAll,
			testFunction:testFunction
		}
		
		init();

		function init() {
			getDivision();

		}

		function testFunction(){
			userProfileSearchService.testFunction();
		}

    	function searchUserProfile(isShowMore) {
    	    vm.vars.isLoadingShown = true;
    	    var pagination = vm.vars.tableState.pagination;
    	    var param = {
    	        criteria: {
    	            accountName: vm.vars.accountName,
    	            Division: vm.vars.Division,
    	            Department: vm.vars.Department
    	        },
    	        viewFields: null,
    	        orderBy: vm.vars.tableState.sort.predicate,
    	        isDesc: !vm.vars.tableState.sort.reverse,
    	    }
    	    
    	    if (isShowMore) {
    	        param = vm.vars.oldParamSearch;
    	        param.positionNext = vm.vars.positionNext;
    	    }
    	    else {
    	        vm.vars.oldParamSearch = param;
			}
			
    	    userProfileSearchService.search(param).then(function (res) {
    	        if (res.success && res.data) {
    	            if (isShowMore) {
    	                angular.forEach(res.data, function (item, i) {
    	                    vm.vars.gridData.result.push(item);
    	                });
    	            }
    	            else {
    	                vm.vars.gridData.result = res.data;
    	            }
    	            vm.vars.positionNext = util.getString(res.positionNext);
    	            initShowMore();
    	        }
    	            // else để xử lí form
    	        else {
    	            vm.vars.gridData.result = null;
    	            initShowMore();
    	        }
    	        
    	        vm.vars.isLoadingShown = false;
    	    });
    	}
    	
    	function initShowMore() {
    	    if (vm.vars.positionNext != "") {
    	        $("#btnShowMore").show();
    	    }
    	    else {
    	        $("#btnShowMore").hide();
            }
    	}
    	function callServer(tableState) {
    	    if (!vm.vars.tableState) {
    	        tableState.sort = { predicate: "Title", reverse: true };
    	    }
    	    vm.vars.tableState = tableState;
    	    searchUserProfile(false);

    	}
        
        function getDivision() {
            userProfileSearchService.getDivision()
               .then(function (res) {
                   vm.vars.cbboxDivision.results.push({ id: "", title: "" });
                   angular.forEach(res.data, function (item, i) {
                       vm.vars.cbboxDivision.results.push({ id: item.ID, title: item.Title });
                   });
               })
		}
		
    	function btnResetSearchCriteria() {
    	    vm.vars.accountName ="";
    	    vm.vars.Division = "";
    	    vm.vars.Department ="";
		}
		
    	function checkAll() {
    	    console.log(vm.vars.gridData.result);
    	}
    }
})();