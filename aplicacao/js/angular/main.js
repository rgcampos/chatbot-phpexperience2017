var app = angular.module("chatBot", []);

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});


function setDate() {
    var data = new Date();
    var minutes = data.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return '' + data.getHours() + ':' + minutes + '';
}