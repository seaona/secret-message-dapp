const CatToken = artifacts.require("CatToken");

module.exports = function(deployer) {
  deployer.deploy(CatToken, "CatalunyaToken", "CAT", 100000000000000000000);
};
