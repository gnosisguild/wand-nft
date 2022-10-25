// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "./interfaces/Types.sol";
import "./interfaces/IConjuror.sol";
import "./InceptionStones.sol";
import "./Cauldron.sol";
import "./Incantation.sol";
import "base64-sol/base64.sol";

contract Conjuror is IConjuror {
  function generateWandURI(Wand memory wand, address owner)
    external
    pure
    override
    returns (string memory)
  {
    string memory name = Incantation.generate(wand.tokenId);

    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          Base64.encode(
            bytes(
              abi.encodePacked(
                '{"name": "',
                name,
                '", "description":"Zodiac Wands are the governing items of the Zodiac ecosystem. These Evolving Tokens (ETs) are fully on-chain public works that can be upgraded based on meaningful contributions to Zodiac. They will someday act as portals to untold worlds.", "image": "data:image/svg+xml;base64,', // TODO: edit description
                Base64.encode(bytes(generateSVG(wand, name, owner))),
                '", "attributes": [',
                generateAttributes(wand),
                "]}"
              )
            )
          )
        )
      );
  }

  function generateAttributes(Wand memory wand)
    internal
    pure
    returns (string memory)
  {
    return
      string(
        abi.encodePacked(
          '{"trait_type": "Wand Level", "display_type": "number", "value": ',
          SolidMustacheHelpers.uintToString(wand.level, 0),
          '},{"trait_type": "Total Holder XP", "display_type": "number", "value": ',
          SolidMustacheHelpers.uintToString(wand.xp.amount, 0),
          '},{"trait_type": "Birth", "display_type": "date", "value": ',
          SolidMustacheHelpers.uintToString(wand.birth, 0),
          generateStoneTraits(wand.stone),
          "}"
        )
      );
  }

  function generateStoneTraits(uint16 stoneId)
    internal
    pure
    returns (bytes memory)
  {
    (
      string memory name,
      string memory majorAlloy,
      uint8 majorWeight,
      string memory minorAlloy,
      uint8 minorWeight
    ) = interpolateStoneName(stoneId);

    bytes memory first = abi.encodePacked(
      '},{"trait_type": "Stone", "value": "',
      name,
      '"'
    );

    bytes memory second = abi.encodePacked(
      '},{ "trait_type": "',
      majorAlloy,
      '", "max_value":100, "value": ',
      SolidMustacheHelpers.uintToString(majorWeight, 0)
    );
    string memory third = minorWeight > 0
      ? string(
        abi.encodePacked(
          '},{ "trait_type": "',
          minorAlloy,
          '", "max_value":100, "value": ',
          SolidMustacheHelpers.uintToString(minorWeight, 0)
        )
      )
      : "";

    return abi.encodePacked(first, second, third);
  }

  function generateSVG(
    Wand memory wand,
    string memory name,
    address owner
  ) internal pure returns (string memory svg) {
    return
      Cauldron.render(
        Cauldron.__Input({
          background: wand.background,
          seed: uint16(uint256(keccak256(abi.encodePacked(owner)))), // use a 16-bit hash of the owner address,
          planets: scalePlanets(wand.planets),
          aspects: scaleAspects(wand.aspects),
          handle: wand.handle,
          xp: wand.xp,
          stone: interpolateStone(wand.stone),
          halo: wand.halo,
          frame: generateFrame(wand, name),
          sparkles: generateSparkles(wand.tokenId),
          filterLayers: generateFilterLayers()
        })
      );
  }

  function generateFrame(Wand memory wand, string memory name)
    internal
    pure
    returns (Cauldron.Frame memory)
  {
    return
      Cauldron.Frame({
        level1: wand.level == 0,
        level2: wand.level == 1,
        level3: wand.level == 2,
        level4: wand.level == 3,
        level5: wand.level == 4,
        title: name
      });
  }

  function generateFilterLayers()
    internal
    pure
    returns (Cauldron.FilterLayer[3] memory)
  {
    return [
      Cauldron.FilterLayer({
        blurX: 19,
        blurY: 17,
        dispScale: 77,
        lightColor: Cauldron.Color({hue: 0, saturation: 0, lightness: 100}),
        opacity: 20,
        pointX: -493,
        pointY: 514,
        pointZ: 104,
        specConstant: 819,
        specExponent: 4,
        surfaceScale: -7,
        turbBlur: 54,
        turbFreqX: 17,
        turbFreqY: 17,
        turbOct: 1,
        fractalNoise: true
      }),
      Cauldron.FilterLayer({
        blurX: 19,
        blurY: 17,
        dispScale: 90,
        lightColor: Cauldron.Color({hue: 0, saturation: 0, lightness: 100}),
        opacity: 25,
        pointX: -139,
        pointY: 514,
        pointZ: 104,
        specConstant: 762,
        specExponent: 4,
        surfaceScale: -11,
        turbBlur: 76,
        turbFreqX: 1,
        turbFreqY: 9,
        turbOct: 1,
        fractalNoise: true
      }),
      Cauldron.FilterLayer({
        blurX: 19,
        blurY: 17,
        dispScale: 88,
        lightColor: Cauldron.Color({hue: 58, saturation: 100, lightness: 94}),
        opacity: 34,
        pointX: -493,
        pointY: 514,
        pointZ: 104,
        specConstant: 359,
        specExponent: 3,
        surfaceScale: 157,
        turbBlur: 73,
        turbFreqX: 19,
        turbFreqY: 19,
        turbOct: 1,
        fractalNoise: true
      })
    ];
  }

  function generateSparkles(uint256 tokenId)
    internal
    pure
    returns (Cauldron.Sparkle[] memory result)
  {
    uint256 seed = uint256(keccak256(abi.encodePacked(tokenId)));
    uint256 sparkleCount = 4 + (seed % 4);
    result = new Cauldron.Sparkle[](sparkleCount);
    for (uint256 i = 0; i < sparkleCount; i++) {
      result[i] = Cauldron.Sparkle({
        tx: uint16(
          1820 - (uint256(keccak256(abi.encodePacked(seed + 3 * i + 0))) % 1640)
        ),
        ty: uint16(
          1880 - (uint256(keccak256(abi.encodePacked(seed + 3 * i + 1))) % 1640)
        ),
        scale: uint8(
          30 + (uint256(keccak256(abi.encodePacked(seed + 3 * i + 2))) % 70)
        )
      });
    }
    return result;
  }

  function scalePlanets(Planet[8] memory planets)
    internal
    pure
    returns (Cauldron.Planet[8] memory result)
  {
    for (uint256 i = 0; i < 8; i++) {
      result[i].visible = planets[i].visible;
      result[i].x = int16((int256(planets[i].x) * 520) / 127);
      result[i].y = int16((int256(planets[i].y) * 520) / 127);
    }
  }

  function scaleAspects(Aspect[8] memory aspects)
    internal
    pure
    returns (Cauldron.Aspect[8] memory result)
  {
    for (uint256 i = 0; i < 8; i++) {
      result[i].x1 = int16((int256(aspects[i].x1) * 260) / 127);
      result[i].y1 = int16((int256(aspects[i].y1) * 260) / 127);
      result[i].x2 = int16((int256(aspects[i].x2) * 260) / 127);
      result[i].y2 = int16((int256(aspects[i].y2) * 260) / 127);
    }
  }

  function interpolateStone(uint16 stoneId)
    internal
    pure
    returns (Cauldron.Stone memory)
  {
    (uint8 from, uint8 to, uint8 progress) = interpolationParams(stoneId);
    InceptionStones.Stone memory fromStone = stoneList()[from];
    InceptionStones.Stone memory toStone = stoneList()[to];
    return
      Cauldron.Stone({
        turbFreqX: interpolateUInt8Value(
          fromStone.turbFreqX,
          toStone.turbFreqX,
          progress
        ),
        turbFreqY: interpolateUInt8Value(
          fromStone.turbFreqY,
          toStone.turbFreqY,
          progress
        ),
        turbOct: interpolateUInt8Value(
          fromStone.turbOct,
          toStone.turbOct,
          progress
        ),
        redAmp: interpolateInt8Value(
          fromStone.redAmp,
          toStone.redAmp,
          progress
        ),
        redExp: interpolateInt8Value(
          fromStone.redExp,
          toStone.redExp,
          progress
        ),
        redOff: interpolateInt8Value(
          fromStone.redOff,
          toStone.redOff,
          progress
        ),
        greenAmp: interpolateInt8Value(
          fromStone.greenAmp,
          toStone.greenAmp,
          progress
        ),
        greenExp: interpolateInt8Value(
          fromStone.greenExp,
          toStone.greenExp,
          progress
        ),
        greenOff: interpolateInt8Value(
          fromStone.greenOff,
          toStone.greenOff,
          progress
        ),
        blueAmp: interpolateInt8Value(
          fromStone.blueAmp,
          toStone.blueAmp,
          progress
        ),
        blueExp: interpolateInt8Value(
          fromStone.blueExp,
          toStone.blueExp,
          progress
        ),
        blueOff: interpolateInt8Value(
          fromStone.blueOff,
          toStone.blueOff,
          progress
        ),
        fractalNoise: progress < 50
          ? fromStone.fractalNoise
          : toStone.fractalNoise,
        rotation: interpolateUInt16Value(
          fromStone.rotation,
          toStone.rotation,
          progress
        )
      });
  }

  function interpolateStoneName(uint16 stoneId)
    internal
    pure
    returns (
      string memory name,
      string memory majorAlloy,
      uint8 majorWeight,
      string memory minorAlloy,
      uint8 minorWeight
    )
  {
    (uint8 from, uint8 to, uint8 progress) = interpolationParams(stoneId);
    InceptionStones.Stone memory fromStone = stoneList()[from];
    InceptionStones.Stone memory toStone = stoneList()[to];

    majorAlloy = fromStone.name;
    majorWeight = 100 - progress;
    minorAlloy = toStone.name;
    minorWeight = 100 - majorWeight;

    if (progress < 25) {
      name = string(abi.encodePacked("Uniform ", fromStone.name));
    } else {
      name = string(
        abi.encodePacked(fromStone.name, " ", toStone.name, " ", "Alloy")
      );
    }
  }

  function interpolationParams(uint16 stone)
    internal
    pure
    returns (
      uint8 from,
      uint8 to,
      uint8 progress
    )
  {
    uint256 angle = uint256(stone) * 1000;
    uint256 step = (3600 * 1000) / stoneList().length;
    from = uint8(angle / step);
    uint256 midway = step * from + step / 2;

    if (angle < midway) {
      // going left
      to = prevStone(from);
      progress = uint8(round1(((midway - angle) * 1000) / step));
    } else {
      // going right
      to = nextStone(from);
      progress = uint8(round1(((angle - midway) * 1000) / step));
    }
  }

  function prevStone(uint8 index) private pure returns (uint8) {
    return (index > 0 ? index - 1 : uint8(stoneList().length - 1));
  }

  function nextStone(uint8 index) private pure returns (uint8) {
    return (index + 1) % uint8(stoneList().length);
  }

  function round1(uint256 number) internal pure returns (uint256) {
    return number / 10 + ((number % 10) >= 5 ? 1 : 0);
  }

  function interpolateUInt8Value(
    uint8 from,
    uint8 to,
    uint8 progress
  ) internal pure returns (uint8) {
    return
      uint8(uint256(interpolateValue(int8(from), int8(to), int8(progress))));
  }

  function interpolateUInt16Value(
    uint16 from,
    uint16 to,
    uint8 progress
  ) internal pure returns (uint16) {
    return
      uint16(uint256(interpolateValue(int16(from), int16(to), int8(progress))));
  }

  function interpolateInt8Value(
    int8 from,
    int8 to,
    uint8 progress
  ) internal pure returns (int8) {
    return int8(interpolateValue(from, to, int8(progress)));
  }

  function interpolateValue(
    int256 from,
    int256 to,
    int256 progress
  ) internal pure returns (int256) {
    if (from > to) {
      return from - ((from - to) * progress) / 100;
    } else {
      return from + ((to - from) * progress) / 100;
    }
  }

  function stoneList() private pure returns (InceptionStones.Stone[29] memory) {
    return InceptionStones.list();
  }
}
