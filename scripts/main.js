import StatTables from './tables.js'


Hooks.on("init", function() {
  game.settings.register("pf2e-quick-creature-builder", "creatureName", {
    name: 'Creature Name',
    hint: 'The name of the creature to be generated',
    scope: 'world',
    config: true,
    type: Object,
    default: StatTables.getDefaultStats(),
    filePicker: false,
    requiresReload: false
  });


  CreatureBuilder.initialize();
});



Hooks.on("ready", async function() {
   await CreatureBuilderData.setCreatureBuilder(StatTables.getDefaultStats());
  StatTables.initializeAllTables();
})

Hooks.on('renderActorDirectoryPF2e', (app, html, data) => {
  const actionButtons = html.find('.header-actions');
  const openCreatureBuilderButton = `<button type='button' class='open-creature-builder-button flex0'>Open Quick Creature Builder</button>`;
  actionButtons.append(openCreatureBuilderButton);

  html.on('click','.open-creature-builder-button', (event) => {
    CreatureBuilder.CreatureBuilderApplication.render(true);
  })
})

class CreatureBuilder {
  static ID = 'pf2e-quick-creature-builder';
  static settingID = 'creatureName';

  static TEMPLATES = {
    CREATUREBUILDER: `modules/pf2e-quick-creature-builder/templates/creature-builder.hbs`
  }

  static initialize() {
    this.CreatureBuilderApplication = new CreatureBuilderApplication();
    Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });
    Handlebars.registerHelper('ifIn', function(arg1, arg2, options) {
      return (arg2.includes(arg1)) ? options.fn(this) : options.inverse(this);
    });
  }

}

class CreatureBuilderData {
  static getCreatureName() {
    return game.settings.get('pf2e-quick-creature-builder','creatureName').Name;
  }

  static setCreatureName(newName) {
    newObj = {};
    newObj.Name = newName;
    game.settings.set('pf2e-quick-creature-builder','creatureName',newObj);
  }

  static resetCreature() {
    game.settings.set('pf2e-quick-creature-builder','creatureName',{"Name": 'test name'});
  }

  static async setCreatureBuilder(newObject) {
    await game.settings.set(CreatureBuilder.ID, CreatureBuilder.settingID, newObject);
  }

  static getCreatureBuilder() { 
    return game.settings.get(CreatureBuilder.ID, 'creatureName');
  }

  static async addSkill() {
    if(this.getCreatureBuilder.skillsCount>=16) {
      console.error('Maximum Skills Reached');
    } else {
      await this.incrementSkillsCount();
      let newObj = this.getCreatureBuilder();
      const skillNum = newObj.skillsCount;
      newObj.skills['skill'+skillNum.toString()].trained=true;
      await this.setCreatureBuilder(newObj);
    }
  }

  static async addStrike() {
    if(this.getCreatureBuilder.strikesCount>=6) {
      console.error('Maximum Strikes Reached');
    } else {
      await this.incrementStrikesCount();
      let newObj = this.getCreatureBuilder();
      const strikeNum = newObj.strikesCount;
      newObj.strikes['strike'+strikeNum.toString()].enabled=true;
      await this.setCreatureBuilder(newObj);
    }
  }

  static async incrementSkillsCount() {
    await this.setCreatureBuilder(foundry.utils.mergeObject(this.getCreatureBuilder(), {
      skillsCount: this.getCreatureBuilder().skillsCount + 1
    }));
  }

  static async incrementStrikesCount() {
    await this.setCreatureBuilder(foundry.utils.mergeObject(this.getCreatureBuilder(), {
      strikesCount: this.getCreatureBuilder().strikesCount + 1
    }));
  }


  static getActorOptions() {
    const creatureLevel = this.getCreatureBuilder().level.toString();
      const actorOptions = {
          name: CreatureBuilderData.getCreatureBuilder().Name,
          type: "npc",
          system: {
              attributes: {
                  ac: {
                    details: "",
                    value: StatTables.getStatConversion('ac', this.getCreatureBuilder().ac.value, creatureLevel)
                  },
                  speed: {
                    value: 25,
                    otherSpeeds: [],
                    details: ""
                  },
                  hp: {
                    details: '',
                    value: StatTables.getStatConversion('hp', this.getCreatureBuilder().hp.value, creatureLevel),
                    max: StatTables.getStatConversion('hp', this.getCreatureBuilder().hp.value, creatureLevel)
                  }
              },
              abilities: {
                  str:{
                    mod: StatTables.getStatConversion('str', this.getCreatureBuilder().str.value, creatureLevel)
                  },
                  dex:{
                    mod: StatTables.getStatConversion('dex', this.getCreatureBuilder().dex.value, creatureLevel)
                  },
                  con:{
                    mod: StatTables.getStatConversion('con', this.getCreatureBuilder().con.value, creatureLevel)
                  },
                  int:{
                    mod: StatTables.getStatConversion('int', this.getCreatureBuilder().int.value, creatureLevel)
                  },
                  wis:{
                    mod: StatTables.getStatConversion('wis', this.getCreatureBuilder().wis.value, creatureLevel)
                  },
                  cha:{
                    mod: StatTables.getStatConversion('cha', this.getCreatureBuilder().cha.value, creatureLevel)
                  }
              },
              perception: {
                details: '',
                vision: true,
                mod: StatTables.getStatConversion('perception', this.getCreatureBuilder().perception.value, creatureLevel)
              },
              saves: {
                fortitude:{
                  saveDetails:'',
                  value: StatTables.getStatConversion('fort', this.getCreatureBuilder().fort.value, creatureLevel)
                },
                reflex:{
                  saveDetails:'',
                  value: StatTables.getStatConversion('ref', this.getCreatureBuilder().ref.value, creatureLevel)
                },
                will:{
                  saveDetails:'',
                  value: StatTables.getStatConversion('will', this.getCreatureBuilder().will.value, creatureLevel)
                }
              },
              details: {
                level: {
                  value: this.getCreatureBuilder().level
                }
              }
              
            
        }};
      return actorOptions;
    
}

