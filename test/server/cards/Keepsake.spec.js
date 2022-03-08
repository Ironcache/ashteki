describe('Keepsake', function () {
    describe('gaining tokens', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'victoria-glassfire',
                    inPlay: ['mist-spirit', 'blue-jaguar', 'anchornaut'],
                    dicepool: ['divine', 'illusion', 'charm', 'charm'],
                    spellboard: ['keepsake'],
                    hand: ['close-combat'],
                    archives: ['spark']
                },
                player2: {
                    phoenixborn: 'coal-roarkwin',
                    inPlay: ['iron-worker'],
                    spellboard: ['summon-iron-rhino'],
                    hand: ['molten-gold'],
                    dicepool: ['natural', 'natural', 'charm', 'charm']
                }
            });
        });

        it('dice reroll by surprise', function () {
            this.player1.clickCard(this.victoriaGlassfire);
            this.player1.clickPrompt('Surprise!');
            this.player1.clickOpponentDie(0);
            this.player1.clickOpponentDie(1);
            this.player1.clickOpponentDie(2);
            this.player1.clickPrompt('Done');
            this.player1.clickDie(0);
            this.player1.clickDie(2);
            this.player1.clickDie(3);
            this.player1.clickPrompt('Done');
            expect(this.player1).toHaveDefaultPrompt();
            expect(this.keepsake.status).toBe(3);
        });

        it('dice lowered by illusion dice power', function () {
            this.player1.clickDie(1);
            this.player1.clickPrompt('Illusion Dice Power');
            this.player1.clickOpponentDie(0);
            this.player1.clickOpponentDie(1);
            this.player1.clickDone();
            expect(this.player2.dicepool[0].level).toBe('class');
            expect(this.player1).toHaveDefaultPrompt();
            expect(this.keepsake.status).toBe(2);
        });
    });

    describe('discard', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'lulu-firststone',
                    inPlay: ['mist-spirit', 'blue-jaguar', 'anchornaut'],
                    dicepool: ['divine', 'illusion', 'charm', 'charm'],
                    spellboard: ['keepsake'],
                    hand: ['close-combat'],
                    archives: ['spark']
                },
                player2: {
                    phoenixborn: 'coal-roarkwin',
                    inPlay: ['iron-worker', 'hammer-knight'],
                    spellboard: ['summon-iron-rhino'],
                    hand: ['molten-gold'],
                    dicepool: ['natural', 'natural', 'charm', 'charm']
                }
            });

            this.keepsake.tokens.status = 2;
        });

        it('discard and deal damage equal to status tokens', function () {
            this.player1.clickCard(this.keepsake);
            this.player1.clickPrompt('Use Keepsake');
            this.player1.clickCard(this.hammerKnight);
            expect(this.keepsake.location).toBe('discard');
            expect(this.hammerKnight.damage).toBe(2);
        });
    });
});
