export default class StatTables {

    static id = 'pf2e-quick-creature-builder';
    static abilityTableID = 'abilityTable';
    static perceptionTableID = 'perceptionTable';
    static acTableID = 'acTable';
    static saveTableID = 'saveTable';
    static hpTableID = 'hpTable';
    static spellTableID = 'spellTable';
    static skillTableID = 'skillTable';
    static strikeBonusTableID = 'strikeBonusTable';
    static strikeDamageTableID = 'strikeDamageTable';

    static allStatsList = [
        'str', 'dex', 'con', 'int', 'wis', 'cha', 'perception', 'ac', 'ref', 'will', 'fort', 'hp'
    ];
    static allSkillsList = ['skill','acrobatics', 'arcana', 'athletics', 'crafting', 'deception', 'diplomacy', 'intimidation', 'medicine', 'nature', 'occultism', 'performance', 'religion', 'society', 'stealth', 'survival', 'theivery', 'lore'];

    static allDamageTypesList = ['acid', 'cold', 'electricity', 'fire', 'force', 'sonic', 'vitality', 'void', 'bleed', 'bludgeoning', 'slashing', 'piercing', 'mental', 'poison', 'spirit', 'untyped'];

    static getDefaultStats() {
        this.defaultStats = {};
        this.defaultStats.Name = 'Creature Name';
        this.defaultStats.level = 1;
        this.defaultStats.spellcasting = {
            tradition: 'none',
            allowedValues: ['none', 'arcane', 'primal', 'occult', 'divine'],
            spellProf: {
                value: 'moderate',
                allowedValues: this.getAllowedValuesByStat('spell')
            },
            style:{
                value: 'inate',
                allowedValues: ['prepared', 'spontaneous', 'innate']
            },
            ability:{
                value: 'cha',
                allowedValues: ['int', 'wis', 'cha']
            }
        };
        this.allStatsList.forEach((element) => {
            this.defaultStats[element]= {
                value: 'moderate',
                allowedValues: this.getAllowedValuesByStat(element)
            }
        });
        this.defaultStats.skills = {};
        let i=1;
        while(i<17) {
            this.defaultStats.skills['skill'+i.toString()]= {
                trained: false,
                name: 'skill',
                allowedNames: this.allSkillsList,
                value: 'moderate',
                allowedValues: this.getAllowedValuesByStat('skill')
            };
            i+=1;
        }
        this.defaultStats.skillsCount = 0;
        this.defaultStats.strikes = {};
        let j=1;
        while(j<=6) {
            this.defaultStats.strikes['strike'+j.toString()] = {
                enabled: j==1,
                name: 'strike name',
                bonus: {
                    value: 'moderate',
                    allowedValues: this.getAllowedValuesByStat('strike')
                },
                damage: {
                    value: 'moderate',
                    allowedValues: this.getAllowedValuesByStat('strike')
                },
                range: {
                    value: 'melee',
                    allowedValues: ['melee', 'ranged']
                },
                type: {
                    value: 'untyped',
                    allowedValues: this.allDamageTypesList
                }
            }
            j+=1;
        }
        this.defaultStats.strikesCount=1;

        return this.defaultStats;


    }

    static getAbilityTable() {
        return game.settings.get(this.id, this.abilityTableID);
    }

    static getPerceptionTable() {
        return game.settings.get(this.id, this.perceptionTableID);
    }

    static getACTable() {
        return game.settings.get(this.id, this.acTableID);
    }

    static getSaveTable() {
        return game.settings.get(this.id, this.saveTableID);
    }

    static getHPTable() {
        return game.settings.get(this.id, this.hpTableID);
    }

    static getSpellTable() {
        return game.settings.get(this.id, this.spellTableID);
    }

    static getSkillTable() {
        return game.settings.get(this.id, this.skillTableID);
    }

    static getStrikeBonusTable() {
        return game.settings.get(this.id, this.strikeBonusTableID);
    }

    static getStrikeDamageTable() {
        return game.settings.get(this.id, this.strikeDamageTableID);
    }

