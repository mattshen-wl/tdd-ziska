const { randomIntRange } = require('../src/math');
const game_engine = require('../src/ziska_game_engine');

describe('game flow', () => {

  it('game can start with specified parameters', () => {
    const game = game_engine.initGame({
      playerHealth: 100,
      enemyCount: 10,
      enemyHealth: 100
    });
    expect(game.player).toMatchObject({
      health: 100
    });
    expect(game.enemies.length).toBe(10);
    expect(game.enemies.every((o) => o.health === 100));
  });

  it('game over - all enemies are dead', () => {
    const game = game_engine.initGame({
      playerHealth: 100,
      enemyCount: 10,
      enemyHealth: 100
    });
    game.enemies.forEach((e) => {
      e.health = 0;
    });
    expect(game_engine.isGameOver()).toBeTruthy();
    expect(game_engine.ziskaWin()).toBeTruthy();
  });

  it('game over - ziska is dead', () => {
    const game = game_engine.initGame();
    game.player.health = 0;
    expect(game_engine.isGameOver()).toBeTruthy();
    expect(game_engine.ziskaWin()).toBeFalsy();
  });

});

describe('fight flow', () => {

  let game;

  beforeEach(() => {
    game = game_engine.initGame({
      playerHealth: 100,
      enemyCount: 10,
      enemyHealth: 100
    });
  });

  it('can start 1st fight', () => {
    game_engine.startFight(randomIntRange(0, 9));
    expect(game_engine.currentEnemy()).toBeDefined();
  });
 
  it('fight in progress - one turn', () => {
    game_engine.startFight(randomIntRange(0, 9));
    game_engine.executeTurn(50, 50);
    expect(game.player.health).toBe(50);
    expect(game_engine.currentEnemy().health).toBe(50);
  });

  it('fight end', () => {
    game_engine.startFight(randomIntRange(0, 9));
    game_engine.executeTurn(50, 50);
    expect(game_engine.isFightOver()).toBeFalsy();
    game_engine.executeTurn(50, 50);
    expect(game_engine.isFightOver()).toBeTruthy();
  });

  it('can start 2nd fight', () => {
    const firstEnemyId = randomIntRange(0, 9);
    game_engine.startFight(firstEnemyId);
    game_engine.executeTurn(100, 100);
    const nextEnemyId = game_engine.nextEnemyId();
    expect(nextEnemyId != firstEnemyId).toBeTruthy();
    
  });

});
