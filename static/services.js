var promoService = angular.module('SAATapp')
    .service( 'PromoService', [ '$rootScope', '$http', '$q', '$location',   //here we import rootScope (dont remember why), http (angular's AJAX), q (angular's promise service), and location (used to manipulate url routing manually)
        function( $rootScope, $http, q, location ) {
            var promos = []; //we'll keep local promo state here...probably not neccesary tbh, we could just cut out the middleman and deal just with the restful service, but I felt like trying this out
            //in retrospect, I should have included some indexing pattern for promos, that would have made certain functions a lot cleaner.  oh well.
            
            // syncPromos() - just grab a fresh list of promos from the server and overwrite what we have in promos
            this.syncPromos = function(){
                console.log('syncPromos() called');
                $http({ method: 'GET', url: '/getAllPromos'}) 
                    .success( function(data, status, headers, config) {
                        promos = data;
                    })
                    .error( function(data, status, headers, config) {
                        alert('getPromoData failed, check server');
                        console.error(data, status);
                    })
                ; // end http
            };
            
            // addPromo() - called for handling new promos, uses postNewPromo() (below) for the actual posting, to make an example of promises
            this.addPromo = function ( promo ) {
                var promise = this.postNewPromo( promo );
                
                promise.then(function(result){
                    if (result != false) {
                        promos.push(result);
                        alert('program added succesfully');
                        location.path('/view'); //redirects the app to the /view route, with all the associated changes to url, controller, view, etc
                    } else {
                        alert('oh jeez, adding new promo failed');
                    }
                });
            }; 
            
            // postNewPromo() - handles the dirty work of posting, returns a promise object
            this.postNewPromo = function ( promo ) {
                var deferred = q.defer();   
                
                $http({   
                    method: 'POST',
                    url: '/newPromo',
                    data: promo
                }) 
                    .success( function(data, status, headers, config) {
                        deferred.resolve(data);
                    })
                    .error( function(data, status, headers, config) {
                        console.log('post promo failed', status);
                        deferred.reject(false);
                    }); // end http
                
                return deferred.promise;
            };
            
            // editPromo...updates a promo's information.  
            this.editPromo = function( changedPromo ) {  
                var scope = this;
                console.log(this);
                $http({
                    method: 'PUT',
                    url: '/editPromo',
                    data: changedPromo
                })
                    .success( function(data, status, headers, config) {
                        //var index = scope.getPromoIndex(changedPromo.pid);  
                        //scope.promos[index] = changedPromo;
                        $rootScope.$broadcast( 'promos.update' );
                        alert('program edited succesfully');
                        location.path('/view'); //redirects the app to the /view route, with all the associated changes to url, controller, view, etc
                    })
                    .error( function(data, status) {
                        console.log(data, status);
                    }); //end http
            };
            
            //misc. convenince functions
            
            this.getPromos = function(){
                return promos;
            };
            
            this.getPromoIndex = function( id ) {
                for( var i=0 ; i < promos.length ; i++ ){
                    if ( promos[i].pid == id ) {
                        return i;
                    }
                }
                return false;
            };
            
            this.getPromoById = function( id ) { 
                var result = {};
                for( var i=0 ; i < promos.length ; i++ ){
                    if ( promos[i].pid == id ) {
                        result = promos[i];
                    }
                }
                return result;
            };
            
            this.getPromoByIndex = function(index){
                if (promos[index].typeOf != undefined) {
                    return promos[index];
                } else {
                    return false;
                }
            };
            
        }
    ]);
promoService.$inject = ['$rootScope', '$http'];  // pretty sure this is redundant with injection at the beginning