    static initializeAllTables() {
        this.initializeACTable();
        this.initializeAbilityTable();
        this.initializeHPTable();
        this.initializePerceptionTable();
        this.initializeSaveTable();
        this.initializeSpellTable();
        this.initializeSkillTable();
        this.initializeStrikeBonusTable();
        this.initializeStrikeDamageTable();
    }

    static getStatConversion(stat, value, level) {
        switch(stat) {
            case 'str': return this.getAbilityTable()[level][value];

            case 'dex': return this.getAbilityTable()[level][value];

            case 'con': return this.getAbilityTable()[level][value];

            case 'int': return this.getAbilityTable()[level][value];

            case 'wis': return this.getAbilityTable()[level][value];

            case 'cha': return this.getAbilityTable()[level][value];

            case 'perception': return this.getPerceptionTable()[level][value];

            case 'ac': return this.getACTable()[level][value];

            case 'ref': return this.getSaveTable()[level][value];

            case 'will': return this.getSaveTable()[level][value];

            case 'fort': return this.getSaveTable()[level][value];

            case 'hp': return this.getHPTable()[level][value];

            case 'spell': return this.getSpellTable()[level][value];

            case 'skill': return this.getSkillTable()[level][value];

            case 'strikeBonus': return this.getStrikeBonusTable()[level][value];

            case 'strikeDamage': return this.getStrikeDamageTable()[level][value];
        }
        
    }


    static getAllowedValuesByStat(stat) {
        switch(stat) {
            case 'strike': {
                return ['extreme', 'high', 'moderate', 'low'];
                break;
            }
            case 'skill':{
                return ['extreme', 'high', 'moderate', 'low'];
                break;
            }
            case 'spell': {
                return ['extreme', 'high', 'moderate'];
                break;
            }
            case 'str': {
                return ['extreme', 'high', 'moderate', 'low'];
                break;
            }

            case 'dex': {
                return ['extreme', 'high', 'moderate', 'low'];
                break;
            }
            case 'con':{
                return ['extreme', 'high', 'moderate', 'low'];
                break;
            }
            case 'int':{
                return ['extreme', 'high', 'moderate', 'low'];
                break;
            }
            case 'wis':{
                return ['extreme', 'high', 'moderate', 'low'];
                break;
            }
            case 'cha':{
                return ['extreme', 'high', 'moderate', 'low'];
                break;
            }
            case 'perception':{
                return ['extreme', 'high', 'moderate', 'low', 'terrible'];
                break;
            }
            case 'ac': {
                return ['extreme', 'high', 'moderate', 'low'];
                break;
            }
            case 'fort':{
                return ['extreme', 'high', 'moderate', 'low', 'terrible'];
                break;
            }
            case 'ref':{
                return ['extreme', 'high', 'moderate', 'low', 'terrible'];
                break;
            }
            case 'will':{
                return ['extreme', 'high', 'moderate', 'low', 'terrible'];
                break;
            }
            case 'hp':{
                return ['high', 'moderate', 'low'];
                break;
            }
        }
    }

