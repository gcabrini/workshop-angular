(function(ng) {
    ng.module('app', [])
        .controller('PersonCtrl', PersonController);

    function PersonController() {
        var vm = this,
            person = { name: '', lastName: '' };

        vm.persons = [
            { name: 'Guilherme', lastName: 'Cabrini' },
            { name: 'Aabrão', lastName: 'Silva' }
        ];

        vm.order = 'name';
        vm.person = person;
        vm.excluir = excluir;
        vm.inserir = inserir;

        function excluir(p) {
            vm.persons.splice(vm.persons.indexOf(p), 1);
        }

        function inserir(p) {
            vm.persons.push(p);
            vm.person = {};
        }
    }


})(angular);