  static async buildSpellcastingItem() {
    const tradition = this.getCreatureBuilder().spellcasting.tradition;
    const style = this.getCreatureBuilder().spellcasting.style.value;
    const prof = this.getCreatureBuilder().spellcasting.spellProf.value;
    const spellItemData = {
      name: tradition+' '+style+' Spellcasting',
      type: 'spellcastingEntry',
      system: {
        ability: {
          value: this.getCreatureBuilder().spellcasting.ability.value
        },
        tradition: {
          value: this.getCreatureBuilder().spellcasting.tradition.value
        },
        prepared: {
          value: this.getCreatureBuilder().spellcasting.style.value
        },
        spelldc: {
          mod: 0,
          value: StatTables.getStatConversion('spell', prof, this.getCreatureBuilder().level.toString())[1],
          dc: StatTables.getStatConversion('spell', prof, this.getCreatureBuilder().level.toString())[0]
        }
      }
      
    };
    await Item.create(spellItemData, {parent: game.actors.getName(this.getCreatureBuilder().Name)});
  }

  static async buildSkillItems() {
    let i=1;
    const creatureObj = this.getCreatureBuilder();
    while (i<=creatureObj.skillsCount) {
      let skillObj = creatureObj.skills['skill'+i.toString()];
      let capitalizedName = skillObj.name.charAt(0).toUpperCase() + skillObj.name.slice(1);
      let skillItemData = {
        type: 'lore',
        name: capitalizedName,
        system: {
          mod: {
            value: StatTables.getStatConversion('skill', skillObj.value, creatureObj.level.toString())
          }
        }
      };
      await Item.create(skillItemData, {parent: game.actors.getName(creatureObj.Name)});
      i+=1;
    }
  }

  static async buildStrikeItems() {
    let i=1;
    const creatureObj = this.getCreatureBuilder();
    const creatureLevel = creatureObj.level.toString();
    while (i<=creatureObj.strikesCount) {
      let strikeObj = creatureObj.strikes['strike'+i.toString()];
      let damageID = foundry.utils.randomID(16);
      let strikeItemData = {
        type: 'melee',
        name: strikeObj.name,
        system: {
          bonus: {
            value: StatTables.getStatConversion('strikeBonus',strikeObj.bonus.value,creatureLevel)
          },
          damageRolls: {

          },
          traits:{}
        }
      };
      strikeItemData.system.damageRolls[damageID]= {
        damage: StatTables.getStatConversion('strikeDamage',strikeObj.damage.value,creatureLevel),
        damageType:strikeObj.type.value
      };

      if(strikeObj.range.value=='ranged') {
        strikeItemData.system.traits.value= ['range-increment-60']
      }
      await Item.create(strikeItemData, {parent: game.actors.getName(creatureObj.Name)});
      i+=1;
    }
  }

}

class CreatureBuilderApplication extends FormApplication {
  constructor() {
    super();
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      popOut: true,
      template: CreatureBuilder.TEMPLATES.CREATUREBUILDER,
      id: 'pf2e-quick-creature-builder',
      title: 'Quick Creature Builder',
      settingID: 'creatureName',
      closeOnSubmit: false,
      submitOnChange: true
    });

  }

  getData(options) {
    return {stats: game.settings.get(options.id, options.settingID)};
  }

  async _updateObject(event, formData) {
    let data = foundry.utils.expandObject(formData);

    const mergedData = foundry.utils.mergeObject(CreatureBuilderData.getCreatureBuilder(), data);

    await game.settings.set('pf2e-quick-creature-builder', 'creatureName', mergedData);
    this.render();
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.on('click', "[data-action]", this._handleButtonClick.bind(this));
  }

  async _handleButtonClick(event) {
    const clickedElement = $(event.currentTarget);
    const action = clickedElement.data().action;

    switch (action) {
      case 'generate': {
        const creatureStats= CreatureBuilderData.getActorOptions();

        await Actor.create(creatureStats);
        if(CreatureBuilderData.getCreatureBuilder().spellcasting.tradition != 'none') {
          await CreatureBuilderData.buildSpellcastingItem();
        }
        if(CreatureBuilderData.getCreatureBuilder().skillsCount > 0) {
          await CreatureBuilderData.buildSkillItems();
        }
        if(CreatureBuilderData.getCreatureBuilder().strikesCount > 0) {
          await CreatureBuilderData.buildStrikeItems();
        }
        break;
      }

      case 'addSkill': {
        await CreatureBuilderData.addSkill();
        this.render();
        break;
      }

      case 'addStrike': {
        await CreatureBuilderData.addStrike();
        this.render()
        break;
      }

      default: {
        console.log('Button press error');
      }
    }
  }
}