    static initializeStrikeBonusTable() {
        const strikeBonusTable = {
            '–1':{extreme: 10, high: 8, moderate: 6, low: 4},'0':{extreme: 10, high: 8, moderate: 6, low: 4},'1':{extreme: 11, high: 9, moderate: 7, low: 5},'2':{extreme: 13, high: 11, moderate: 9, low: 7},'3':{extreme: 14, high: 12, moderate: 10, low: 8},'4':{extreme: 16, high: 14, moderate: 12, low: 9},'5':{extreme: 17, high: 15, moderate: 13, low: 11},'6':{extreme: 19, high: 17, moderate: 15, low: 12},'7':{extreme: 20, high: 18, moderate: 16, low: 13},'8':{extreme: 22, high: 20, moderate: 18, low: 15},'9':{extreme: 23, high: 21, moderate: 19, low: 16},'10':{extreme: 25, high: 23, moderate: 21, low: 17},'11':{extreme: 27, high: 24, moderate: 22, low: 19},'12':{extreme: 28, high: 26, moderate: 24, low: 20},'13':{extreme: 29, high: 27, moderate: 25, low: 21},'14':{extreme: 31, high: 29, moderate: 27, low: 23},'15':{extreme: 32, high: 30, moderate: 28, low: 24},'16':{extreme: 34, high: 32, moderate: 30, low: 25},'17':{extreme: 35, high: 33, moderate: 31, low: 27},'18':{extreme: 37, high: 35, moderate: 33, low: 28},'19':{extreme: 38, high: 36, moderate: 34, low: 29},'20':{extreme: 40, high: 38, moderate: 36, low: 31},'21':{extreme: 41, high: 39, moderate: 37, low: 32},'22':{extreme: 43, high: 41, moderate: 39, low: 33},'23':{extreme: 44, high: 42, moderate: 40, low: 35},'24':{extreme: 46, high: 44, moderate: 42, low: 36}
        };
        game.settings.register(this.id, this.strikeBonusTableID, {
            name: 'NPC Strike Bonus Table',
            hint: 'NPC strike bonus table',
            scope: 'world',
            config: true,
            type: Object,
            default: strikeBonusTable,
            filePicker: false,
            requiresReload: false
        });
    }

    static initializeStrikeDamageTable() {
        const strikeDamageTable = {
            '–1':{extreme: '1d6+1', high: '1d4+1', moderate: '1d4', low: '1d4'},'0':{extreme: '1d6+3', high: '1d6+2', moderate: '1d4+2', low: '1d4+1'},'1':{extreme: '1d8+4', high: '1d6+3', moderate: '1d6+2', low: '1d4+2'},'2':{extreme: '1d12+4', high: '1d10+4', moderate: '1d8+4', low: '1d6+3'},'3':{extreme: '1d12+8', high: '1d10+6', moderate: '1d8+6', low: '1d6+5'},'4':{extreme: '2d10+7', high: '2d8+5', moderate: '2d6+5', low: '2d4+4'},'5':{extreme: '2d12+7', high: '2d8+7', moderate: '2d6+6', low: '2d4+6'},'6':{extreme: '2d12+10', high: '2d8+9', moderate: '2d6+8', low: '2d4+7'},'7':{extreme: '2d12+12', high: '2d10+9', moderate: '2d8+8', low: '2d6+6'},'8':{extreme: '2d12+15', high: '2d10+11', moderate: '2d8+9', low: '2d6+8'},'9':{extreme: '2d12+17', high: '2d10+13', moderate: '2d8+11', low: '2d6+9'},'10':{extreme: '2d12+20', high: '2d12+13', moderate: '2d10+11', low: '2d6+10'},'11':{extreme: '2d12+22', high: '2d12+15', moderate: '2d10+12', low: '2d8+10'},'12':{extreme: '3d12+19', high: '3d10+14', moderate: '3d8+12', low: '3d6+10'},'13':{extreme: '3d12+21', high: '3d10+16', moderate: '3d8+14', low: '3d6+11'},'14':{extreme: '3d12+24', high: '3d10+18', moderate: '3d8+15', low: '3d6+13'},'15':{extreme: '3d12+26', high: '3d12+17', moderate: '3d10+14', low: '3d6+14'},'16':{extreme: '3d12+29', high: '3d12+18', moderate: '3d10+15', low: '3d6+15'},'17':{extreme: '3d12+31', high: '3d12+19', moderate: '3d10+16', low: '3d6+16'},'18':{extreme: '3d12+34', high: '3d12+20', moderate: '3d10+17', low: '3d6+17'},'19':{extreme: '4d12+29', high: '4d10+20', moderate: '4d8+17', low: '4d6+14'},'20':{extreme: '4d12+32', high: '4d10+22', moderate: '4d8+19', low: '4d6+15'},'21':{extreme: '4d12+34', high: '4d10+24', moderate: '4d8+20', low: '4d6+17'},'22':{extreme: '4d12+37', high: '4d10+26', moderate: '4d8+22', low: '4d6+18'},'23':{extreme: '4d12+39', high: '4d12+24', moderate: '4d10+20', low: '4d6+19'},'24':{extreme: '4d12+42', high: '4d12+26', moderate: '4d10+22', low: '4d6+21'}
        };
        game.settings.register(this.id, this.strikeDamageTableID, {
            name: 'NPC Strike Damage Table',
            hint: 'NPC strike damage table',
            scope: 'world',
            config: true,
            type: Object,
            default: strikeDamageTable,
            filePicker: false,
            requiresReload: false
        })
    }

