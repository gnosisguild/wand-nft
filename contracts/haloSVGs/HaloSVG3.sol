// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "../interfaces/IHaloSVG.sol";

contract HaloSVG3 is IHaloSVG {
    HaloData public halo3;

    constructor() {
        halo3.svgString = string(
            abi.encodePacked(
                '<?xml version="1.0" encoding="utf-8"?> ',
                "<!-- Generator: Adobe Illustrator 26.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->",
                '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 2000 3000" style="enable-background:new 0 0 2000 3000;" xml:space="preserve">',
                '<style type="text/css">',
                "    .st0{stroke:#000000;stroke-width:0.24;}",
                "</style>",
                '<symbol  id="halo1" viewBox="-99.3 -198.3 198.6 396.6">',
                '    <path class="st0" d="M-99.2,198.3C-82.1,68.6-49,4.1,0,4.8c49-0.7,82.1,63.8,99.2,193.5L47-198.3C57.3-116.1,41.6-75,0-75.2c-41.6,0.2-57.3-40.9-47-123.1L-99.2,198.3z"/>',
                "</symbol>",
                '<g id="Layer_1">',
                "</g>",
                '<g id="Layer_2">',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(1 0 0 -1 1000.2088 502.7909)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(0.9659 0.2588 0.2588 -0.9659 1143.9073 521.7091)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(0.866 0.5 0.5 -0.866 1277.8131 577.1746)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(0.7071 0.7071 0.7071 -0.7071 1392.8007 665.4076)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(0.5 0.866 0.866 -0.5 1481.0337 780.395)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(0.2588 0.9659 0.9659 -0.2588 1536.4993 914.3007)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(4.489200e-11 1 1 -4.489200e-11 1555.4176 1057.9993)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(-0.2588 0.9659 0.9659 0.2588 1536.4994 1201.6979)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(-0.5 0.866 0.866 0.5 1481.0339 1335.6036)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(-0.7071 0.7071 0.7071 0.7071 1392.8009 1450.5912)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(-0.866 0.5 0.5 0.866 1277.8135 1538.8242)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(-0.9659 0.2588 0.2588 0.9659 1143.9078 1594.2898)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(-1 0 0 1 1000.2092 1613.2081)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(-0.9659 -0.2588 -0.2588 0.9659 856.5107 1594.2899)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(-0.866 -0.5 -0.5 0.866 722.6049 1538.8243)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(-0.7071 -0.7071 -0.7071 0.7071 607.6174 1450.5914)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(-0.5 -0.866 -0.866 0.5 519.3843 1335.604)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(-0.2588 -0.9659 -0.9659 0.2588 463.9187 1201.6982)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(-1.346830e-10 -1 -1 1.346830e-10 445.0004 1057.9998)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(0.2588 -0.9659 -0.9659 -0.2588 463.9186 914.3011)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(0.5 -0.866 -0.866 -0.5 519.3842 780.3954)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(0.7071 -0.7071 -0.7071 -0.7071 607.6171 665.4079)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" x="-99.3" y="-198.3" transform="matrix(0.866 -0.5 -0.5 -0.866 722.6045 577.1749)" style="overflow:visible;"/>',
                '        <use xlink:href="#halo1"  width="198.6" height="396.6" id="XMLID_00000003805018989410334920000005025490823785612930_" x="-99.3" y="-198.3" transform="matrix(0.9659 -0.2588 -0.2588 -0.9659 856.5103 521.7092)" style="overflow:visible;"/>',
                "</g>",
                '<g id="Layer_3">',
                "</g>"
            )
        );
    }

    function halo_3() external returns (IHaloSVG.HaloData memory) {
        return halo3;
    }
}
