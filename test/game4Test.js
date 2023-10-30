const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();
    [sender, anotherAccount] = await ethers.getSigners();
    console.log(typeof sender.address);

    return { game, sender, anotherAccount };
  }

  it('should be a winner', async function () {
    const { game, sender, anotherAccount } = await loadFixture(deployContractAndSetVariables);

    await game.connect(anotherAccount).write(sender.address);

    await game.connect(sender).win(anotherAccount.address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
