(function(ng) {
    ng.module('app')
        .controller('PersonCtrl', PersonController);

    PersonController.$inject = ['config', 'PersonService'];

    function PersonController(config, personService) {
        var vm = this;
        vm.person = {
            _id: '',
            name: '',
            lastName: ''
        };
        vm.order = 'name';
        vm.remove = remove;
        vm.save = save;
        vm.edit = edit;

        // Load all users
        fetchAll();

        function remove(p) {
            personService.remove(p)
                .then(function(response) {
                    fetchAll();
                });
        }

        function save(p) {
            personService.save(p)
                .then(function(response) {
                    resetForm();
                    fetchAll();
                });
        }

        function fetchAll() {
            personService.fetchAll()
                .then(function(response) {
                    vm.persons = response.data;
                });
        }

        function edit(p) {
            vm.editAction = true;
            vm.person._id = p._id;
            vm.person.name = p.name;
            vm.person.lastName = p.lastName;
        }

        function resetForm() {
            vm.editAction = false;
            vm.person = {};
        }
    }

})(angular);