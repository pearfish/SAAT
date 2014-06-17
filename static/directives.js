//example directive

// ** file not attached to app **

module.directive( "addBookButton", [ 'Book', function( Book ) {
    return {
        restrict: "A",
        link: function( scope, element, attrs ) {
            element.bind( "click", function() {
                Book.addBook( { title: "Star Wars", author: "George Lucas" } );
            });
        }
    }
}]);

// in HTML : <button add-book-button>Add book</button>