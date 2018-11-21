const Card = require('../../Card.js');

class ArmageddonCloak extends Card {
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: [
                ability.effects.addKeyword({ hazardous: 2 }),
                ability.effects.gainAbility('destroyed', {
                    effect: 'heal all damage from {0} and destroy {1} instead',
                    effectArgs: () => this,
                    gameAction: [
                        ability.actions.heal({ fully: true }),
                        ability.actions.changeEvent(context => ({
                            event: context.event,
                            card: this
                        }))
                    ]
                })
            ]
        });
    }
}

ArmageddonCloak.id = 'armageddon-cloak'; // This is a guess at what the id might be - please check it!!!

module.exports = ArmageddonCloak;