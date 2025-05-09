const DataNFTToken = artifacts.require("DataNFTToken");

module.exports = function(deployer) {
    deployer.deploy(DataNFTToken);
}