// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "./interfaces/Types.sol";
import "./interfaces/IConjuror.sol";
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
                '", "description":"A unique Wand, designed and built on-chain", "image": "data:image/svg+xml;base64,', // TODO: edit description
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
          '{"trait_type": "Level", "value": ',
          SolidMustacheHelpers.uintToString(wand.level + 1, 0),
          '},{"trait_type": "Evolution", "value": ',
          SolidMustacheHelpers.uintToString(wand.xp.amount, 0),
          '},{"trait_type": "Birth", "display_type": "date", "value": ',
          SolidMustacheHelpers.uintToString(wand.birth, 0),
          "}"
        )
      );
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
    Cauldron.Stone memory fromStone = stoneList()[from];
    Cauldron.Stone memory toStone = stoneList()[to];
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

  function stoneList() internal pure returns (Cauldron.Stone[29] memory) {
    return [
      Cauldron.Stone({
        name: "Tyrolite",
        fractalNoise: false,
        turbFreqX: 2,
        turbFreqY: 1,
        turbOct: 3,
        redAmp: 90,
        redExp: 15,
        redOff: -69,
        greenAmp: 66,
        greenExp: -24,
        greenOff: -23,
        blueAmp: 11,
        blueExp: -85,
        blueOff: -16,
        rotation: 218
      }),
      Cauldron.Stone({
        name: "Sugilite",
        fractalNoise: false,
        turbFreqX: 2,
        turbFreqY: 2,
        turbOct: 3,
        redAmp: 12,
        redExp: 30,
        redOff: 9,
        greenAmp: -16,
        greenExp: -88,
        greenOff: 71,
        blueAmp: 58,
        blueExp: -39,
        blueOff: 76,
        rotation: 216
      }),
      Cauldron.Stone({
        name: "Uranospinite",
        fractalNoise: false,
        turbFreqX: 2,
        turbFreqY: 4,
        turbOct: 3,
        redAmp: 30,
        redExp: -74,
        redOff: -56,
        greenAmp: 62,
        greenExp: -52,
        greenOff: -68,
        blueAmp: 12,
        blueExp: -32,
        blueOff: -6,
        rotation: 21
      }),
      Cauldron.Stone({
        name: "Viseite",
        fractalNoise: false,
        turbFreqX: 8,
        turbFreqY: 7,
        turbOct: 3,
        redAmp: 60,
        redExp: -56,
        redOff: -48,
        greenAmp: 74,
        greenExp: -52,
        greenOff: -36,
        blueAmp: 78,
        blueExp: 48,
        blueOff: 46,
        rotation: 43
      }),
      Cauldron.Stone({
        name: "Langite",
        fractalNoise: false,
        turbFreqX: 6,
        turbFreqY: 3,
        turbOct: 3,
        redAmp: -32,
        redExp: -39,
        redOff: -48,
        greenAmp: 42,
        greenExp: -36,
        greenOff: -19,
        blueAmp: 39,
        blueExp: 18,
        blueOff: 12,
        rotation: 43
      }),
      Cauldron.Stone({
        name: "Lepidolite",
        fractalNoise: false,
        turbFreqX: 6,
        turbFreqY: 3,
        turbOct: 3,
        redAmp: 14,
        redExp: -70,
        redOff: -12,
        greenAmp: 29,
        greenExp: -92,
        greenOff: -38,
        blueAmp: 79,
        blueExp: -72,
        blueOff: -63,
        rotation: 310
      }),
      Cauldron.Stone({
        name: "Huemulite",
        fractalNoise: false,
        turbFreqX: 2,
        turbFreqY: 2,
        turbOct: 3,
        redAmp: 72,
        redExp: -92,
        redOff: -34,
        greenAmp: -43,
        greenExp: -30,
        greenOff: 78,
        blueAmp: -75,
        blueExp: -39,
        blueOff: 76,
        rotation: 114
      }),
      Cauldron.Stone({
        name: "Bunsenite",
        fractalNoise: false,
        turbFreqX: 0,
        turbFreqY: 4,
        turbOct: 3,
        redAmp: 9,
        redExp: -100,
        redOff: 30,
        greenAmp: 5,
        greenExp: -98,
        greenOff: 64,
        blueAmp: 41,
        blueExp: -65,
        blueOff: -79,
        rotation: 56
      }),
      Cauldron.Stone({
        name: "Serandite",
        fractalNoise: false,
        turbFreqX: 5,
        turbFreqY: 3,
        turbOct: 1,
        redAmp: 79,
        redExp: -51,
        redOff: -61,
        greenAmp: -12,
        greenExp: -77,
        greenOff: 51,
        blueAmp: 45,
        blueExp: 100,
        blueOff: 14,
        rotation: 86
      }),
      Cauldron.Stone({
        name: "Petterdite",
        fractalNoise: false,
        turbFreqX: 2,
        turbFreqY: 2,
        turbOct: 1,
        redAmp: 33,
        redExp: -51,
        redOff: -90,
        greenAmp: -23,
        greenExp: -96,
        greenOff: 35,
        blueAmp: 47,
        blueExp: -51,
        blueOff: 82,
        rotation: 43
      }),
      Cauldron.Stone({
        name: "Bottinoite",
        fractalNoise: false,
        turbFreqX: 7,
        turbFreqY: 2,
        turbOct: 2,
        redAmp: 8,
        redExp: 14,
        redOff: 3,
        greenAmp: 64,
        greenExp: -42,
        greenOff: -68,
        blueAmp: 99,
        blueExp: 100,
        blueOff: 17,
        rotation: 69
      }),
      Cauldron.Stone({
        name: "Augelite",
        fractalNoise: false,
        turbFreqX: 3,
        turbFreqY: 3,
        turbOct: 6,
        redAmp: 48,
        redExp: -71,
        redOff: -90,
        greenAmp: 26,
        greenExp: -60,
        greenOff: -31,
        blueAmp: -87,
        blueExp: -87,
        blueOff: -89,
        rotation: 43
      }),
      Cauldron.Stone({
        name: "Pascoite",
        fractalNoise: false,
        turbFreqX: 1,
        turbFreqY: 4,
        turbOct: 4,
        redAmp: 77,
        redExp: -100,
        redOff: 55,
        greenAmp: 9,
        greenExp: -97,
        greenOff: -4,
        blueAmp: -10,
        blueExp: -65,
        blueOff: -81,
        rotation: 244
      }),
      Cauldron.Stone({
        name: "Jarosite",
        fractalNoise: false,
        turbFreqX: 3,
        turbFreqY: 9,
        turbOct: 2,
        redAmp: 100,
        redExp: 1,
        redOff: -11,
        greenAmp: 41,
        greenExp: -93,
        greenOff: -96,
        blueAmp: 33,
        blueExp: -88,
        blueOff: -100,
        rotation: 43
      }),
      Cauldron.Stone({
        name: "Pollucite",
        fractalNoise: true,
        turbFreqX: 4,
        turbFreqY: 7,
        turbOct: 2,
        redAmp: 69,
        redExp: -43,
        redOff: 16,
        greenAmp: 61,
        greenExp: -66,
        greenOff: -63,
        blueAmp: 58,
        blueExp: 1,
        blueOff: -15,
        rotation: 306
      }),
      Cauldron.Stone({
        name: "Andradite",
        fractalNoise: false,
        turbFreqX: 16,
        turbFreqY: 9,
        turbOct: 3,
        redAmp: -44,
        redExp: 78,
        redOff: -22,
        greenAmp: 54,
        greenExp: 72,
        greenOff: 5,
        blueAmp: 57,
        blueExp: 71,
        blueOff: -4,
        rotation: 329
      }),
      Cauldron.Stone({
        name: "Allactite",
        fractalNoise: false,
        turbFreqX: 7,
        turbFreqY: 6,
        turbOct: 1,
        redAmp: 4,
        redExp: -57,
        redOff: -9,
        greenAmp: -51,
        greenExp: -12,
        greenOff: 51,
        blueAmp: 24,
        blueExp: -83,
        blueOff: -80,
        rotation: 31
      }),
      Cauldron.Stone({
        name: "Borcarite",
        fractalNoise: false,
        turbFreqX: 4,
        turbFreqY: 0,
        turbOct: 3,
        redAmp: -2,
        redExp: -94,
        redOff: -22,
        greenAmp: 19,
        greenExp: -79,
        greenOff: 18,
        blueAmp: 42,
        blueExp: -61,
        blueOff: -70,
        rotation: 56
      }),
      Cauldron.Stone({
        name: "Jouravskite",
        fractalNoise: false,
        turbFreqX: 1,
        turbFreqY: 4,
        turbOct: 4,
        redAmp: 46,
        redExp: -98,
        redOff: -87,
        greenAmp: 39,
        greenExp: -61,
        greenOff: -39,
        blueAmp: -30,
        blueExp: -32,
        blueOff: -6,
        rotation: 48
      }),
      Cauldron.Stone({
        name: "Murmanite",
        fractalNoise: true,
        turbFreqX: 34,
        turbFreqY: 6,
        turbOct: 3,
        redAmp: 17,
        redExp: -18,
        redOff: 91,
        greenAmp: 50,
        greenExp: -44,
        greenOff: -21,
        blueAmp: 58,
        blueExp: -82,
        blueOff: -36,
        rotation: 75
      }),
      Cauldron.Stone({
        name: "Kasolite",
        fractalNoise: true,
        turbFreqX: 8,
        turbFreqY: 2,
        turbOct: 1,
        redAmp: 34,
        redExp: -31,
        redOff: 29,
        greenAmp: 56,
        greenExp: -57,
        greenOff: -82,
        blueAmp: 68,
        blueExp: 51,
        blueOff: -80,
        rotation: 295
      }),
      Cauldron.Stone({
        name: "Olmiite",
        fractalNoise: true,
        turbFreqX: 6,
        turbFreqY: 2,
        turbOct: 3,
        redAmp: 43,
        redExp: -66,
        redOff: 12,
        greenAmp: 100,
        greenExp: 93,
        greenOff: -33,
        blueAmp: 100,
        blueExp: 86,
        blueOff: -26,
        rotation: 304
      }),
      Cauldron.Stone({
        name: "Ussingite",
        fractalNoise: true,
        turbFreqX: 3,
        turbFreqY: 5,
        turbOct: 5,
        redAmp: -2,
        redExp: -76,
        redOff: 31,
        greenAmp: 72,
        greenExp: 80,
        greenOff: -32,
        blueAmp: 92,
        blueExp: 79,
        blueOff: 67,
        rotation: 37
      }),
      Cauldron.Stone({
        name: "Haiweeite",
        fractalNoise: true,
        turbFreqX: 2,
        turbFreqY: 6,
        turbOct: 5,
        redAmp: 0,
        redExp: -76,
        redOff: 47,
        greenAmp: 81,
        greenExp: 30,
        greenOff: -54,
        blueAmp: -60,
        blueExp: 79,
        blueOff: 36,
        rotation: 147
      }),
      Cauldron.Stone({
        name: "Hematite",
        fractalNoise: true,
        turbFreqX: 7,
        turbFreqY: 5,
        turbOct: 3,
        redAmp: 66,
        redExp: 86,
        redOff: -28,
        greenAmp: -9,
        greenExp: -77,
        greenOff: -4,
        blueAmp: 30,
        blueExp: 5,
        blueOff: -16,
        rotation: 35
      }),
      Cauldron.Stone({
        name: "Dioptase",
        fractalNoise: true,
        turbFreqX: 5,
        turbFreqY: 4,
        turbOct: 4,
        redAmp: 40,
        redExp: -51,
        redOff: -61,
        greenAmp: -19,
        greenExp: -77,
        greenOff: 42,
        blueAmp: -64,
        blueExp: 6,
        blueOff: 76,
        rotation: 242
      }),
      Cauldron.Stone({
        name: "Ekaterinite",
        fractalNoise: true,
        turbFreqX: 17,
        turbFreqY: 9,
        turbOct: 3,
        redAmp: 64,
        redExp: -76,
        redOff: -10,
        greenAmp: -13,
        greenExp: -88,
        greenOff: 63,
        blueAmp: 57,
        blueExp: -99,
        blueOff: 1,
        rotation: 190
      }),
      Cauldron.Stone({
        name: "Purpurite",
        fractalNoise: true,
        turbFreqX: 4,
        turbFreqY: 4,
        turbOct: 7,
        redAmp: 39,
        redExp: -100,
        redOff: -39,
        greenAmp: 38,
        greenExp: -52,
        greenOff: -53,
        blueAmp: 32,
        blueExp: -93,
        blueOff: 48,
        rotation: 2
      }),
      Cauldron.Stone({
        name: "Zdenekite",
        fractalNoise: true,
        turbFreqX: 4,
        turbFreqY: 9,
        turbOct: 3,
        redAmp: -59,
        redExp: -76,
        redOff: -10,
        greenAmp: 18,
        greenExp: -88,
        greenOff: 4,
        blueAmp: 66,
        blueExp: -99,
        blueOff: -52,
        rotation: 111
      })
    ];
  }
}
