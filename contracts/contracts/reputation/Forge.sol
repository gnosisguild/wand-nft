// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IWands.sol";
import "../interfaces/IForge.sol";

contract Forge is Ownable, IForge {
  mapping(address => Character) public characters; // account {XP, XP_Spent}
  mapping(uint256 => uint8) public iLvl; // portal to iLvl
  uint256 public maxLevel;
  IWands public wand;

  constructor(IWands _wand) {
    wand = _wand;
  }

  // increases a portals iLvl irrevocably
  // XP per account can only be assigned to one portal NFT
  // warning this lets new holders downgrade the iLvl
  function forgePortal(uint256 _id, uint256 _amount) public {
    require(wand.ownerOf(_id) == msg.sender);
    Character memory temp = characters[msg.sender];
    uint256 availableXP = temp.XP - temp.XPAssigned;
    // ensure that this account has XP left to assign
    require(availableXP > 0);
    require(availableXP >= _amount);
    characters[msg.sender].XPAssigned += _amount;

    if(_amount > 1000) {
      iLvl[_id] += 1;
    } else if(_amount > 5000) {
      iLvl[_id] += 2;
    } else if (_amount > 10000) {
      iLvl[_id] += 3;
    }
  }

  function getILvl(uint256 _id) external view override returns(uint8) {
    return iLvl[_id];
  }

  function adjustXP(address _id, uint256 _xp) public onlyOwner {
    characters[_id].XP = _xp;
  }

  function adjustXPBatch(address[] memory _ids, uint256[] memory _xps) external onlyOwner {
    require(_ids.length == _xps.length);

    for(uint256 i=0; i<= _ids.length;  i++) {
      characters[_ids[i]].XP = _xps[i];
    }  
  }

  function setMaxLevel(uint256 _maxLevel) public onlyOwner {
    maxLevel = _maxLevel;
  }
}
