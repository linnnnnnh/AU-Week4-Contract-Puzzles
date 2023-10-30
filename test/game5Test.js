const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    const signers = await ethers.getSigners();
    let smallerSigner = null;
    for (const [index, signer] of signers.entries()) {
      const add = signer.address;
      if (add < "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf") {
        smallerSigner = signers[index];
        break;
      }
    }

    if (!smallerSigner) {
      throw new Error('No suitable signer found.');
    }

    return { game, smallerSigner };
  }
  it('should be a winner', async function () {
    const { game, smallerSigner } = await loadFixture(deployContractAndSetVariables);

    // good luck
    await game.connect(smallerSigner).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
