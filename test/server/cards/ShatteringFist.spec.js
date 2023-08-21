describe('Shattering Fist', function () {
    describe('From hand', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'rin-northfell',
                    inPlay: ['mist-spirit', 'iron-worker'],
                    dicepool: ['divine', 'divine', 'charm', 'charm', 'natural', 'natural'],
                    hand: ['ember-heart', 'freezing-blast', 'shattering-fist'],
                    archives: ['ice-buff']
                },
                player2: {
                    phoenixborn: 'coal-roarkwin',
                    inPlay: ['hammer-knight', 'holy-knight', 'anchornaut'],
                    spellboard: [],
                    hand: [],
                    dicepool: ['natural', 'natural', 'charm']
                }
            });
        });

        it('discards an upgrade and deals 3 damage to an opp. target unit', function () {
            this.player1.clickCard(this.rinNorthfell);
            this.player1.clickPrompt('ice buff');
            this.player1.clickCard(this.ironWorker);
            expect(this.ironWorker.upgrades.length).toBe(1);

            this.player1.actions.side += 1; // fudge for test

            this.player1.play(this.shatteringFist);
            this.player1.clickDie(0);
            // this.player1.clickDone();

            this.player1.clickCard(this.iceBuff);
            this.player1.clickCard(this.hammerKnight);

            expect(this.ironWorker.upgrades.length).toBe(0);
            expect(this.hammerKnight.damage).toBe(3);
        });
    });
});
