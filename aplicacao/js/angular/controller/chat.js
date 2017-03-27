app.controller("chat", ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

    var writing = '<div id="bot" class="row"> <figure class="userWatson"> <img src="images/user_watson.png" alt="Watson"> </figure> <div class="userWatsonTyping"> <img src="images/typing.gif" alt="Digitando"> </div> </div>';


    $scope.contexto = {};



    function scrollChat() {
        var elementRoot = angular.element(document.querySelector('#content'));
        elementRoot.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
            scrollInertia: 10,
            timeout: 0
        });
    }


    function enviaMsg(mensagem, contexto) {

        var data = $.param({
            message: mensagem,
            context: contexto
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };

        return $http.post('services.php?action=enviarMensagem', data, config);
    }


    function startAtendimento() {
        $timeout(function () {
            var element = angular.element(document.querySelector('#contentChat'));
            var htmlAux = element.html();

            var iniciaBot = enviaMsg('primeira chamada', {});

            iniciaBot.then(function success(res) {
                if (res.data.status == 'ok') {
                    var dados = res.data.dados;
                    $scope.contexto = dados.context;

                    htmlAux += '<div id="bot" class="row"> <figure class="userWatson"> <img src="images/user_watson.png" alt="Watson"> </figure> <div class="userWatsonContent">' + dados.output.text[0] + '</div><div class="clearfix"></div> <div class="timeChat" style="margin-left: 65px; text-align: left;"><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;' + setDate() + '</div></div>';
                    element.html(htmlAux);
                }
            }, function fail(res) {
                alert('erro ao realizar tarefa!');
                console.log(res);
            });

        }, 250);
    }


    $scope.load = function () {
        var elmt = angular.element(document.querySelector('#content'));
        elmt.mCustomScrollbar({
            setHeight: 350,
            theme: "inset-2-dark"
        });

        startAtendimento();
    }


    $scope.sendMessage = function () {

        var element = angular.element(document.querySelector('#contentChat'));
        var elementHTML = element.html();
        var message = $scope.txtMessage;


        $scope.txtMessage = '';
        elementHTML += '<div id="person" class="row"> <div class="user"> <i class="fa fa-user-circle-o fa-3x" aria-hidden="true"></i> </div> <div class="userContent">' + message + '</div><div class="clearfix"></div> <div class="timeChat" style="margin-right: 65px; text-align: right;">' + setDate() + '&nbsp;<i class="fa fa-clock-o" aria-hidden="true"></i></div></div>';
        element.html(elementHTML);
        scrollChat();


        $timeout(function () {
            elementHTML += writing;
            element.html(elementHTML);
            scrollChat();
        }, 250);




        var enviaMensagem = enviaMsg(message, $scope.contexto);
        $timeout(function () {
            var element = angular.element(document.querySelector('#contentChat'));
            var htmlAux = '';

            enviaMensagem.then(function success(res) {
                if (res.data.status == 'ok') {
                    var dados = res.data.dados;
                    $scope.contexto = dados.context;
                    var msg = '';

                    angular.forEach(dados.output.text, function (value, key) {
                        if (value && !msg) {
                            msg = value;
                        }
                    });

                    var watsonSay = '<div id="bot" class="row"> <figure class="userWatson"> <img src="images/user_watson.png" alt="Watson"> </figure> <div class="userWatsonContent">' + msg + '</div><div class="clearfix"></div> <div class="timeChat" style="margin-left: 65px; text-align: left;"><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;' + setDate() + '</div></div>';

                    elementHTML = elementHTML.replace(writing, watsonSay);
                    element.html(elementHTML);

                    scrollChat();
                }
            }, function fail(res) {
                alert('erro ao realizar tarefa!');
                console.log(res);
            });

        }, 1000);
    }
}]);