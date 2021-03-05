describe('Summon Emperor Lion', function () {
    beforeEach(function () {
        this.setupTest({
            player1: {
                phoenixborn: 'aradel-summergaard',
                spellboard: ['summon-emperor-lion'],
                dicepool: ['divine', 'divine', 'illusion', 'natural', 'divine', 'divine'],
                archives: ['emperor-lion'],
                deck: ['law-of-sight']
            },
            player2: {
                phoenixborn: 'coal-roarkwin',
                inPlay: ['hammer-knight'],
                spellboard: []
            }
        });
    });

    it('should place a lion into play', function () {
        this.player1.clickCard(this.summonEmperorLion);
        this.player1.clickPrompt('Summon Emperor Lion');
        this.player1.clickDie(2);
        this.player1.clickPrompt('Done');
        this.player1.clickCard(this.player1.archives[0]);
        this.player1.clickPrompt('Done');
        expect(this.player1).toHaveDefaultPrompt();
        expect(this.emperorLion.location).toBe('play area');
    });

    it('should place a law card into hand', function () {
        this.player1.clickCard(this.summonEmperorLion);
        this.player1.clickPrompt('Summon Emperor Lion');
        this.player1.clickDie(2);
        this.player1.clickPrompt('Done');
        this.player1.clickCard(this.player1.archives[0]);
        this.player1.clickCard('law-of-sight');
        expect(this.lawOfSight.location).toBe('hand');
        this.player1.clickPrompt('Done');
        expect(this.player1).toHaveDefaultPrompt();
    });

    it('should allow law card to be played without action cost', function () {
        // fudge to check action cost is ignored when playing law
        this.player1.actions.side = false;
        expect(this.player1.deck.length).toBe(4); // 3 OM plus one law

        this.player1.clickCard(this.summonEmperorLion);
        this.player1.clickPrompt('Summon Emperor Lion');
        this.player1.clickDie(2);
        this.player1.clickPrompt('Done');
        this.player1.clickCard(this.player1.archives[0]);
        this.player1.clickCard('law-of-sight');
        expect(this.lawOfSight.location).toBe('hand');
        expect(this.player1.deck.length).toBe(3); // 3 OM plus one law
        this.player1.clickCard(this.lawOfSight);
        this.player1.clickDie(3);
        expect(this.lawOfSight.location).toBe('spellboard');
        this.player1.clickPrompt('No'); // law of sight prompt to draw up to 2
        expect(this.player1).toHaveDefaultPrompt();
    });
});