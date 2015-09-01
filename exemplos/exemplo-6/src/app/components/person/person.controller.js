(function(ng) {
    ng.module('app')
        .controller('PersonCtrl', PersonController);

    function PersonController(config, personService) {
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
            vm.person = personService.excluir(vm.persons, p);
        }

        function inserir(p) {
            vm.person = personService.inserir(vm.persons, p);
            vm.person = {};
        }
    }

    PersonController.$inject = ['config', 'PersonService'];

})(angular);