const Card = require('../../Card.js');
const { BattlefieldTypes, CardType } = require('../../../constants.js');

class ButterflyMonk extends Card {
    setupCardAbilities(ability) {
        this.unitGuard();

        this.destroyed({
            inexhaustible: true,
            target: {
                optional: true,
                cardCondition: (card, context) => card !== context.source,
                activePromptTitle: 'Mend 1: Choose a unit or phoenixborn to heal 1 wound',
                cardType: [...BattlefieldTypes, CardType.Phoenixborn],
                gameAction: ability.actions.removeDamage(() => ({
                    amount: this.getAbilityNumeric(1)
                }))
            }
        });
    }
}

ButterflyMonk.id = 'butterfly-monk';

module.exports = ButterflyMonk;
