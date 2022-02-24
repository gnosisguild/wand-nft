// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

library Template {
  struct __Input {
    Background background;
    uint256 starsSeed;
    Stone stone;
    Planet[8] planets;
    Aspect[8] aspects;
    Halo halo;
    string title;
  }

  struct Background {
    bool bg0;
  }

  struct Stone {
    uint256 seed;
    string color;
    int256 seasonsAmplitude;
    uint256 secondInYear;
    uint256 secondInDay;
  }

  struct Planet {
    int16 x;
    int16 y;
  }

  struct Aspect {
    int16 x1;
    int16 y1;
    int16 x2;
    int16 y2;
  }

  struct Halo {
    Rhythm[24] rhythm;
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
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 3000" style="background: #112211;" > <style type="text/css"> .bc{fill:none;stroke:#8BA0A5;} </style>',
        background(__input.background),
        stars(__input),
        stone(__input.stone),
        birthchart(__input),
        halo(__input.halo),
        frame(__input),
        "</svg>"
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
        '<style type="text/css"> .st0{fill:none;stroke:#DCD7AF;stroke-width:4;stroke-miterlimit:10;} .st1{fill:#DCD7AF;} </style> <symbol id="Frame_border" viewBox="-433.4 -1413.6 866.8 2827.1"> <path class="st0" d="M419.3,1389.5l12.1,17.6v-17.6v-32.8h-850.7v-2713.5h372.9v-32.8v-17.6l-12.1,17.6h-372.9v32.8v2713.5v32.8 H419.3z" ></path> </symbol> <symbol id="Star" viewBox="-59.9 -59.9 119.8 119.8"> <path class="st1" d="M59.9,59.9C-0.6,5.8,2.8,3-59.8,59.9c56.3-58,55.5-62-0.1-119.7C2.8-2.9-0.7-5.6,59.8-59.9 C5.4-1.5,3.6,0.7,59.9,59.9z" ></path> </symbol> <g id="frame"> <g> <path class="st1" d="M1960,40v2920H40V40H1960 M2000,0H0v3000h2000V0L2000,0z" ></path> </g> <use href="#Frame_border" width="866.8" height="2827.1" x="-433.4" y="-1413.6" transform="matrix(1 0 0 -1 508.8714 1500.0009)" ></use> <use href="#Frame_border" width="866.8" height="2827.1" x="-433.4" y="-1413.6" transform="matrix(-1 0 0 -1 1491.2577 1499.7725)" ></use> <circle class="st1" cx="1000" cy="118.4" r="24.2"></circle> <use href="#Star" width="119.8" height="119.8" x="-59.9" y="-59.9" transform="matrix(1 0 0 -1 215.571 256.0737)" ></use> <use href="#Star" width="119.8" height="119.8" x="-59.9" y="-59.9" transform="matrix(1 0 0 -1 1785.0356 256.0737)" ></use> <use href="#Star" width="119.8" height="119.8" x="-59.9" y="-59.9" transform="matrix(1 0 0 -1 215.571 2744.0227)" ></use> <use href="#Star" width="119.8" height="119.8" x="-59.9" y="-59.9" transform="matrix(1 0 0 -1 1785.0356 2744.0227)" ></use> <path class="st1" d="M541.3,2828.4h917.5c27.2,0,49.3,22.1,49.3,49.3v2c0,27.2-22.1,49.3-49.3,49.3H541.3 c-27.2,0-49.3-22.1-49.3-49.3v-2C491.9,2850.5,514,2828.4,541.3,2828.4z" ></path> <text text-anchor="middle" x="1000" y="2895" style="font: 45px serif;" >',
        __input.title,
        "</text> </g>"
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
        '<defs> <path d="M58.7687 76.7949C110.299 88.0702 154.043 62.7974 190 0.976313L110 139.54C77.1838 120.42 37.9799 109.915 -3.21719e-05 110.066L-1.0516e-05 70.0661C19.718 70.0595 39.5625 72.3317 58.7687 76.7949Z" fill="#9A9EA7" id="h0" ></path> <circle cx="100" cy="-50" r="20" fill="#9A9EA7" id="h1"></circle> </defs> <g transform="translate(1000 1060)"> '
      )
    );
    for (uint256 __i; __i < __input.rhythm.length; __i++) {
      __result = string(
        abi.encodePacked(
          __result,
          ' <g style="transform: rotate(calc(',
          uintToString(__i),
          ' * 15deg)) translateY(-600px);" > ',
          __input.rhythm[__i].halo0 ? '<use href="#h0"></use>' : "",
          " ",
          __input.rhythm[__i].halo1 ? '<use href="#h1"></use>' : "",
          " </g> "
        )
      );
    }
    __result = string(abi.encodePacked(__result, " </g>"));
  }

  function birthchart(__Input memory __input)
    internal
    pure
    returns (string memory __result)
  {
    __result = string(
      abi.encodePacked(
        __result,
        '<g transform="translate(1000 1060)"> <defs> <linearGradient id="aspectgradient"> <stop offset="0%" stop-color="#FFFFF0"></stop> <stop offset="100%" stop-color="#BFBDB1"></stop> </linearGradient> </defs> <g style="filter: blur(5px);"> '
      )
    );
    for (uint256 __i; __i < __input.planets.length; __i++) {
      __result = string(
        abi.encodePacked(
          __result,
          ' <circle cx="',
          intToString(__input.planets[__i].x),
          '" cy="',
          intToString(__input.planets[__i].y),
          '" r="11" fill="white"></circle> '
        )
      );
    }
    __result = string(abi.encodePacked(__result, " </g> "));
    for (uint256 __i2; __i2 < __input.aspects.length; __i2++) {
      __result = string(
        abi.encodePacked(
          __result,
          ' <line x1="',
          intToString(__input.aspects[__i2].x1),
          '" y1="',
          intToString(__input.aspects[__i2].y1),
          '" x2="',
          intToString(__input.aspects[__i2].x2),
          '" y2="',
          intToString(__input.aspects[__i2].y2),
          '" stroke="url(#aspectgradient)" stroke-width="10" stroke-linecap="round" ></line> '
        )
      );
    }
    __result = string(abi.encodePacked(__result, " </g>"));
  }

  function stone(Stone memory __input)
    internal
    pure
    returns (string memory __result)
  {
    __result = string(
      abi.encodePacked(
        __result,
        '<clipPath id="stoneclip"> <circle cx="1000" cy="1060" r="262"></circle> </clipPath> <filter id="texture"> <feTurbulence baseFrequency="0.005 0.01" numOctaves="3" seed="',
        uintToString(__input.seed),
        '" ></feTurbulence> <feDiffuseLighting lighting-color="',
        __input.color,
        '" surfaceScale="10"> <feDistantLight elevation="60"></feDistantLight> </feDiffuseLighting> <feComposite operator="in" in2="SourceGraphic"></feComposite> </filter> <radialGradient id="ambientshadow"> <stop offset="0%" stop-color="hsla(0, 0%, 0%, 0)"></stop> <stop offset="100%" stop-color="hsla(0, 0%, 0%, 0.5)"></stop> </radialGradient> <radialGradient id="sunshadow"> <stop offset="0%" stop-color="hsla(0, 0%, 0%, 0)"></stop> <stop offset="33%" stop-color="hsla(0, 0%, 0%, 0.75)"></stop> </radialGradient> <circle cx="1000" cy="1060" r="260" filter="url(#texture)"></circle> <circle cx="1000" cy="1060" r="262" fill="url(#ambientshadow)"></circle> <g clip-path="url(#stoneclip)"> <g> <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 ',
        intToString(__input.seasonsAmplitude),
        ";0 0;0 ",
        intToString(__input.seasonsAmplitude),
        '" dur="30779326s" begin="-',
        uintToString(__input.secondInYear),
        's" repeatCount="indefinite" ></animateTransform> <circle r="1045" fill="url(#sunshadow)"> <animateMotion dur="86400s" begin="-',
        uintToString(__input.secondInDay),
        's" repeatCount="indefinite" path="M 1000 800 A 260 260 0 0 1 1000 1320 A 260 260 0 0 1 1000 800 z" ></animateMotion> </circle> </g> </g>'
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
        '<filter id="stars"> <feTurbulence baseFrequency="0.1" seed="',
        uintToString(__input.starsSeed),
        '"></feTurbulence> <feColorMatrix values="0 0 0 7 -4 0 0 0 7 -4 0 0 0 7 -4 0 0 0 0 1" ></feColorMatrix> </filter> <clipPath id="starsclip"> <circle cx="1000" cy="1060" r="520"></circle> </clipPath> <mask id="starsmask"> <g filter="url(#stars)" transform="scale(2)"> <rect width="100%" height="100%"></rect> </g> </mask> <circle class="bc" cx="1000" cy="1060" r="260"></circle> <circle class="bc" cx="1000" cy="1060" r="360"></circle> <circle class="bc" cx="1000" cy="1060" r="440"></circle> <circle class="bc" cx="1000" cy="1060" r="520"></circle> <line class="bc" x1="740" y1="610" x2="1260" y2="1510"></line> <line class="bc" x1="1260" y1="610" x2="740" y2="1510"></line> <line class="bc" x1="1450" y1="800" x2="550" y2="1320"></line> <line class="bc" x1="1450" y1="1320" x2="550" y2="800"></line> <g style="filter: blur(2px);"> <rect width="100%" height="100%" fill="white" mask="url(#starsmask)" clip-path="url(#starsclip)" ></rect> </g>'
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
          ? ' <path d="M1000,2434.7l-198.9,334.1l194.9-334.7L422.9,2646l569.6-213.7l-891.4-19.9l888.6,17.1l-1122.4-338.6 l1120.5,335.1l-1243.4-713L987.3,2422L-255.5,1315.5L987.9,2418.1L-132.6,937.5l1122.4,1477L101.1,616l891.4,1795.7L422.9,382.4 l573.2,2027.5L801.1,259.6L1000,2409.3l198.9-2149.7l-194.9,2150.3l573.2-2027.5l-569.6,2029.3L1898.9,616l-888.6,1798.5 l1122.4-1477L1012.1,2418.1l1243.4-1102.6L1012.7,2422l1242.8-709.1l-1243.4,713l1120.5-335.1l-1122.4,338.6l888.6-17.1 l-891.4,19.9l569.6,213.7l-573.2-211.9l194.9,334.7L1000,2434.7z" fill="white" ></path> '
          : ""
      )
    );
  }

  function intToString(int256 i) internal pure returns (string memory) {
    if (i >= 0) {
      return uintToString(uint256(i));
    }
    return string(abi.encodePacked("-", uintToString(uint256(-i))));
  }

  function uintToString(uint256 i) internal pure returns (string memory) {
    if (i == 0) {
      return "0";
    }
    uint256 j = i;
    uint256 len;
    while (j != 0) {
      len++;
      j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint256 k = len;
    while (i != 0) {
      k -= 1;
      uint8 temp = (48 + uint8(i - (i / 10) * 10));
      bstr[k] = bytes1(temp);
      i /= 10;
    }
    return string(bstr);
  }
}
