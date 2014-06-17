var promoService = angular.module('SAATapp')
    .service( 'PromoService', [ '$rootScope', '$http', '$q',
        function( $rootScope, $http, q ) {
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
                var TESTPROMO = {
                    mid: 1000999,
                    name: 'TESTPROMO',
                    desc: 'THIS IS A TEST',
                    cid: 1000999,
                    goLive: '06891290',
                    endTime: '06891290'    
                };

                var promise = this.postNewPromo(TESTPROMO);
                promise.then(function(status){
                    console.log(status);
                    switch(status){
                        case 200:
                            promoService.promos.push( TESTPROMO );
                            $rootScope.$broadcast( 'promos.update' );
                            break;
                        default:
                            console.log('you got server problems');
                    }
                });
                
            }; 
            
            this.postNewPromo = function ( promo ) {
                console.log("managed to get to postNewPromo")
                var deferred = q.defer(),
                    scope = this;   
                
                $http({   
                    method: 'POST',
                    url: '/newPromo',
                    data: promo,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }) 
                    .success( function(data, status, headers, config) {
                        deferred.resolve(data);
                    })
                    .error( function(data, status, headers, config) {
                        console.log(status);
                        deferred.reject(status);
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