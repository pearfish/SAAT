var promoService = angular.module('SAATapp')
    .service( 'PromoService', [ '$rootScope', '$http', '$q', '$location',
        function( $rootScope, $http, q, location ) {
            var promos = [];
                        
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
            
            this.addPromo = function ( promo ) {
                console.log('promoService.addPromo() called');

                var promise = this.postNewPromo( promo );
                promise.then(function(result){
                    if (result != false) {
                        promos.push(result);
                        alert('program added succesfully');
                        $location.path('/view');
                    } else {
                        alert('oh jeez adding new promo failed');
                    }
                });
            }; 
            
            this.postNewPromo = function ( promo ) {
                console.log(promo);
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
            
            this.getPromos = function(){
                return promos;
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
            
            /*
            
            ,
            editPromo: function: ( changedPromo ) {  
                $http({ method: 'PUT', url: '/editPromo', data: changedPromo})
                    .success( function(data, status, headers, config) {
                        promoService.promos[changedPromo..push( promo );
                        $rootScope.$broadcast( 'promos.update' );
                    })
            }
              
            */
        }
    ]);
promoService.$inject = ['$rootScope', '$http'];