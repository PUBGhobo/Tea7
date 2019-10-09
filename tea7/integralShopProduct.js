(function (app) {
    // 茶币详情的控制器
    app.controller("controllerIntegralShopProduct", function ($scope, $http) {
        $scope.CustomerInfo = { Id: 0, Name: "", Point: "-", IsGuest: true };
        $scope.CurrentCategoryId = 0;
        $scope.CurrentClass = "active";
        $scope.Categorys = [];
        $scope.DataSource = [];
        $scope.Init = function () {
            // 获取产品的类型
            $http.post("/api/Product/GetProductCategory", { PageSize: 4, ProductType: 3, ParentId: 0 }).success(function (response) {
                $scope.Categorys = response;
                angular.forEach($scope.Categorys, function (data, index) {
                    if (($scope.CurrentCategoryId == 0 && index == 0) ||
                         $scope.CurrentCategoryId == data.Id) {
                        data.ClassName = $scope.CurrentClass;
                        $scope.CurrentCategoryId = data.Id;
                        // 绑定推荐赠品数据
                        $scope.BindData();
                    } else {
                        data.ClassName = "";
                    }
                    data.Source = null;
                    data.ChildClassName = "hidden";
                });
            });
        };
        $scope.BindCustomer = function () {
            $http.post("/api/customer/GetCurrentCustomer").success(function (response) {
                $scope.CustomerInfo = response;
            });
        };
        $scope.ChangeStatus = function (Id, ChildId) {
            if (typeof (ChildId) == "undefined") ChildId = -1;
            angular.forEach($scope.Categorys, function (data, index) {
                if (Id == data.Id) {
                    if (data.ChildCategorys == null || data.ChildCategorys.length <= 0 || ChildId >= 0) {
                        if (ChildId > 0) {
                            $scope.CurrentCategoryId = ChildId;
                            $scope.BindData(Id);
                        }
                        else {
                            $scope.CurrentCategoryId = Id;
                            $scope.BindData();
                        }
                    } else {
                        if (data.ChildClassName == "hidden")
                            data.ChildClassName = "";
                        else
                            data.ChildClassName = "hidden";
                    }
                    data.ClassName = $scope.CurrentClass;
                } else {
                    data.ClassName = "";
                    data.ChildClassName = "hidden";
                }
            });
        };

        // 绑定数据
        $scope.BindData = function (Id) {
            $(".spinner_bg").show();
            if (typeof (Id) == "undefined") Id = 0;
            // 找到已经查出来的数据源
            var datasource = null;
            angular.forEach($scope.Categorys, function (data, index) {
                if (Id > 0) {
                    if (Id == data.Id && data.ChildCategorys != null && data.ChildCategorys.length > 0) {
                        angular.forEach(data.ChildCategorys, function (data1, index1) {
                            if ($scope.CurrentCategoryId == data1.Id) {
                                datasource = data1.Source;
                            }
                        });
                    }
                } else {
                    if ($scope.CurrentCategoryId == data.Id) {
                        datasource = data.Source;
                    }
                }
            });
            if (datasource == null) {
                // 绑定推荐赠品数据
                $http.post("/api/Product/GetProducts", { ProductType: 3, OrderBy: 0, ParentCategoryId: $scope.CurrentCategoryId }).success(function (response1) {
                    angular.forEach(response1, function (data, index) {
                        if (data.ChildCategorys != null && data.ChildCategorys.length > 0) {
                            angular.forEach(data.ChildCategorys, function (data1, index1) {
                                data1.ClassName = "hidden";
                                data1.Source = null;
                            });
                        }
                    });
                    $scope.DataSource = response1;
                    $(".spinner_bg").hide();
                    angular.forEach($scope.Categorys, function (data, index) {
                        if (Id > 0) {
                            if (Id == data.Id && data.ChildCategorys != null && data.ChildCategorys.length > 0) {
                                angular.forEach(data.ChildCategorys, function (data1, index1) {
                                    if ($scope.CurrentCategoryId == data1.Id) {
                                        data1.Source = response1;
                                    }
                                });
                            }
                        } else {
                            if ($scope.CurrentCategoryId == data.Id) {
                                data.Source = response1;
                            }
                        }
                    });
                });
            } else {
                $scope.DataSource = datasource;
                $(".spinner_bg").hide();
            }
        };
    });
    app.directive('onFinishRenderFilters', function ($timeout) {
        return {
            restrict: 'A',
            compile: function compile(tElement, tAttrs, transclude) {
                $(".angularContent").show();
            }
        };
    });
    app.directive('onImageFinishRenderFilters', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        try
                        {
                            $("http://www.tea7.com/scripts/angular/controller/Catalog/img.lazy").lazyload({ effect: "fadeIn" });
                        }catch(a){}
                    });
                }
            }
        };
    });
})(app);