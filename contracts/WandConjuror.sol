// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import './interfaces/IHaloGenerator.sol';
import './interfaces/IWands.sol';
import "base64-sol/base64.sol";
import '@openzeppelin/contracts/utils/Strings.sol';

contract WandConjuror {
    using Strings for uint8;

    IHaloGenerator public immutable haloGenerator;

    constructor(
        IHaloGenerator _haloGenerator
    ) {
        haloGenerator = _haloGenerator;
    }

    function generateWandURI(IWands.Wand memory wand) external view returns (string memory) {
        IHaloSVG.HaloData memory halo = haloGenerator.generateHalo(wand.halo);

        //string memory name = generateName(wand.nameRng);
        //bytes memory attributes = generateAttributesJSON(halo, name);

        return
            string(
                abi.encodePacked(
                    'data:application/json;base64,',
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                'name',
                                '", "description":"A unique Wand, designed and built on-chain. 1 of 5000.", "image": "data:image/svg+xml;base64,',
                                Base64.encode(bytes(generateSVG(halo.svgString))),
                                '", "attributes": ',
                                'attributes',
                                '}'
                            )
                        )
                    )
                )
            );
    }

    function generateSVG(
        string memory haloSVG
    ) internal pure returns (bytes memory svg) {
        svg = abi.encodePacked(
            //'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 220 264">',
            haloSVG,
            '</svg>'
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
}