    static initializeSkillTable() {
        const skillTable = {
            '–1':{extreme: 8, high: 5, moderate: 4, low: 2},'0':{extreme: 9, high: 6, moderate: 5, low: 3},'1':{extreme: 10, high: 7, moderate: 6, low: 4},'2':{extreme: 11, high: 8, moderate: 7, low: 5},'3':{extreme: 13, high: 10, moderate: 9, low: 7},'4':{extreme: 15, high: 12, moderate: 10, low: 8},'5':{extreme: 16, high: 13, moderate: 12, low: 9},'6':{extreme: 18, high: 15, moderate: 13, low: 10},'7':{extreme: 20, high: 17, moderate: 15, low: 12},'8':{extreme: 21, high: 18, moderate: 16, low: 13},'9':{extreme: 23, high: 20, moderate: 18, low: 15},'10':{extreme: 25, high: 22, moderate: 19, low: 16},'11':{extreme: 26, high: 23, moderate: 21, low: 17},'12':{extreme: 28, high: 25, moderate: 22, low: 19},'13':{extreme: 30, high: 27, moderate: 24, low: 21},'14':{extreme: 31, high: 28, moderate: 25, low: 22},'15':{extreme: 33, high: 30, moderate: 27, low: 23},'16':{extreme: 35, high: 32, moderate: 28, low: 25},'17':{extreme: 36, high: 33, moderate: 30, low: 26},'18':{extreme: 38, high: 35, moderate: 31, low: 27},'19':{extreme: 40, high: 37, moderate: 33, low: 29},'20':{extreme: 41, high: 38, moderate: 34, low: 30},'21':{extreme: 43, high: 40, moderate: 36, low: 31},'22':{extreme: 45, high: 42, moderate: 37, low: 33},'23':{extreme: 46, high: 43, moderate: 38, low: 34},'24':{extreme: 48, high: 45, moderate: 40, low: 36}
        };
        game.settings.register(this.id, this.skillTableID, {
            name: 'NPC Skill Table',
            hint: 'NPC skill table',
            scope: 'world',
            config: true,
            type: Object,
            default: skillTable,
            filePicker: false,
            requiresReload: false
        });
    }

