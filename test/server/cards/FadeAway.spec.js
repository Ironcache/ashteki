describe('Fade away', function () {
    describe('Vanilla operation', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    inPlay: ['mist-spirit', 'anchornaut'],
                    dicepool: ['natural', 'illusion', 'natural', 'charm', 'illusion'],
                    spellboard: [],
                    hand: ['fade-away', 'root-armor']
                },
                player2: {
                    phoenixborn: 'jessa-na-ni',
                    inPlay: ['iron-worker', 'iron-rhino', 'frostback-bear'],
                    spellboard: ['summon-iron-rhino'],
                    dicepool: ['natural'],
                    hand: []
                }
            });
        });

        it('destroys at end of round, onCardDestroyed reaction NOT available', function () {
            expect(this.game.round).toBe(1);

            this.player1.play(this.fadeAway, this.ironRhino); // attach to ir

            this.player1.endTurn();
            // pass p2
            this.player2.endTurn();

            // pass p1
            this.player1.endTurn();
            this.player1.clickPrompt('Done');
            this.player2.clickPrompt('Done');

            expect(this.player2).not.toHavePrompt('Any reactions to iron rhino being destroyed?');
            // this.player2.clickPass();
            expect(this.game.round).toBe(2);
            expect(this.ironRhino.location).toBe('archives');
            expect(this.fadeAway.location).toBe('discard');
        });

        it('purges allies at end of round, onCardDestroyed reaction NOT available', function () {
            expect(this.game.round).toBe(1);

            this.player1.play(this.fadeAway, this.ironWorker); // attach to iw

            this.player1.endTurn();
            // pass p2
            this.player2.endTurn();

            // pass p1
            this.player1.endTurn();
            this.player1.clickPrompt('Done');
            this.player2.clickPrompt('Done');

            expect(this.player2).not.toHavePrompt('Any reactions to iron worker being destroyed?');
            // this.player2.clickPass();

            expect(this.game.round).toBe(2);
            expect(this.ironWorker.location).toBe('purged');
            expect(this.fadeAway.location).toBe('discard');
        });

        it('immortal bear bug report', function () {
            expect(this.game.round).toBe(1);

            this.player1.play(this.rootArmor, this.frostbackBear);
            this.player1.play(this.fadeAway, this.frostbackBear);

            this.player1.endTurn();
            // pass p2
            this.player2.endTurn();

            // pass p1
            this.player1.endTurn();
            this.player1.clickPrompt('Done');
            this.player2.clickPrompt('Done');

            expect(this.player2).not.toHavePrompt('Any reactions to frostback bear being destroyed?');
            // this.player2.clickPass();
            expect(this.game.round).toBe(2);
            expect(this.frostbackBear.location).toBe('archives');
            expect(this.fadeAway.location).toBe('discard');
        });
    });

    describe('Fade away vs Rowan Conscript', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    inPlay: ['mist-spirit', 'anchornaut'],
                    dicepool: ['natural', 'illusion', 'natural', 'charm', 'illusion'],
                    spellboard: [],
                    hand: ['fade-away', 'root-armor']
                },
                player2: {
                    phoenixborn: 'rowan-umberend',
                    inPlay: ['iron-worker', 'iron-rhino', 'frostback-bear'],
                    spellboard: ['summon-iron-rhino'],
                    dicepool: ['natural'],
                    hand: []
                }
            });
        });

        it('destroys at end of round, rowan conscript IS available', function () {
            expect(this.game.round).toBe(1);

            this.player1.play(this.fadeAway, this.ironWorker); // attach to ir

            this.player1.endTurn();
            // pass p2
            this.player2.endTurn();

            // pass p1
            this.player1.endTurn();
            this.player1.clickPrompt('Done');
            this.player2.clickPrompt('Done');

            expect(this.player2).toHavePrompt('Do you wish to conscript the destroyed Iron Worker?');
            // this.player2.clickPass();
            this.player2.clickYes();
            // this.player2.clickCard(this.rowanUmberend);
            expect(this.ironWorker.location).toBe('purged'); // underneath cards are considered purged
            expect(this.ironWorker.parent).toBe(this.rowanUmberend);
            expect(this.rowanUmberend.childCards.length).toBe(1);
            expect(this.rowanUmberend.childCards[0]).toBe(this.ironWorker);
            expect(this.fadeAway.location).toBe('discard');
        });
    });
});
