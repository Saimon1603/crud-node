var app = angular.module('myApp', []);
app.controller('personCtrl', ['$scope', function ($scope) {
    $scope.idx = null //Pegando posição de cada regitro!
    $scope.listar = []; //Criando uma lista para o campo do formulario/tratativa de dados

    //Limpa o formulario
    $scope.limpar = function () {
        $scope.formulario = {
            id: null,
            nome: null,
            data_agenda: null
        };

    }
    $scope.limpar() //Seta a função limpar

    //CHAMA A FUNÇÃO NA API PARA LISTAR
    $scope.getlista = function () {
        axios.get('http://localhost:3000/listar_cliente')
            .then(function (response) {
                var data = response.data;
                $scope.listar = angular.copy(response.data)
                if (changed) {
                    angular.reRenderUIPart();
                }
                console.log($scope.listar);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    $scope.getlista()

    // CHAMA A FUNÇÃO NA API PARA CADASTRAR
    $scope.cadastrar = function () {
        if ($scope.formulario.nome != null && $scope.formulario.nome != ''  && $scope.formulario.data_agenda != null) {
            axios({
                method: 'post',
                url: 'http://localhost:3000/cadastrar_cliente',
                data: $scope.formulario
            }).then(function (response) {
                $scope.getlista() //Gerar uma nova lista atualizada
            })
                .catch(function (error) {
                    console.log(error);
                });
        } else{
            alert('Erro ao cadastrar, verifique os campos!')
        }
    }

    //CHAMA A FUNÇÃO NA API PARA DELETAR
    $scope.deletar = function (id_cliente) {
        axios.get('http://localhost:3000/deletar/' + id_cliente)
            .then(function (response) {
                $scope.getlista() //Gerar uma nova lista atualizada
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //EDITAR
    $scope.edit = function (formulario, idx) {
        //Pegando os dados da tela e atualizando
        $scope.formulario = angular.copy(formulario)
        //idx recebe o valor atual da posição se atualizando confor o registro
        $scope.idx = idx
    };

    //Alterar
    $scope.alterar = function () {
        //Na lista pelo idx posição que foi clicado, estou recebendo os novos dados do formulario
        $scope.listar[$scope.idx] = angular.copy($scope.formulario)
        $scope.limpar()
    }
}]);