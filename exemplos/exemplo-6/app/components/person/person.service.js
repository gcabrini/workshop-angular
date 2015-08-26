(function(ng) {

    ng.module('app', [])
        .service('PersonService',  PersonService);

    function PersonService() {
        this.inserir = function Inserir(persons, p) {
            persons.push(p);
            return persons;
        }

        this.excluir = function Excluir(persons, p) {
            return persons.splice(persons.indexOf(p), 1);
        }
    }
})(angular);