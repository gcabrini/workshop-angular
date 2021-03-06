(function(ng) {

    ng.module('app')
        .service('PersonService',  PersonService);

    PersonService.$inject = ['$http', 'Utils'];

    function PersonService($http, Utils) {
        this.apiEndpoint = Utils.localUrl + '/api/v1/clients/';
        this.fetchAll = fetchAll;
        this.save = save;
        this.remove = remove;

        function fetchAll() {
            return $http.get(this.apiEndpoint);
        }

        function save(p) {
            if (p._id) {
                return $http.put(this.apiEndpoint + p._id, p);
            } else {
                return $http.post(this.apiEndpoint, {
                    'name': p.name,
                    'lastName': p.lastName
                });
            }
        }

        function remove(p) {
            return $http.delete(this.apiEndpoint + p._id);
        }
    }
})(angular);