    static initializeSpellTable() {
        const spellTable = {
            '–1': {extreme:[19,11], high:[16,8], moderate:[13,5]},'0': {extreme:[19,11], high:[16,8], moderate:[13,5]},'1': {extreme:[20,12], high:[17,9], moderate:[14,6]},'2': {extreme:[22,14], high:[18,10], moderate:[15,7]},'3': {extreme:[23,15], high:[20,12], moderate:[17,9]},'4': {extreme:[25,17], high:[21,13], moderate:[18,10]},'5': {extreme:[26,18], high:[22,14], moderate:[19,11]},'6': {extreme:[27,19], high:[24,16], moderate:[21,13]},'7': {extreme:[29,21], high:[25,17], moderate:[22,14]},'8': {extreme:[30,22], high:[26,18], moderate:[23,15]},'9': {extreme:[32,24], high:[28,20], moderate:[25,17]},'10': {extreme:[33,25], high:[29,21], moderate:[26,18]},'11': {extreme:[34,26], high:[30,22], moderate:[27,19]},'12': {extreme:[36,28], high:[32,24], moderate:[29,21]},'13': {extreme:[37,29], high:[33,25], moderate:[30,22]},'14': {extreme:[39,31], high:[34,26], moderate:[31,23]},'15': {extreme:[40,32], high:[36,28], moderate:[33,25]},'16': {extreme:[41,33], high:[37,29], moderate:[34,26]},'17': {extreme:[43,35], high:[38,30], moderate:[35,27]},'18': {extreme:[44,36], high:[40,32], moderate:[37,29]},'19': {extreme:[46,38], high:[41,33], moderate:[38,30]},'20': {extreme:[47,39], high:[42,34], moderate:[39,31]},'21': {extreme:[48,40], high:[44,36], moderate:[41,33]},'22': {extreme:[50,42], high:[45,37], moderate:[42,34]},'23': {extreme:[51,43], high:[46,38], moderate:[43,35]},'24': {extreme:[52,44], high:[48,40], moderate:[45,37]}
        };
        game.settings.register(this.id, this.spellTableID, {
            name: 'NPC Spellcasting Table',
            hint: 'NPC spellcasting table',
            scope: 'world',
            config: true,
            type: Object,
            default: spellTable,
            filePicker: false,
            requiresReload: false
        });
    }

    
    static initializeAbilityTable() {
        const abilityTable = {
            '-1': {
                extreme: 3,
                high: 3,
                moderate: 2,
                low: 0
            },
            '0': {
                extreme: 3,
                high: 3,
                moderate: 2,
                low: 0
            },
            '1': {
                extreme: 5,
                high: 4,
                moderate: 3,
                low: 1
            },
            '2': {
                extreme: 5,
                high: 4,
                moderate: 3,
                low: 1
            },
            '3': {
                extreme: 5,
                high: 4,
                moderate: 3,
                low: 1
            },
            '4': {
                extreme: 6,
                high: 5,
                moderate: 3,
                low: 2
            },
            '5': {
                extreme: 6,
                high: 5,
                moderate: 4,
                low: 2
            },
            '6': {
                extreme: 7,
                high: 5,
                moderate: 4,
                low: 2
            },
            '7': {
                extreme: 7,
                high: 5,
                moderate: 4,
                low: 2
            },
            '8': {
                extreme: 7,
                high: 6,
                moderate: 4,
                low: 3
            },
            '9':{
                extreme: 7,
                high:6,
                moderate: 4,
                low: 3
            },
            '10':{
                extreme: 8,
                high:7,
                moderate: 5,
                low: 3
            },
            '11':{
                extreme: 8,
                high:7,
                moderate: 5,
                low: 3
            },
            '12':{
                extreme: 8,
                high:7,
                moderate: 5,
                low: 4
            },
            '13':{
                extreme: 9,
                high:8,
                moderate: 5,
                low: 4
            },
            '14':{
                extreme: 9,
                high:8,
                moderate: 5,
                low: 4
            },
            '15':{
                extreme: 9,
                high:8,
                moderate: 6,
                low: 4
            },
            '16':{
                extreme: 10,
                high:9,
                moderate: 6,
                low: 5
            },
            '17':{
                extreme: 10,
                high:9,
                moderate: 6,
                low: 5
            },
            '18':{
                extreme: 10,
                high:9,
                moderate: 6,
                low: 5
            },
            '19':{
                extreme: 11,
                high:10,
                moderate: 6,
                low: 5
            },
            '20':{
                extreme: 11,
                high:10,
                moderate: 7,
                low: 6
            },
            '21':{
                extreme: 11,
                high:10,
                moderate: 7,
                low: 6
            },
            '22':{
                extreme: 11,
                high:10,
                moderate: 8,
                low: 6
            },
            '23':{
                extreme: 11,
                high:10,
                moderate: 8,
                low: 6
            },
            '24':{
                extreme: 13,
                high:12,
                moderate: 9,
                low: 7
            }
        };

        game.settings.register(this.id, this.abilityTableID, {
            name: 'Ability Score Table',
            hint: 'Ability score table',
            scope: 'world',
            config: true,
            type: Object,
            default: abilityTable,
            filePicker: false,
            requiresReload: false
        })
    }


