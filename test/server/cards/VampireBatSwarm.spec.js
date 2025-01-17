describe('Vampire Bat Swarm', function () {
    describe('as defender', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    inPlay: ['iron-worker', 'string-mage', 'cloudburst-gryphon'],
                    dicepool: ['natural']
                },
                player2: {
                    phoenixborn: 'maeoni-viper',
                    inPlay: ['vampire-bat-swarm', 'living-doll'],
                    dicepool: ['natural', 'ceremonial']
                }
            });
            this.livingDoll.tokens.exhaustion = 1;
            this.stringMage.tokens.damage = 1;
        });

        it('triggers when destroyed by string mage', function () {
            this.player1.clickCard(this.stringMage);
            this.player1.clickPrompt('Exchange Link');
            this.player1.clickCard(this.stringMage);
            // this.player1.clickPrompt('Damage');
            this.player1.clickCard(this.vampireBatSwarm);
            // on destroy choices...
            expect(this.player2).toHavePrompt('Do you wish to activate Swarm?');
            this.player2.clickYes();
            expect(this.vampireBatSwarm.location).toBe('play area');
            expect(this.vampireBatSwarm.damage).toBe(0);
            expect(this.vampireBatSwarm.exhausted).toBe(false);
            expect(this.vampireBatSwarm.isAttacker).toBe(false);
            expect(this.vampireBatSwarm.isDefender).toBe(false);
            expect(this.aradelSummergaard.exhausted).toBe(false);
            expect(this.maeoniViper.exhausted).toBe(false);
        });

        it('triggers when destroyed. choose to swarm', function () {
            this.player1.clickCard(this.aradelSummergaard);
            this.player1.clickPrompt('Water Blast');
            this.player1.clickCard(this.vampireBatSwarm);
            // on destroy choices...
            expect(this.player2).toHavePrompt('Do you wish to activate Swarm?');
            this.player2.clickYes();
            expect(this.vampireBatSwarm.location).toBe('play area');
            expect(this.vampireBatSwarm.damage).toBe(0);
            expect(this.vampireBatSwarm.exhausted).toBe(false);
            expect(this.vampireBatSwarm.isAttacker).toBe(false);
            expect(this.vampireBatSwarm.isDefender).toBe(false);
            expect(this.aradelSummergaard.exhausted).toBe(true);
            expect(this.maeoniViper.exhausted).toBe(false);
        });

        it('triggers when destroyed by dice ping. choose to swarm', function () {
            this.player1.clickDie(0);
            this.player1.clickPrompt('natural dice power');
            this.player1.clickCard(this.vampireBatSwarm);
            // on destroy choices...
            expect(this.player2).toHavePrompt('Do you wish to activate Swarm?');
            this.player2.clickYes();
            expect(this.vampireBatSwarm.location).toBe('play area');
            expect(this.vampireBatSwarm.damage).toBe(0);
            expect(this.vampireBatSwarm.exhausted).toBe(false);
            expect(this.vampireBatSwarm.isAttacker).toBe(false);
            expect(this.vampireBatSwarm.isDefender).toBe(false);
            expect(this.aradelSummergaard.exhausted).toBe(false);
            expect(this.maeoniViper.exhausted).toBe(false);
        });

        it('triggers during defence when destroyed. choose to swarm', function () {
            this.player1.clickPrompt('Attack');
            this.player1.clickCard(this.vampireBatSwarm);
            this.player1.clickCard(this.ironWorker);
            this.player2.clickDone();
            this.player2.clickYes();
            // on destroy choices...
            expect(this.player2).toHavePrompt('Do you wish to activate Swarm?');
            this.player2.clickYes();
            expect(this.vampireBatSwarm.location).toBe('play area');
            expect(this.vampireBatSwarm.damage).toBe(0);
            expect(this.vampireBatSwarm.exhausted).toBe(false);
            expect(this.vampireBatSwarm.isAttacker).toBe(false);
            expect(this.vampireBatSwarm.isDefender).toBe(false);
            expect(this.aradelSummergaard.exhausted).toBe(false);
            expect(this.maeoniViper.exhausted).toBe(false);
        });

        it('on defence vs quickstrike - NO COUNTER', function () {
            this.player1.clickPrompt('Attack');
            this.player1.clickCard(this.vampireBatSwarm);
            this.player1.clickCard(this.cloudburstGryphon);
            this.player2.clickDone();
            this.player2.clickYes();
            // on destroy choices...
            expect(this.player2).toHavePrompt('Do you wish to activate Swarm?');
            this.player2.clickYes();
            expect(this.vampireBatSwarm.location).toBe('play area');
            expect(this.vampireBatSwarm.damage).toBe(0);
            expect(this.vampireBatSwarm.exhausted).toBe(false);
            expect(this.vampireBatSwarm.isAttacker).toBe(false);
            expect(this.vampireBatSwarm.isDefender).toBe(false);
            expect(this.aradelSummergaard.exhausted).toBe(false);
            expect(this.cloudburstGryphon.location).toBe('play area');
            expect(this.maeoniViper.exhausted).toBe(false);
        });

        it('triggers during PB defence when destroyed. choose to swarm', function () {
            this.player1.clickAttack(this.maeoniViper);
            this.player1.clickCard(this.ironWorker);
            this.player1.clickDone();
            this.player2.clickCard(this.vampireBatSwarm);
            this.player2.clickCard(this.ironWorker);
            this.player2.clickDone();

            // on destroy choices...
            expect(this.player2).toHavePrompt('Do you wish to activate Swarm?');
            this.player2.clickYes();
            expect(this.vampireBatSwarm.location).toBe('play area');
            expect(this.vampireBatSwarm.damage).toBe(0);
            expect(this.vampireBatSwarm.exhausted).toBe(false);
            expect(this.vampireBatSwarm.isAttacker).toBe(false);
            expect(this.vampireBatSwarm.isDefender).toBe(false);
            expect(this.aradelSummergaard.exhausted).toBe(false);
            expect(this.maeoniViper.exhausted).toBe(false);
        });

        it('triggers when destroyed. choose not to swarm', function () {
            this.player1.clickCard(this.aradelSummergaard);
            this.player1.clickPrompt('Water Blast');
            this.player1.clickCard(this.vampireBatSwarm);
            // on destroy choices...
            expect(this.player2).toHavePrompt('Do you wish to activate Swarm?');
            this.player2.clickNo();
            expect(this.vampireBatSwarm.location).toBe('archives');
            expect(this.aradelSummergaard.exhausted).toBe(true);
            expect(this.maeoniViper.exhausted).toBe(false);
        });
    });

    describe('as attacker', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    inPlay: ['vampire-bat-swarm', 'living-doll'],
                    dicepool: ['natural', 'ceremonial'],
                    hand: ['fear']
                },
                player2: {
                    phoenixborn: 'maeoni-viper',
                    inPlay: ['iron-worker'],
                    dicepool: ['natural', 'ceremonial']
                }
            });
            this.livingDoll.tokens.exhaustion = 1;
        });

        it('triggers during attack when destroyed. choose to swarm', function () {
            this.player1.clickPrompt('Attack');
            this.player1.clickCard(this.ironWorker);
            this.player1.clickCard(this.vampireBatSwarm);
            this.player2.clickDone(); // guard
            this.player2.clickYes(); // counter
            // on destroy choices...
            expect(this.player1).toHavePrompt('Do you wish to activate Swarm?');
            this.player1.clickYes();
            expect(this.vampireBatSwarm.location).toBe('play area');
            expect(this.vampireBatSwarm.damage).toBe(0);
            expect(this.vampireBatSwarm.exhausted).toBe(false);
            expect(this.vampireBatSwarm.isAttacker).toBe(false);
            expect(this.vampireBatSwarm.isDefender).toBe(false);
            expect(this.aradelSummergaard.exhausted).toBe(false);
            expect(this.maeoniViper.exhausted).toBe(false);
        });

        it('triggers when destroyed by FEAR. choose to swarm', function () {
            this.player1.play(this.fear);
            this.player1.clickDie(0);
            this.player1.clickCard(this.vampireBatSwarm);
            // on destroy choices...
            expect(this.player1).toHavePrompt('Do you wish to activate Swarm?');
            this.player1.clickYes();

            this.player1.clickCard(this.ironWorker);

            expect(this.vampireBatSwarm.location).toBe('play area');
            expect(this.vampireBatSwarm.damage).toBe(0);
            expect(this.vampireBatSwarm.exhausted).toBe(false);
            expect(this.vampireBatSwarm.isAttacker).toBe(false);
            expect(this.vampireBatSwarm.isDefender).toBe(false);
            expect(this.ironWorker.location).toBe('discard');
            expect(this.aradelSummergaard.exhausted).toBe(false);
            expect(this.maeoniViper.exhausted).toBe(false);
        });
    });

    describe('vs sonic swordsman', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    inPlay: ['sonic-swordsman', 'string-mage'],
                    dicepool: ['natural']
                },
                player2: {
                    phoenixborn: 'maeoni-viper',
                    inPlay: ['vampire-bat-swarm', 'living-doll'],
                    dicepool: ['natural', 'ceremonial']
                }
            });
        });

        it('triggers when destroyed by sonic swordsman', function () {
            this.player1.clickAttack(this.vampireBatSwarm);
            this.player1.clickCard(this.sonicSwordsman);
            this.player2.clickDone(); // guard
            this.player2.clickYes(); // counter

            expect(this.player2).toHavePrompt('Do you wish to activate Swarm?');
            this.player2.clickYes();
            // pulse
            this.player1.clickCard(this.vampireBatSwarm);
            expect(this.vampireBatSwarm.location).toBe('play area');
            expect(this.vampireBatSwarm.damage).toBe(0);
            expect(this.vampireBatSwarm.exhausted).toBe(true);
            expect(this.vampireBatSwarm.isAttacker).toBe(false);
            expect(this.vampireBatSwarm.isDefender).toBe(false);
        });
    });
});
