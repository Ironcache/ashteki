const Card = require('../../Card.js');

class ExplosiveGrowth extends Card {
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.addStatusToken(() => ({
                target: this.parent,
                amount: 2
            })),
            then: {
                gameAction: ability.actions.discard(() => ({
                    target: this.parent.upgrades.filter((c) => c !== this)
                }))
            }
        });

        this.whileAttached({
            effect: [ability.effects.modifyAttack(() => this.parent.status)]
        });
    }
}

ExplosiveGrowth.id = 'explosive-growth';

module.exports = ExplosiveGrowth;