    static initializePerceptionTable() {
        const perceptionTable = {
            '-1':{
                extreme: 9,
                high: 8,
                moderate: 5,
                low: 2,
                terrible: 0
            },
            '0':{
                extreme: 10,
                high: 9,
                moderate: 6,
                low: 3,
                terrible: 1
            },
            '1':{
                extreme: 11,
                high: 10,
                moderate: 7,
                low: 4,
                terrible: 2
            },
            '2':{
                extreme: 12,
                high: 11,
                moderate: 8,
                low: 5,
                terrible: 3
            },
            '3':{
                extreme: 14,
                high: 12,
                moderate: 9,
                low: 6,
                terrible: 4
            },
            '4':{
                extreme: 15,
                high: 14,
                moderate: 11,
                low: 8,
                terrible: 6
            },
            '5':{
                extreme: 17,
                high: 15,
                moderate: 12,
                low: 9,
                terrible: 7
            },
            '6':{
                extreme: 18,
                high: 17,
                moderate: 14,
                low: 11,
                terrible: 8
            },
            '7':{
                extreme: 20,
                high: 18,
                moderate: 15,
                low: 12,
                terrible: 10
            },
            '8':{
                extreme: 21,
                high: 19,
                moderate: 16,
                low: 13,
                terrible: 11
            },
            '9':{
                extreme: 23,
                high: 21,
                moderate: 18,
                low: 15,
                terrible: 12
            },
            '10':{
                extreme: 24,
                high: 22,
                moderate: 19,
                low: 16,
                terrible: 14
            },
            '11':{
                extreme: 26,
                high: 24,
                moderate: 21,
                low: 18,
                terrible: 15
            },
            '12':{
                extreme: 27,
                high: 25,
                moderate: 22,
                low: 19,
                terrible: 16
            },
            '13':{
                extreme: 29,
                high: 26,
                moderate: 23,
                low: 20,
                terrible: 18
            },
            '14':{
                extreme: 30,
                high: 28,
                moderate: 25,
                low: 22,
                terrible: 19
            },
            '15':{
                extreme: 32,
                high: 29,
                moderate: 26,
                low: 23,
                terrible: 20
            },
            '16':{
                extreme: 33,
                high: 30,
                moderate: 28,
                low: 25,
                terrible: 22
            },
            '17':{
                extreme: 35,
                high: 32,
                moderate: 29,
                low: 26,
                terrible: 23
            },
            '18':{
                extreme: 36,
                high: 33,
                moderate: 30,
                low: 27,
                terrible: 24
            },
            '19':{
                extreme: 38,
                high: 35,
                moderate: 32,
                low: 29,
                terrible: 26
            },
            '20':{
                extreme: 39,
                high: 36,
                moderate: 33,
                low: 30,
                terrible: 27
            },
            '21':{
                extreme: 41,
                high: 38,
                moderate: 35,
                low: 32,
                terrible: 28
            },
            '22':{
                extreme: 43,
                high: 39,
                moderate: 36,
                low: 33,
                terrible: 30
            },
            '23':{
                extreme: 44,
                high: 40,
                moderate: 37,
                low: 34,
                terrible: 31
            },
            '24':{
                extreme: 46,
                high: 42,
                moderate: 38,
                low: 36,
                terrible: 32
            }
        };

        game.settings.register(this.id, this.perceptionTableID, {
            name: 'Perception Table',
            hint: 'perception values by level',
            scope: 'client',
            config: true,
            type: Object,
            default: perceptionTable,
            filePicker: false,
            requiresReload: false
        });
    }

