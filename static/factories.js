var gearFactory = angular.module('SAATapp')
    .factory( 'gearFactory', function() {
        return {
            getSlots : function() { 
                var slots = [
                    //all given exotic stats
                    {
                            name: 'helmet',
                            major: 45,
                            minor: 32,
                            celestial: 20
                    },
                    {
                            name: 'shoulder',
                            major: 34,
                            minor: 24,
                            celestial: 15
                    },
                    {
                            name: 'chest',
                            major: 101,
                            minor: 72,
                            celestial: 45
                    },
                    {
                            name: 'pantaloons',
                            major: 67,
                            minor: 48,
                            celestial: 30
                    },
                    {
                            name: 'hands',
                            major: 34,
                            minor: 24,
                            celestial: 15
                    },
                    {
                            name: 'feets',
                            major: 34,
                            minor: 24,
                            celestial: 15
                    }
                ]
                return slots;
            },
            getSets : function() {
                var sets = 
                [
                    {
                        name: 'Berserker',
                        major:  'power',
                        minor1: 'precision',
                        minor2: 'ferocity'
                    },
                    {
                        name: 'Zealot',
                        major:  'power',
                        minor1: 'precision',
                        minor2: 'healing power'
                    },
                    {
                        name: 'Soldier',
                        major:  'power',
                        minor1: 'toughness',
                        minor2: 'vitality'
                    },
                    {
                        name: 'Valkyrie',
                        major:  'power',
                        minor1: 'vitality',
                        minor2: 'ferocity'
                    },			
                    {
                        name: 'Assassin',
                        major:  'precision',
                        minor1: 'power',
                        minor2: 'ferocity'
                    },			
                    {
                        name: 'Rampager',
                        major:  'precision',
                        minor1: 'power',
                        minor2: 'condition damage'
                    },
                    {
                        name: 'Knight',
                        major:  'toughness',
                        minor1: 'power',
                        minor2: 'precision'
                    },
                    {
                        name: 'Cavalier',
                        major:  'toughness',
                        minor1: 'power',
                        minor2: 'ferocity'
                    },
                    {
                        name: 'Settler',
                        major:  'toughness',
                        minor1: 'condition damage',
                        minor2: 'healing power'
                    },
                    {
                        name: 'Giver',
                        major:  'toughness',
                        minor1: 'boon duration',
                        minor2: 'healing power'
                    },
                    {
                        name: 'Sentinel',
                        major:  'vitality',
                        minor1: 'power',
                        minor2: 'toughness'
                    },
                    {
                        name: 'Shaman',
                        major:  'vitality',
                        minor1: 'condition damage',
                        minor2: 'healing power'
                    },
                    {
                        name: 'Carrion',
                        major:  'condition damage',
                        minor1: 'power',
                        minor2: 'vitality'
                    },
                    {
                        name: 'Rabid',
                        major:  'condition damage',
                        minor1: 'precision',
                        minor2: 'toughness'
                    },
                    {
                        name: 'Dire',
                        major:  'condition damage',
                        minor1: 'toughness',
                        minor2: 'vitality'
                    },
                    {
                        name: 'Cleric',
                        major:  'healing power',
                        minor1: 'power',
                        minor2: 'toughness'
                    },
                    {
                        name: 'Magi',
                        major:  'healing power',
                        minor1: 'precision',
                        minor2: 'vitality'
                    },
                    {
                        name: 'Apothecary',
                        major:  'healing power',
                        minor1: 'toughness',
                        minor2: 'condition damage'
                    }
                ]
                return sets;
            }
        }
    }
);