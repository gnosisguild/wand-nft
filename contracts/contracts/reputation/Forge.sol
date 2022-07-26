// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IWands.sol";
import "../interfaces/IForge.sol";

contract Forge is Ownable, IForge {
  mapping(uint256 => uint256) public XP; // account to XP
  mapping(uint256 => uint8) public iLvl; // portal to iLvl
  uint256 public maxLevel;
  IWands public wand;

  constructor(IWands _wand) {
    wand = _wand;
  }

  // increases a portals iLvl irrevocably 
  function forgePortal(uint256 _id) public {
    require(wand.ownerOf(_id) == msg.sender);

    uint256 _xp = XP[_id];
    if(_xp > 1000) {
      iLvl[_id] = 1;
    } else if(_xp > 5000) {
      iLvl[_id] = 2;
    } else if (_xp > 10000) {
      iLvl[_id] = 3;
    } else {
      iLvl[_id] = 0;
    }
  }

  function getILvl(uint256 _id) external view returns(uint8) {
    return iLvl[_id];
  }

  function gainXP(uint256 _id, uint256 _xp) onlyOwner {
    XP[_id] += _xp;
  }

  function gainXPBatch(uint256[] memory _ids, uint256[] memory _xps) onlyOwner {
    require(_ids.length == _xps.length);

    for(uint256 i=0; i<= _ids.length;  i++) {
      XP[_ids[i]] += _xps[i];
    }  
  }

  function adjustThresholds(uint256[] memory _newValues) onlyOwner {
    for(uint256 i=0; i<= maxLevel;  i++) {

    }
  }

  function setMaxLevel(uint256 _maxLevel) onlyOwner {
    maxLevel = _maxLevel;
  }
}