    static initializeACTable() {
        const acTable = {
            '-1': {
                extreme: 18,
                high: 15,
                moderate: 14,
                low: 12
            },
            '0':{
                extreme: 19,
                high: 16,
                moderate: 15,
                low: 13
            },
            '1':{
                extreme: 19,
                high: 16,
                moderate: 15,
                low: 13
            },
            '2':{
                extreme: 21,
                high: 18,
                moderate: 17,
                low: 15
            },
            '3':{
                extreme: 22,
                high: 19,
                moderate: 18,
                low: 16
            },
            '4':{
                extreme: 24,
                high: 21,
                moderate: 20,
                low: 18
            },
            '5':{
                extreme: 25,
                high: 22,
                moderate: 21,
                low: 19
            },
            '6':{
                extreme: 27,
                high: 24,
                moderate: 23,
                low: 21
            },
            '7':{
                extreme: 28,
                high: 25,
                moderate: 24,
                low: 22
            },
            '8':{
                extreme: 30,
                high: 27,
                moderate: 26,
                low: 24
            },
            '9':{
                extreme: 31,
                high: 28,
                moderate:27 ,
                low: 25
            },
            '10':{
                extreme: 33,
                high: 30,
                moderate: 29,
                low: 27
            },
            '11':{
                extreme: 34,
                high: 31,
                moderate: 30,
                low: 28
            },
            '12':{
                extreme: 36,
                high: 33,
                moderate: 32,
                low: 30
            },
            '13':{
                extreme: 37,
                high: 34,
                moderate: 33,
                low: 31
            },
            '14':{
                extreme: 39,
                high: 36,
                moderate: 35,
                low: 33
            },
            '15':{
                extreme: 40,
                high: 37,
                moderate: 36,
                low: 34
            },
            '16':{
                extreme: 42,
                high: 39,
                moderate: 38,
                low: 36
            },
            '17':{
                extreme: 43,
                high: 40,
                moderate: 39,
                low: 37
            },
            '18':{
                extreme: 45,
                high: 42,
                moderate: 41,
                low: 39
            },
            '19':{
                extreme: 46,
                high: 43,
                moderate: 42,
                low: 40
            },
            '20':{
                extreme: 48,
                high: 45,
                moderate: 44,
                low: 42
            },
            '21':{
                extreme: 49,
                high: 46,
                moderate: 45,
                low: 43
            },
            '22':{
                extreme: 51,
                high: 48,
                moderate: 47,
                low: 45
            },
            '23':{
                extreme: 52,
                high: 49,
                moderate: 48,
                low: 46
            },
            '24':{
                extreme: 54,
                high: 51,
                moderate: 50,
                low: 48
            }
        };

        game.settings.register(this.id, this.acTableID, {
            name: 'AC Table',
            hint: 'AC table',
            scope: 'world',
            config: true,
            type: Object,
            default: acTable,
            filePicker: false,
            requiresReload: false
        });
    }

    static initializeSaveTable() {
        const saveTable = {
            '-1':{
                extreme: 9,
                high: 8,
                moderate: 5,
                low: 2, 
                terrible: 0
            },
            '0':{
                extreme: 10,
                high: 9,
                moderate: 6,
                low: 3, 
                terrible: 1
            },
            '1':{
                extreme: 11,
                high: 10,
                moderate: 7,
                low: 4, 
                terrible: 2
            },
            '2':{
                extreme: 12,
                high: 11,
                moderate: 8,
                low: 5, 
                terrible: 3
            },
            '3':{
                extreme: 14,
                high: 12,
                moderate: 9,
                low: 6, 
                terrible: 4
            },
            '4':{
                extreme: 15,
                high: 14,
                moderate: 11,
                low: 8, 
                terrible: 6
            },
            '5':{
                extreme: 17,
                high: 15,
                moderate: 12,
                low: 9, 
                terrible: 7
            },
            '6':{
                extreme: 18,
                high: 17,
                moderate: 14,
                low: 11, 
                terrible: 8
            },
            '7':{
                extreme: 20,
                high: 18,
                moderate: 15,
                low: 12, 
                terrible: 10
            },
            '8':{
                extreme: 21,
                high: 19,
                moderate: 16,
                low: 13, 
                terrible: 11
            },
            '9':{
                extreme: 23,
                high: 21,
                moderate: 18,
                low: 15, 
                terrible: 12
            },
            '10':{
                extreme: 24,
                high: 22,
                moderate: 19,
                low: 16, 
                terrible: 14
            },
            '11':{
                extreme: 26,
                high: 24,
                moderate: 21,
                low: 18, 
                terrible: 15
            },
            '12':{
                extreme: 27,
                high: 25,
                moderate: 22,
                low: 19, 
                terrible: 17
            },
            '13':{
                extreme: 29,
                high: 26,
                moderate: 23,
                low: 20, 
                terrible: 18
            },
            '14':{
                extreme: 30,
                high: 28,
                moderate: 25,
                low: 22, 
                terrible: 19
            },
            '15':{
                extreme: 32,
                high: 29,
                moderate: 26,
                low: 23, 
                terrible: 20
            },
            '16':{
                extreme: 33,
                high: 30,
                moderate: 28,
                low: 25, 
                terrible: 22
            },
            '17':{
                extreme: 35,
                high: 32,
                moderate: 29,
                low: 26, 
                terrible: 23
            },
            '18':{
                extreme: 36,
                high: 33,
                moderate: 30,
                low: 27, 
                terrible: 24
            },
            '19':{
                extreme: 38,
                high: 35,
                moderate: 32,
                low: 29, 
                terrible: 26
            },
            '20':{
                extreme: 39,
                high: 36,
                moderate: 33,
                low: 30, 
                terrible: 27
            },
            '21':{
                extreme: 41,
                high: 38,
                moderate: 35,
                low: 32, 
                terrible: 28
            },
            '22':{
                extreme:43 ,
                high: 39,
                moderate: 36,
                low: 33, 
                terrible: 30
            },
            '23':{
                extreme: 44,
                high: 40,
                moderate: 37,
                low: 34, 
                terrible: 31
            },
            '24':{
                extreme: 46,
                high: 42,
                moderate: 38,
                low: 36, 
                terrible: 32
            }
        };

        game.settings.register(this.id, this.saveTableID, {
            name: 'Save Table',
            hint: 'save table',
            scope: 'world',
            config: true,
            type: Object,
            default: saveTable,
            filePicker: false,
            requiresReload: false
        });
    }

