var app = angular.module('myApp', []);
app.controller('personCtrl', ['$scope', function ($scope) {
    $scope.idx = null //Pegando posição de cada regitro!
    $scope.lastid = 0; //Contador
    $scope.listar = []; //Criando uma lista vazia para o campo do formulario/tratativa de dados

    //Limpando o formulario
    $scope.limpar = function(){
        $scope.formulario = {
            id: null,
            nome: null,
            data: null
        };
    }
    $scope.limpar() //Seta os campos de limpar

    $scope.salvar = function () {
        console.log($scope.listar)//MOSTRA OS VALORES DE LISTAR
        $scope.lastid = $scope.lastid + 1; //Pega o Ultimo valor acrescenta o ultimo valor + 1
        $scope.formulario.id = $scope.lastid; //Atualizando o valor
        $scope.date = $scope.formulario.data; //Formatando a data
        $scope.listar.push(angular.copy($scope.formulario))
        $scope.limpar()
    };

    $scope.edit = function (formulario, idx) {
        //Pegando os dados da tela e atualizando
        $scope.formulario = angular.copy(formulario)
        //idx recebe o valor atual da posição se atualizando confor o registro
        $scope.idx = idx
    };

    $scope.alterar = function () {
        //Na lista pelo idx posição que foi clicado, estou recebendo os novos dados do formulario
        $scope.listar[$scope.idx] = angular.copy($scope.formulario)
        $scope.limpar()

    }
    
    $scope.delet = function (idx) {
        $scope.listar.splice($scope.idx, 1)
    };
}]);