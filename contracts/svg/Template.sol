// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

library Template {
    struct __Input {
        Background background;
        string starsSeed;
        Stone stone;
        Planet[] planets;
        Aspect[] aspects;
        Halo halo;
        string title;
    }

    struct Background {
        bool bg0;
    }

    struct Stone {
        string seed;
        string color;
        bool northernHemisphere;
        uint256 seasonsAmplitude;
        uint256 secondInYear;
        uint256 secondInDay;
    }

    struct Planet {
        string x;
        string y;
    }

    struct Aspect {
        string x1;
        string y1;
        string x2;
        string y2;
    }

    struct Halo {
        Rhythm[] rhythm;
    }

    struct Rhythm {
        bool halo0;
        bool halo1;
    }

    function render(__Input memory __input)
        public
        pure
        returns (string memory __result)
    {
        __result = string(
            abi.encodePacked(
                __result,
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 2000 3000" style="background: #112211;" > <style type="text/css"> .bc{fill:none;stroke:#8BA0A5;} </style> ',
                background(__input.background),
                " ",
                stars(__input),
                " ",
                stone(__input.stone),
                " ",
                birthchart(__input),
                " ",
                halo(__input.halo),
                " ",
                frame(__input),
                " </svg>"
            )
        );
    }

    function frame(__Input memory __input)
        internal
        pure
        returns (string memory __result)
    {
        __result = string(
            abi.encodePacked(
                __result,
                '<style type="text/css">\n  .st0{fill:none;stroke:#DCD7AF;stroke-width:4;stroke-miterlimit:10;}\n  .st1{fill:#DCD7AF;}\n</style>\n<symbol id="Frame_border" viewBox="-433.4 -1413.6 866.8 2827.1">\n  <path\n    class="st0"\n    d="M419.3,1389.5l12.1,17.6v-17.6v-32.8h-850.7v-2713.5h372.9v-32.8v-17.6l-12.1,17.6h-372.9v32.8v2713.5v32.8\n\t\tH419.3z"\n  ></path>\n</symbol>\n<symbol id="Star" viewBox="-59.9 -59.9 119.8 119.8">\n  <path\n    class="st1"\n    d="M59.9,59.9C-0.6,5.8,2.8,3-59.8,59.9c56.3-58,55.5-62-0.1-119.7C2.8-2.9-0.7-5.6,59.8-59.9\n\t\tC5.4-1.5,3.6,0.7,59.9,59.9z"\n  ></path>\n</symbol>\n<g id="frame">\n  <g>\n    <path\n      class="st1"\n      d="M1960,40v2920H40V40H1960 M2000,0H0v3000h2000V0L2000,0z"\n    ></path>\n  </g>\n\n  <use\n    href="#Frame_border"\n    width="866.8"\n    height="2827.1"\n    x="-433.4"\n    y="-1413.6"\n    transform="matrix(1 0 0 -1 508.8714 1500.0009)"\n  ></use>\n\n  <use\n    href="#Frame_border"\n    width="866.8"\n    height="2827.1"\n    x="-433.4"\n    y="-1413.6"\n    transform="matrix(-1 0 0 -1 1491.2577 1499.7725)"\n  ></use>\n  <circle class="st1" cx="1000" cy="118.4" r="24.2"></circle>\n\n  <use\n    href="#Star"\n    width="119.8"\n    height="119.8"\n    x="-59.9"\n    y="-59.9"\n    transform="matrix(1 0 0 -1 215.571 256.0737)"\n  ></use>\n\n  <use\n    href="#Star"\n    width="119.8"\n    height="119.8"\n    x="-59.9"\n    y="-59.9"\n    transform="matrix(1 0 0 -1 1785.0356 256.0737)"\n  ></use>\n\n  <use\n    href="#Star"\n    width="119.8"\n    height="119.8"\n    x="-59.9"\n    y="-59.9"\n    transform="matrix(1 0 0 -1 215.571 2744.0227)"\n  ></use>\n\n  <use\n    href="#Star"\n    width="119.8"\n    height="119.8"\n    x="-59.9"\n    y="-59.9"\n    transform="matrix(1 0 0 -1 1785.0356 2744.0227)"\n  ></use>\n\n  <path\n    class="st1"\n    d="M541.3,2828.4h917.5c27.2,0,49.3,22.1,49.3,49.3v2c0,27.2-22.1,49.3-49.3,49.3H541.3\n\t\tc-27.2,0-49.3-22.1-49.3-49.3v-2C491.9,2850.5,514,2828.4,541.3,2828.4z"\n  ></path>\n\n  <text\n    text-anchor="middle"\n    x="1000"\n    y="2895"\n    style="font: 45px serif;"\n  >',
                __input.title,
                "</text>\n</g>"
            )
        );
    }

    function halo(Halo memory __input)
        internal
        pure
        returns (string memory __result)
    {
        __result = string(
            abi.encodePacked(
                __result,
                '<defs>\n  <path\n    d="M58.7687 76.7949C110.299 88.0702 154.043 62.7974 190 0.976313L110 139.54C77.1838 120.42 37.9799 109.915 -3.21719e-05 110.066L-1.0516e-05 70.0661C19.718 70.0595 39.5625 72.3317 58.7687 76.7949Z"\n    fill="#9A9EA7"\n    id="h0"\n  ></path>\n  <circle cx="100" cy="-50" r="20" fill="#9A9EA7" id="h1"></circle>\n</defs>\n\n<g transform="translate(1000 1060)">\n'
            )
        );
        for (uint256 __i; __i < __input.rhythm.length; __i++) {
            __result = string(
                abi.encodePacked(
                    __result,
                    '    <g\n      style="transform: rotate(calc(',
                    uint2str(__i),
                    ' * 15deg)) translateY(-600px);"\n    >\n      ',
                    __input.rhythm[__i].halo0 ? '<use href="#h0"></use>' : "",
                    "\n      ",
                    __input.rhythm[__i].halo1 ? '<use href="#h1"></use>' : "",
                    "\n    </g>\n"
                )
            );
        }
        __result = string(abi.encodePacked(__result, "</g>"));
    }

    function birthchart(__Input memory __input)
        internal
        pure
        returns (string memory __result)
    {
        __result = string(
            abi.encodePacked(
                __result,
                '<g transform="translate(1000 1060)">\n  <defs>\n    <linearGradient id="aspectgradient">\n      <stop offset="0%" stop-color="#FFFFF0"></stop>\n      <stop offset="100%" stop-color="#BFBDB1"></stop>\n    </linearGradient>\n  </defs>\n  <g style="filter: blur(5px);">\n'
            )
        );
        for (uint256 __i; __i < __input.planets.length; __i++) {
            __result = string(
                abi.encodePacked(
                    __result,
                    '      <circle cx="',
                    __input.planets[__i].x,
                    '" cy="',
                    __input.planets[__i].y,
                    '" r="11" fill="white"></circle>\n'
                )
            );
        }
        __result = string(abi.encodePacked(__result, "  </g>\n"));
        for (uint256 __i_2; __i_2 < __input.aspects.length; __i_2++) {
            __result = string(
                abi.encodePacked(
                    __result,
                    '    <line\n      x1="',
                    __input.aspects[__i_2].x1,
                    '"\n      y1="',
                    __input.aspects[__i_2].y1,
                    '"\n      x2="',
                    __input.aspects[__i_2].x2,
                    '"\n      y2="',
                    __input.aspects[__i_2].y2,
                    '"\n      stroke="url(#aspectgradient)"\n      stroke-width="10"\n      stroke-linecap="round"\n    ></line>\n'
                )
            );
        }
        __result = string(abi.encodePacked(__result, "</g>"));
    }

    function stone(Stone memory __input)
        internal
        pure
        returns (string memory __result)
    {
        __result = string(
            abi.encodePacked(
                __result,
                '<clipPath id="stoneclip">\n  <circle cx="1000" cy="1060" r="262"></circle>\n</clipPath>\n<filter id="texture">\n  <feTurbulence\n    baseFrequency="0.005 0.01"\n    numOctaves="3"\n    seed="',
                __input.seed,
                '"\n  ></feTurbulence>\n  <feDiffuseLighting lighting-color="',
                __input.color,
                '" surfaceScale="10">\n    <feDistantLight elevation="60"></feDistantLight>\n  </feDiffuseLighting>\n  <feComposite operator="in" in2="SourceGraphic"></feComposite>\n</filter>\n<radialGradient id="ambientshadow">\n  <stop offset="0%" stop-color="hsla(0, 0%, 0%, 0)"></stop>\n  <stop offset="100%" stop-color="hsla(0, 0%, 0%, 0.5)"></stop>\n</radialGradient>\n<radialGradient id="sunshadow">\n  <stop offset="0%" stop-color="hsla(0, 0%, 0%, 0)"></stop>\n  <stop offset="33%" stop-color="hsla(0, 0%, 0%, 0.75)"></stop>\n</radialGradient>\n<circle cx="1000" cy="1060" r="260" filter="url(#texture)"></circle>\n<circle cx="1000" cy="1060" r="262" fill="url(#ambientshadow)"></circle>\n\n<g clip-path="url(#stoneclip)">\n  <g>\n    <animateTransform\n      attributeName="transform"\n      attributeType="XML"\n      type="translate"\n      values="0 0;0 ',
                __input.northernHemisphere ? "-" : "",
                uint2str(__input.seasonsAmplitude),
                ';0 0"\n      dur="30779326s"\n      begin="-',
                uint2str(__input.secondInYear),
                's"\n      repeatCount="indefinite"\n    ></animateTransform>\n    <circle r="1045" fill="url(#sunshadow)">\n      <animateMotion\n        dur="86400s"\n        begin="-',
                uint2str(__input.secondInDay),
                's"\n        repeatCount="indefinite"\n        path="M 1000 800 A 260 260 0 0 1 1000 1320 A 260 260 0 0 1 1000 800 z"\n      ></animateMotion>\n    </circle>\n  </g>\n</g>'
            )
        );
    }

    function stars(__Input memory __input)
        internal
        pure
        returns (string memory __result)
    {
        __result = string(
            abi.encodePacked(
                __result,
                '<filter id="stars">\n  <feTurbulence baseFrequency="0.1" seed="',
                __input.starsSeed,
                '"></feTurbulence>\n  <feColorMatrix\n    values="0 0 0 7 -4  0 0 0 7 -4  0 0 0 7 -4  0 0 0 0 1"\n  ></feColorMatrix>\n</filter>\n<clipPath id="starsclip">\n  <circle cx="1000" cy="1060" r="520"></circle>\n</clipPath>\n<mask id="starsmask">\n  <g filter="url(#stars)" transform="scale(2)">\n    <rect width="100%" height="100%"></rect>\n  </g>\n</mask>\n\n<circle class="bc" cx="1000" cy="1060" r="260"></circle>\n<circle class="bc" cx="1000" cy="1060" r="360"></circle>\n<circle class="bc" cx="1000" cy="1060" r="440"></circle>\n<circle class="bc" cx="1000" cy="1060" r="520"></circle>\n<line class="bc" x1="740" y1="610" x2="1260" y2="1510"></line>\n<line class="bc" x1="1260" y1="610" x2="740" y2="1510"></line>\n<line class="bc" x1="1450" y1="800" x2="550" y2="1320"></line>\n<line class="bc" x1="1450" y1="1320" x2="550" y2="800"></line>\n\n<g style="filter: blur(2px);">\n  <rect\n    width="100%"\n    height="100%"\n    fill="white"\n    mask="url(#starsmask)"\n    clip-path="url(#starsclip)"\n  ></rect>\n</g>'
            )
        );
    }

    function background(Background memory __input)
        internal
        pure
        returns (string memory __result)
    {
        __result = string(
            abi.encodePacked(
                __result,
                __input.bg0
                    ? '  <path\n    d="M1000,2434.7l-198.9,334.1l194.9-334.7L422.9,2646l569.6-213.7l-891.4-19.9l888.6,17.1l-1122.4-338.6\n\t\t\tl1120.5,335.1l-1243.4-713L987.3,2422L-255.5,1315.5L987.9,2418.1L-132.6,937.5l1122.4,1477L101.1,616l891.4,1795.7L422.9,382.4\n\t\t\tl573.2,2027.5L801.1,259.6L1000,2409.3l198.9-2149.7l-194.9,2150.3l573.2-2027.5l-569.6,2029.3L1898.9,616l-888.6,1798.5\n\t\t\tl1122.4-1477L1012.1,2418.1l1243.4-1102.6L1012.7,2422l1242.8-709.1l-1243.4,713l1120.5-335.1l-1122.4,338.6l888.6-17.1\n\t\t\tl-891.4,19.9l569.6,213.7l-573.2-211.9l194.9,334.7L1000,2434.7z"\n    fill="white"\n  ></path>\n'
                    : ""
            )
        );
    }

    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