    static initializeHPTable() {
        const hpTable = {
            '-1':{
                high: 9,
                moderate: 8,
                low: 6
            },
            '0':{
                high: 19,
                moderate: 15,
                low: 12
            },
            '1':{
                high: 25,
                moderate: 20,
                low: 15
            },
            '2':{
                high: 38,
                moderate: 30,
                low: 23
            },
            '3':{
                high: 56,
                moderate: 45,
                low: 34
            },
            '4':{
                high: 75,
                moderate: 60,
                low: 45
            },
            '5':{
                high: 94,
                moderate: 75,
                low: 56
            },
            '6':{
                high: 119,
                moderate: 95,
                low: 71
            },
            '7':{
                high: 144,
                moderate: 115,
                low: 86
            },
            '8':{
                high: 169,
                moderate: 135,
                low: 101
            },
            '9':{
                high: 194,
                moderate: 155,
                low: 116
            },
            '10':{
                high: 219,
                moderate: 175,
                low: 131
            },
            '11':{
                high: 244,
                moderate: 195,
                low: 146
            },
            '12':{
                high: 269,
                moderate: 215,
                low: 161
            },
            '13':{
                high: 294,
                moderate: 235,
                low: 176
            },
            '14':{
                high: 319,
                moderate: 235,
                low: 191
            },
            '15':{
                high: 344,
                moderate: 275,
                low: 206
            },
            '16':{
                high: 369,
                moderate: 295,
                low: 221
            },
            '17':{
                high: 394,
                moderate: 315,
                low: 236
            },
            '18':{
                high: 419,
                moderate: 335,
                low: 259
            },
            '19':{
                high: 444,
                moderate: 355,
                low: 266
            },
            '20':{
                high: 469,
                moderate: 375,
                low: 281
            },
            '21':{
                high: 500,
                moderate: 400,
                low: 300
            },
            '22':{
                high: 539,
                moderate: 431,
                low: 325
            },
            '23':{
                high: 575,
                moderate: 460,
                low: 345
            },
            '24':{
                high: 625,
                moderate: 500,
                low: 375
            }
        };

        game.settings.register(this.id, this.hpTableID, {
            name: 'HP Table',
            hint: 'HP table',
            scope: 'world',
            config: true,
            type: Object,
            default: hpTable,
            filePicker: false,
            requiresReload: false
        });
    }
}
