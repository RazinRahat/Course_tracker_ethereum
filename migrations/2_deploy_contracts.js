// requiring the contract
var Course_tracker = artifacts.require("./Course_tracker.sol");

// exporting as module 
 module.exports = function(deployer) {
  deployer.deploy(Course_tracker);
 };
