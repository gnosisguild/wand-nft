// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "./interfaces/IHaloGenerator.sol";
import "./interfaces/IWands.sol";
import "./Trigonometry.sol";
import "base64-sol/base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract WandConjuror {
  using Strings for uint8;

  IHaloGenerator public immutable haloGenerator;

  constructor(IHaloGenerator _haloGenerator) {
    haloGenerator = _haloGenerator;
  }

  function generateWandURI(IWands.Wand memory wand)
    external
    view
    returns (string memory)
  {
    IHaloSVG.HaloData memory halo = haloGenerator.generateHalo(wand.halo);

    //string memory name = generateName(wand.nameRng);
    //bytes memory attributes = generateAttributesJSON(halo, name);

    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          Base64.encode(
            bytes(
              abi.encodePacked(
                '{"name":"',
                "name",
                '", "description":"A unique Wand, designed and built on-chain. 1 of 5000.", "image": "data:image/svg+xml;base64,',
                Base64.encode(bytes(generateSVG(halo.svgString))),
                '", "attributes": ',
                "attributes",
                "}"
              )
            )
          )
        )
      );
  }

  function generateSVG(string memory haloSVG)
    internal
    pure
    returns (bytes memory svg)
  {
    svg = abi.encodePacked(
      //'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 220 264">',
      haloSVG,
      "</svg>"
    );
  }

  // function generateName(
  //     string memory fieldTitle,
  //     string memory hardwareTitle,
  //     string memory frameTitle,
  //     uint24[4] memory colors
  // ) internal view returns (string memory) {
  //     bytes memory frameString = '';
  //     if (bytes(frameTitle).length > 0) {
  //         frameString = abi.encodePacked(frameTitle, ': ');
  //     }
  //     return
  //         string(abi.encodePacked(frameString, hardwareTitle, ' on ', generateColorTitleSnippet(colors), fieldTitle));
  // }

  // function generateAttributesJSON(
  //     IFieldSVGs.FieldData memory fieldData,
  //     IHardwareSVGs.HardwareData memory hardwareData,
  //     IFrameSVGs.FrameData memory frameData,
  //     uint24[4] memory colors
  // ) internal view returns (bytes memory attributesJSON) {
  //     attributesJSON = abi.encodePacked(
  //         '[{"trait_type":"Field", "value":"',
  //         fieldData.title,
  //         '"}, {"trait_type":"Hardware", "value":"',
  //         hardwareData.title,
  //         '"}, {"trait_type":"Status", "value":"Built',
  //         '"}, {"trait_type":"Field Type", "value":"',
  //         getFieldTypeString(fieldData.fieldType),
  //         '"}, {"trait_type":"Hardware Type", "value":"',
  //         getHardwareTypeString(hardwareData.hardwareType),
  //         conditionalFrameAttribute(frameData.title),
  //         colorAttributes(colors)
  //     );
  // }

  /// @dev Returns a rough approximation of the current position of the sun at the given geo coordinates
  /// @param lat Latitude in degrees from equator between (S) -90 and 90 (N)
  /// @param lng Longitude in degrees from prime meridian between (W) -180 and 180 (E)
  /// @return minuteInDay The current minute of the day at the given longitude
  /// @return zenithAngle The angle between the sun’s rays and the vertical direction at today's noon at the given latitude
  // function calculateSolarPosition1(int256 lat, int256 lng)
  //     public
  //     view
  //     returns (uint256 minuteInDay, int256 zenithAngle)
  // {
  //     int256 secondsInDay = 24 * 60 * 60;
  //     uint256 localTimestamp = uint256(
  //         int256(block.timestamp) + secondsInDay * (lng / 360)
  //     );
  //     minuteInDay = (localTimestamp / 60) % (24 * 60);

  //     int256 minutesInYear = 525949; // solar year: 365 days 5 hours 49 minutes
  //     int256 summerSolstice1970 = 246960;

  //     int256 distanceToSolstice = (((int256(block.timestamp) /
  //         60 -
  //         summerSolstice1970) % minutesInYear) - (minutesInYear / 2));
  //     if (distanceToSolstice < 0) distanceToSolstice *= -1; // distance to summer solstice between 0 and minutesInYear / 2

  //     zenithAngle = (lat * distanceToSolstice) / ;
  // }

  // function calculateSolarPosition(int256 lat, int256 lng)
  //     public
  //     view
  //     returns (uint256 azimuth, uint256 altitude)
  // {
  //     uint256 hoursInYear = 365 * 24 * 3600 + 6;
  //     uint256 dayOfYear = ((block.timestamp / hoursInYear) % hoursInYear) /
  //         24;

  //     int256 hourAngle =

  //     // https://www.pveducation.org/pvcdrom/properties-of-sunlight/declination-angle#footnote1_ypisw09
  //     // 16384 = 360deg, cos result range: [-32767,32767], result uses 4 decimals
  //     int256 declination = (-234500 *
  //         Trigonometry.cos(uint16((16384 * dayOfYear) / 365) + 11)) / 32767;

  // }
}
