var promoService = angular.module('SAATapp')
    .service( 'PromoService', [ '$rootScope', '$http',
        function( $rootScope, $http ) {
            var promos = [];
                        
            this.syncPromos = function(){
                console.log('syncPromos() called');
                $http({ method: 'GET', url: '/promos'}) 
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
                $http({ method: 'POST', url: '/newPromo', data: promo}) 
                    .success( function(data, status, headers, config) {
                        promoService.promos.push( promo );
                        $rootScope.$broadcast( 'promos.update' );
                    })
                    .error( function(data, status, headers, config) {
                        alert('addPromo failed, check server');
                        console.error(data, status);
                    })
                ; // end http
            };
            
            this.getPromos = function(){
                return promos;
            };
            
            this.getPromoById = function( id ) {
                var result = {}
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