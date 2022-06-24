// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

string constant __constant0 = ' <feGaussianBlur in="SourceAlpha" stdDeviation="30" result="glow" ></feGaussianBlur> <feColorMatrix in="glow" result="bgGlow" type="matrix" values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 ';
string constant __constant1 = '%, 0)"></stop> </radialGradient> <circle style="fill:url(#grad0)" cx="1000" cy="1925" r="1133"></circle> <circle style="fill:url(#grad0)" cx="1000" cy="372" r="1133"></circle> ';
string constant __constant2 = '-grad" gradientUnits="objectBoundingBox" x1="80%" x2="20%" y1="200%" y2="-400%"> <stop offset="0" stop-color="black" stop-opacity="1"/> <stop offset="0.4" stop-color="lightgreen" stop-opacity="';

library Template {
  struct __Input {
    Filter filter;
    Background background;
    Xp xp;
    Stars stars;
    Stone stone;
    Frame frame;
    Halo halo;
    Handle handle;
    Aspect[8] aspects;
    Planet[8] planets;
    Sparkle sparkle;
  }

  struct Filter {
    Layer[] layers;
  }

  struct Layer {
    string turbType;
    string turbFreqX;
    string turbFreqY;
    string turbOct;
    string turbBlur;
    string dispScale;
    string blurX;
    string blurY;
    string surfaceScale;
    string specConstant;
    string specExponent;
    string lightColor;
    string pointX;
    string pointY;
    string pointZ;
    string opacity;
  }

  struct Background {
    uint16 hue;
    bool radial;
    bool light;
    Color color;
    bool dark;
    bool linear;
  }

  struct Color {
    string hue;
    string saturation;
    string lightness;
  }

  struct Xp {
    uint32 amount;
    uint32 cap;
    bool crown;
  }

  struct Stars {
    uint256 starsSeed;
  }

  struct Stone {
    bool fractalNoise;
    uint8 turbFreqX;
    uint8 turbFreqY;
    uint8 turbOct;
    uint256 seed;
    int8 redAmp;
    int8 redExp;
    int8 redOff;
    int8 greenAmp;
    int8 greenExp;
    int8 greenOff;
    int8 blueAmp;
    int8 blueExp;
    int8 blueOff;
    uint16 rotation;
  }

  struct Frame {
    bool level1;
    bool level2;
    bool level3;
    bool level4;
    bool level5;
    string title;
  }

  struct Halo {
    bool halo0;
    bool halo1;
    bool halo2;
    bool halo3;
    bool halo4;
    bool halo5;
    string hue;
    bool[24] rhythm;
  }

  struct Handle {
    bool handle0;
    bool handle1;
    bool handle2;
    bool handle3;
  }

  struct Aspect {
    int16 x1;
    int16 y1;
    int16 x2;
    int16 y2;
  }

  struct Planet {
    bool visible;
    int16 x;
    int16 y;
  }

  struct Sparkle {
    Sparkle2[] sparkles;
  }

  struct Sparkle2 {
    string tx;
    string ty;
    string scale;
  }

  function render(__Input memory __input)
    public
    pure
    returns (string memory __result)
  {
    __result = string(
      abi.encodePacked(
        __result,
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 3000" shape-rendering="geometricPrecision" > <style type="text/css"> .bc{fill:none;stroke:#8BA0A5;} </style>',
        filter(__input.filter),
        background(__input.background),
        xpBar(__input.xp),
        stars(__input.stars),
        stone(__input.stone),
        frame(__input.frame),
        halo(__input.halo),
        handles(__input.handle),
        birthchart(__input),
        sparkle(__input.sparkle),
        "</svg>"
      )
    );
  }

  function filter(Filter memory __input)
    internal
    pure
    returns (string memory __result)
  {
    __result = string(
      abi.encodePacked(
        __result,
        '<filter color-interpolation-filters="sRGB" id="glowEmboss" width="250%" height="250%" x="-75%" y="-55%" > <feGaussianBlur in="SourceAlpha" result="alphablur" stdDeviation="8" ></feGaussianBlur> ',
        __constant0,
        '1 0 " ></feColorMatrix> ',
        " "
      )
    );
    for (uint256 __i; __i < __input.layers.length; __i++) {
      __result = string(
        abi.encodePacked(
          __result,
          ' <feTurbulence type="',
          __input.layers[__i].turbType,
          '" baseFrequency="',
          __input.layers[__i].turbFreqX,
          " ",
          __input.layers[__i].turbFreqY,
          '" numOctaves="',
          __input.layers[__i].turbOct,
          '" seed="1004123123" result="turb_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" ></feTurbulence> <feGaussianBlur stdDeviation="',
          __input.layers[__i].turbBlur,
          '" in="SourceAlpha" result="turb_blur_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" ></feGaussianBlur> <feDisplacementMap scale="',
          __input.layers[__i].dispScale
        )
      );
      __result = string(
        abi.encodePacked(
          __result,
          '" in="turb_blur_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" in2="turb_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" result="disp_turb_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" ></feDisplacementMap> <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 1 0" in="disp_turb_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" result="co_mat_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" ></feColorMatrix> <feGaussianBlur stdDeviation="',
          __input.layers[__i].blurX,
          " ",
          __input.layers[__i].blurY,
          '" in="co_mat_',
          SolidMustacheHelpers.uintToString(__i, 0)
        )
      );
      __result = string(
        abi.encodePacked(
          __result,
          '" result="blur_co_mat_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" ></feGaussianBlur> <feSpecularLighting surfaceScale="',
          __input.layers[__i].surfaceScale,
          '" specularConstant="',
          __input.layers[__i].specConstant,
          '" specularExponent="',
          __input.layers[__i].specExponent,
          '" lighting-color="',
          __input.layers[__i].lightColor,
          '" in="blur_co_mat_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" result="lighting_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" > <fePointLight x="',
          __input.layers[__i].pointX
        )
      );
      __result = string(
        abi.encodePacked(
          __result,
          '" y="',
          __input.layers[__i].pointY,
          '" z="',
          __input.layers[__i].pointZ,
          '"></fePointLight> </feSpecularLighting> <feComposite operator="in" in="lighting_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" in2="co_mat_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" result="comp_light_1_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" ></feComposite> <feComposite operator="arithmetic" k1="0" k2="0" k3="',
          __input.layers[__i].opacity,
          '" k4="0" in="disp_turb_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" in2="comp_light_1_',
          SolidMustacheHelpers.uintToString(__i, 0)
        )
      );
      __result = string(
        abi.encodePacked(
          __result,
          '" result="comp_light_2_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" ></feComposite> <feComposite operator="in" in2="SourceAlpha" in="comp_light_2_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" result="comp_light_final_',
          SolidMustacheHelpers.uintToString(__i, 0),
          '" ></feComposite> '
        )
      );
    }
    __result = string(
      abi.encodePacked(
        __result,
        ' <feMerge> <feMergeNode in="bgGlow"></feMergeNode> <feMergeNode in="SourceGraphic"></feMergeNode> '
      )
    );
    for (uint256 __i2; __i2 < __input.layers.length; __i2++) {
      __result = string(
        abi.encodePacked(
          __result,
          ' <feMergeNode in="comp_light_final_',
          SolidMustacheHelpers.uintToString(__i2, 0),
          '"></feMergeNode> '
        )
      );
    }
    __result = string(abi.encodePacked(__result, " </feMerge> </filter>"));
  }

  function background(Background memory __input)
    internal
    pure
    returns (string memory __result)
  {
    __result = string(
      abi.encodePacked(
        __result,
        '<g style="filter: hue-rotate(',
        SolidMustacheHelpers.uintToString(__input.hue, 0),
        'deg);"> '
      )
    );
    if (__input.radial) {
      __result = string(abi.encodePacked(__result, " "));
      if (__input.light) {
        __result = string(
          abi.encodePacked(
            __result,
            ' <rect style="fill:hsla(',
            __input.color.hue,
            ", ",
            __input.color.saturation,
            "%, ",
            __input.color.lightness,
            '%, 1)" width="2000" height="3000"></rect> <radialGradient id="grad0"> <stop offset="0" style="stop-color:hsla(',
            __input.color.hue,
            ', 100%, 95%, 1)"></stop> <stop offset="1" style="stop-color:hsla(55, 66%, 83',
            __constant1
          )
        );
      }
      __result = string(abi.encodePacked(__result, " "));
      if (__input.dark) {
        __result = string(
          abi.encodePacked(
            __result,
            ' <rect style="fill:hsl(',
            __input.color.hue,
            ', 30%, 7%)" width="2000" height="3000"></rect> <radialGradient id="grad0"> <stop offset="0" style="stop-color: hsla(',
            __input.color.hue,
            ", ",
            __input.color.saturation,
            "%, ",
            __input.color.lightness,
            '%, 1)"></stop> <stop offset="1" style="stop-color: hsla(',
            __input.color.hue,
            ", ",
            __input.color.saturation,
            "%, ",
            __input.color.lightness,
            __constant1
          )
        );
      }
      __result = string(abi.encodePacked(__result, " "));
    }
    __result = string(abi.encodePacked(__result, " "));
    if (__input.linear) {
      __result = string(abi.encodePacked(__result, " "));
      if (__input.light) {
        __result = string(
          abi.encodePacked(
            __result,
            ' <linearGradient id="lin0" gradientTransform="rotate(90)"> <stop offset="0%" stop-color="hsla(55, 66%, 83%, 1)"></stop> <stop offset="100%" stop-color="hsla(',
            __input.color.hue,
            ", ",
            __input.color.saturation,
            "%, ",
            __input.color.lightness,
            '%, 1)"></stop> </linearGradient> <rect style="fill:url(#lin0)" width="2000" height="3000"></rect> '
          )
        );
      }
      __result = string(abi.encodePacked(__result, " "));
      if (__input.dark) {
        __result = string(
          abi.encodePacked(
            __result,
            ' <linearGradient id="lin0" gradientTransform="rotate(90)"> <stop offset="0%" stop-color="hsl(',
            __input.color.hue,
            ', 30%, 7%)"></stop> <stop offset="100%" stop-color="hsla(',
            __input.color.hue,
            ", ",
            __input.color.saturation,
            "%, ",
            __input.color.lightness,
            '%, 1)"></stop> </linearGradient> <rect style="fill:url(#lin0)" width="2000" height="3000"></rect> '
          )
        );
      }
      __result = string(abi.encodePacked(__result, " "));
    }
    __result = string(
      abi.encodePacked(
        __result,
        ' </g> <defs> <filter id="burstBlur"> <feGaussianBlur in="SourceGraphic" stdDeviation="2"></feGaussianBlur> </filter> </defs> <path filter="url(#burstBlur)" style="opacity: 0.5" d="M1000,2434.7l-198.9,334.1l194.9-334.7L422.9,2646l569.6-213.7l-891.4-19.9l888.6,17.1l-1122.4-338.6 l1120.5,335.1l-1243.4-713L987.3,2422L-255.5,1315.5L987.9,2418.1L-132.6,937.5l1122.4,1477L101.1,616l891.4,1795.7L422.9,382.4 l573.2,2027.5L801.1,259.6L1000,2409.3l198.9-2149.7l-194.9,2150.3l573.2-2027.5l-569.6,2029.3L1898.9,616l-888.6,1798.5 l1122.4-1477L1012.1,2418.1l1243.4-1102.6L1012.7,2422l1242.8-709.1l-1243.4,713l1120.5-335.1l-1122.4,338.6l888.6-17.1 l-891.4,19.9l569.6,213.7l-573.2-211.9l194.9,334.7L1000,2434.7z" fill="white" ></path>'
      )
    );
  }

  function xpBar(Xp memory __input)
    internal
    pure
    returns (string memory __result)
  {
    __result = string(
      abi.encodePacked(
        __result,
        "<defs> <style> .xp-seg { fill: green; } .xp-guide { fill: none; stroke-width: 1; stroke: #FAFFC0; opacity: 0.7; } .xp-bar * { transform-box: fill-box; transform-origin: center; } .xp-start { fill: white; } .xp-fill { fill: none; stroke-width: 28; stroke: url(#xp-grad); opacity: 1; mix-blend-mode: plus-lighter; } .hilt rect { fill: url(#hilt-grad); } #bar-base { stroke-dasharray: calc(",
        SolidMustacheHelpers.uintToString(__input.amount, 0),
        " / ",
        SolidMustacheHelpers.uintToString(__input.cap, 0),
        ' * 37.2%) 100%; } </style> <symbol id="xp-bar-seg"> <circle class="xp-circ" cx="1000" cy="1060.25" r="307.97"/> <path class="xp-seg" d="M1002.84,768.69c-.95,0-1.9-.01-2.84-.01s-1.9,0-2.84,.01l-.16-16c1,0,2-.01,3-.01s2,0,3,.01l-.16,16Z"/> </symbol> <linearGradient id="xp',
        __constant2,
        '0"/> </linearGradient> <linearGradient id="hilt',
        __constant2,
        '1"/> </linearGradient> </defs> <circle class="xp-guide" cx="1000" cy="1060.25" r="320"/> <circle class="xp-guide" cx="1000" cy="1060.25" r="290"/> <path id="bar-base" d="M1000,1365 a1,1 0 0,0 0,-610" class="xp-fill" stroke-linecap="round"> </path> <use href="#bar-base" transform="scale(-1,1) translate(-2000,0)"></use> <g class="hilt" filter="url(#glowEmboss)" id="xp-hilt"> <rect width="40" height="40" x="980" y="1345" transform="rotate(45, 1000, 1365)"/> <rect width="40" height="40" x="980" y="1345" /> </g> ',
        __input.crown
          ? ' <use href="#xp-hilt" transform="translate(0,-610)"></use> '
          : ""
      )
    );
  }

  function stars(Stars memory __input)
    internal
    pure
    returns (string memory __result)
  {
    __result = string(
      abi.encodePacked(
        __result,
        '<defs> <filter id="stars"> <feTurbulence baseFrequency="0.1" seed="',
        SolidMustacheHelpers.uintToString(__input.starsSeed, 0),
        '"></feTurbulence> <feColorMatrix values="0 0 0 7 -4 0 0 0 7 -4 0 0 0 7 -4 0 0 0 0 1" ></feColorMatrix> </filter> </defs> <clipPath id="starsclip"> <circle cx="1000" cy="1060" r="520"></circle> </clipPath> <mask id="starsmask"> <g filter="url(#stars)" transform="scale(2)"> <rect width="100%" height="100%"></rect> </g> </mask> <circle class="bc" cx="1000" cy="1060" r="260"></circle> <circle class="bc" cx="1000" cy="1060" r="360"></circle> <circle class="bc" cx="1000" cy="1060" r="440"></circle> <circle class="bc" cx="1000" cy="1060" r="520"></circle> <line class="bc" x1="740" y1="610" x2="1260" y2="1510"></line> <line class="bc" x1="1260" y1="610" x2="740" y2="1510"></line> <line class="bc" x1="1450" y1="800" x2="550" y2="1320"></line> <line class="bc" x1="1450" y1="1320" x2="550" y2="800"></line> <g style="filter: blur(2px);"> <rect width="100%" height="100%" fill="white" mask="url(#starsmask)" clip-path="url(#starsclip)" ></rect> </g>'
      )
    );
  }

  function stone(Stone memory __input)
    internal
    pure
    returns (string memory __result)
  {
    __result = string(
      abi.encodePacked(
        __result,
        '<filter id="texture"> <feTurbulence ',
        __input.fractalNoise ? 'type="fractalNoise"' : "",
        ' baseFrequency="',
        SolidMustacheHelpers.uintToString(__input.turbFreqX, 3),
        " ",
        SolidMustacheHelpers.uintToString(__input.turbFreqY, 3),
        '" numOctaves="',
        SolidMustacheHelpers.uintToString(__input.turbOct, 0),
        '" seed="',
        SolidMustacheHelpers.uintToString(__input.seed, 0),
        '" ></feTurbulence> <feComponentTransfer> <feFuncR type="gamma" amplitude="',
        SolidMustacheHelpers.intToString(__input.redAmp, 2),
        '" exponent="',
        SolidMustacheHelpers.intToString(__input.redExp, 2),
        '" offset="',
        SolidMustacheHelpers.intToString(__input.redOff, 2)
      )
    );
    __result = string(
      abi.encodePacked(
        __result,
        '" ></feFuncR> <feFuncG type="gamma" amplitude="',
        SolidMustacheHelpers.intToString(__input.greenAmp, 2),
        '" exponent="',
        SolidMustacheHelpers.intToString(__input.greenExp, 2),
        '" offset="',
        SolidMustacheHelpers.intToString(__input.greenOff, 2),
        '" ></feFuncG> <feFuncB type="gamma" amplitude="',
        SolidMustacheHelpers.intToString(__input.blueAmp, 2),
        '" exponent="',
        SolidMustacheHelpers.intToString(__input.blueExp, 2),
        '" offset="',
        SolidMustacheHelpers.intToString(__input.blueOff, 2),
        '" ></feFuncB> <feFuncA type="discrete" tableValues="1"></feFuncA> </feComponentTransfer> <feComposite operator="in" in2="SourceGraphic" result="stoneTexture" ></feComposite> ',
        __constant0,
        '0.8 0 " ></feColorMatrix> <feMerge> <feMergeNode in="bgGlow"></feMergeNode> <feMergeNode in="stoneTexture"></feMergeNode> </feMerge> </filter> <radialGradient id="stoneshadow"> <stop offset="0%" stop-color="hsla(0, 0%, 0%, 0)"></stop> <stop offset="90%" stop-color="hsla(0, 0%, 0%, 0.8)"></stop> </radialGradient> <defs> ',
        ' <clipPath id="stoneclip"> <circle cx="1000" cy="1060" r="260"></circle> </clipPath> </defs> '
      )
    );
    __result = string(
      abi.encodePacked(
        __result,
        ' <circle id="stone" transform="rotate(',
        SolidMustacheHelpers.uintToString(__input.rotation, 0),
        ', 1000, 1060)" cx="1000" cy="1060" r="260" filter="url(#texture)" ></circle> ',
        ' <circle cx="1200" cy="1060" r="520" fill="url(#stoneshadow)" clip-path="url(#stoneclip)" ></circle> <defs> <radialGradient id="stone-fill" cx="606.78" cy="1003.98" fx="606.78" fy="1003.98" r="2" gradientTransform="translate(-187630.67 -88769.1) rotate(-33.42) scale(178.04 178.05)" gradientUnits="userSpaceOnUse" > <stop offset=".05" stop-color="#fff" stop-opacity=".7"></stop> <stop offset=".26" stop-color="#ececec" stop-opacity=".5"></stop> <stop offset=".45" stop-color="#c4c4c4" stop-opacity=".5"></stop> <stop offset=".63" stop-color="#929292" stop-opacity=".5"></stop> <stop offset=".83" stop-color="#7b7b7b" stop-opacity=".5"></stop> <stop offset="1" stop-color="#cbcbca" stop-opacity=".5"></stop> </radialGradient> <radialGradient id="stone-highlight" cx="1148.95" cy="2659.77" fx="1148.95" fy="2659.77" r="75.93" gradientTransform="translate(312.49 2545.6) rotate(-20) scale(1 -.5)" gradientUnits="userSpaceOnUse" > <stop offset="0" stop-color="#fff" stop-opacity="0.7"></stop> <stop offset="1" stop-color="#fff" stop-opacity="0"></stop> </radialGradient> </defs> <path fill="url(#stone-fill)" d="M1183.84,876.14c101.54,101.54,101.56,266.17,.04,367.7-101.52,101.52-266.21,101.56-367.74,.02-101.54-101.54-101.54-266.17,0-367.7s266.17-101.56,367.7-.02Z" ></path> <path fill="url(#stone-highlight)" d="M918.85,856.64c48.74-19.4,96.54-14.34,106.77,11.32,10.22,25.66-21.02,62.18-69.78,81.58s-96.54,14.34-106.77-11.32c-10.22-25.64,21.02-62.18,69.78-81.58Z" > </path>'
      )
    );
  }

  function frame(Frame memory __input)
    internal
    pure
    returns (string memory __result)
  {
    __result = string(
      abi.encodePacked(
        __result,
        '<defs> <linearGradient id="gradient-fill"> <stop offset="0" stop-color="black" /> <stop offset="0.5" stop-color="rgba(255,255,255,0.5)" /> <stop offset="1" stop-color="rgba(255,255,255,0.8)" /> </linearGradient> <style type="text/css"> .title {font: 45px serif; fill: #999777; mix-blend-mode: difference; text-transform: uppercase; letter-spacing: 5px} .titleBox {fill: none; stroke:#DCD7AF; stroke-width: 4px;} .frame-line { fill: none; stroke: url(#gradient-fill); stroke-miterlimit: 10; stroke-width: 2px; mix-blend-mode: plus-lighter; } .frame-circ { fill: url(#gradient-fill); mix-blend-mode: plus-lighter; } </style> </defs>',
        __input.level1
          ? ' <g> <g id="half1"> <polyline class="frame-line" points="999.95 170.85 1383.84 170.85 1862.82 137.14 1862.82 1863.5 1759.46 2478.5 1481.46 2794.5 999.98 2794.5"/> <polyline class="frame-line" points="1000 69 1931.46 68.5 1931.39 2930.43 1569.96 2931 1480.96 2828 999.99 2828"/> </g> <use href="#half1" transform="scale(-1,1) translate(-2000,0)"></use> <circle class="frame-circ" cx="1000" cy="68.5" r="16.65"/> </g>'
          : "",
        __input.level2
          ? ' <g> <circle class="frame-circ" cx="1000" cy="68.5" r="16.65"/> <g id="half2"> <polyline class="frame-line" points="1000 69 1931.46 68.5 1931.39 2930.43 1569.96 2931 1480.96 2828 1000 2828"/> <polyline class="frame-line" points="1897.11 102.86 1383.84 137.14 1000 137.14"/> <polyline class="frame-line" points="1897.17 102.86 1897.46 2896.5 1710.57 2897.5 1607.57 2811.25 1000 2811.25"/> <polyline class="frame-line" points="1607.57 2794.5 1759.46 2478.5 1862.46 1898 1862.82 711.53 1357.29 206 1000 205.71"/> <line class="frame-line" x1="1607.57" y1="2794.5" x2="1000" y2="2794.5"/> <line class="frame-line" x1="1371.92" y1="172" x2="1000" y2="172"/> <polyline class="frame-line" points="1371.92 172 1862.82 661.72 1862.82 137.14 1371.92 172"/> <line class="frame-line" x1="999.41" y1="240.85" x2="998.82" y2="240.85"/> <line class="frame-line" x1="999.41" y1="240.85" x2="1000" y2="240.85"/> <polyline class="frame-line" points="1000 2773.5 1481.46 2773.5 1573.01 1924.59 1827.75 1412.39 1827.75 725.62 1342.13 240 1000 240.84"/> <line class="frame-line" x1="999.41" y1="240.85" x2="1000" y2="240.84"/> </g> <use href="#half2" transform="scale(-1,1) translate(-2000,0)"></use> </g>'
          : "",
        __input.level3
          ? ' <g> <g id="half3"> <polyline class="frame-line" points="1000 69 1931.5 68.5 1931.43 2930.43 1570 2931 1481 2828 1000 2828"/> <polyline class="frame-line" points="1529.47 205.71 1494.75 170.99 1434.52 170.99 1366.78 102.65 1000.15 102.51"/> <polyline class="frame-line" points="1897.15 697.11 1827.43 627.96 1827.43 503.65 1759.61 435.84 1759.65 239.65 1563.41 239.65 1529.47 205.71"/> <polyline class="frame-line" points="1794.28 470.49 1794.32 205.71 1529.47 205.71"/> <polyline class="frame-line" points="1505.26 2630.76 1505.26 2329.59 1827.78 1797.3 1827.78 1091.27"/> <polyline class="frame-line" points="1505.26 2630.76 1505.26 2741.32 1474.99 2773.5 1000.04 2773.5 1000 2773.5"/> <polyline class="frame-line" points="1827.78 1091.27 1827.78 725.62 1342.17 240 1000 240.84"/> <line class="frame-line" x1="1000" y1="240.84" x2="998.85" y2="240.85"/> <polyline class="frame-line" points="1897.2 697.11 1897.5 2896.5 1710.61 2897.5 1607.61 2811.25 1000 2811.25"/> <polyline class="frame-line" points="1000 205.71 1357.32 206 1862.86 711.53 1862.5 1898 1759.5 2478.5 1481.5 2794.5 1000 2794.5"/> <line class="frame-line" x1="1827.78" y1="1091.27" x2="1827.82" y2="1091.1"/> <polyline class="frame-line" points="1505.26 2630.76 1367.45 2554.29 1367.45 2220.5 1792.75 1724.22 1792.75 1248.5 1827.78 1091.27"/> <line class="frame-line" x1="1523.72" y1="2641" x2="1505.26" y2="2630.76"/> <polygon class="frame-line" points="1516.66 2779.74 1533.6 2794.5 1754.59 2794.5 1854.26 2880.53 1879.75 2880.53 1879.75 2016.03 1854.5 2050.86 1773.41 2487.85 1516.66 2779.74"/> <polygon class="frame-line" points="1827.82 2003.62 1827.78 1827.65 1541.42 2300.27 1541.42 2701.3 1745.92 2465.88 1827.82 2003.62"/> <path class="frame-circ" d="M1523.72,2437.57c-19.52,0-17.5-108.68-17.5-108.68v303.83l17.5,8.28v-203.43Z"/> </g> <use href="#half3" transform="scale(-1,1) translate(-2000,0)"></use> <circle class="frame-circ" cx="1000" cy="68.5" r="16.65"/> </g>'
          : "",
        __input.level4
          ? ' <g> <g id="half4"> <polyline class="frame-line" points="1000 69 1931.5 68.5 1931.43 2930.43 1570 2931 1481 2828 1000 2828"/> <line class="frame-line" x1="1897.28" y1="863.04" x2="1897.5" y2="2880.53"/> <polyline class="frame-line" points="1897.28 863.04 1897.2 102.86 1000 102.86"/> <polyline class="frame-line" points="1897.5 2880.53 1897.5 2896.5 1710.61 2897.5 1607.61 2811.25 1000 2811.25"/> <polyline class="frame-line" points="1897.5 2880.53 1897.5 2880.53 1897.5 862.02 1897.28 863.04"/> <polyline class="frame-line" points="1897.28 863.04 1880.5 941.98 1880.5 2482.5 1668.74 2606.83 1516.66 2779.74 1533.6 2794.5 1754.59 2794.5 1854.26 2880.53 1897.5 2880.53"/> <polygon class="frame-line" points="1810.37 1957.47 1584.83 2627.74 1598.53 2636.23 1743.99 2466.19 1833.34 1957.47 1810.37 1957.47"/> <polygon class="frame-line" points="1792.74 1887.34 1521.19 2335.31 1519.33 2728.41 1540.01 2703.32 1792.74 1957.47 1792.74 1887.34"/> <line class="frame-line" x1="1760.57" y1="1061.26" x2="1760.57" y2="1185.5"/> <line class="frame-line" x1="1760.57" y1="1061.26" x2="1760.57" y2="658.41"/> <polyline class="frame-line" points="1367.38 2457.75 1314.63 2424.63 1314.7 2083.5 1743.57 1676.44"/> <polyline class="frame-line" points="1743.57 1676.44 1760.57 1660.31 1760.57 1185.5"/> <polygon class="frame-line" points="1385.01 2220.72 1421.7 2503.81 1475.28 2593.06 1489.95 2601.39 1489.95 2324.67 1792.75 1830.71 1792.75 1742.41 1385.01 2220.72"/> <polyline class="frame-line" points="1743.57 1676.44 1743.57 1265.46 1760.57 1185.5"/> <polyline class="frame-line" points="1810.78 1825.36 1810.78 1265.44 1827.78 1185.47"/> <polyline class="frame-line" points="1760.57 1061.26 1725.5 1218.65 1725.5 1592.76 1268.07 1931.48 1268.07 2424.5 1367.45 2484.94"/> <polyline class="frame-line" points="1367.45 2484.94 1367.45 2220.5 1792.75 1724.22 1792.75 1218.65 1827.78 1061.42"/> <line class="frame-line" x1="1827.82" y1="1061.26" x2="1827.78" y2="1061.42"/> <polyline class="frame-line" points="1367.45 2484.94 1367.45 2554.29 1490.09 2622.34 1490.09 2734.78 1468.95 2756.5 1390.92 2756.5 1310.95 2773.5"/> <polygon class="frame-line" points="1390.64 240 1827.78 677.14 1827.78 346.02 1504.22 240 1390.64 240"/> <polygon class="frame-line" points="1827.78 240 1582.82 240 1827.78 315.28 1827.78 240"/> <line class="frame-line" x1="1827.78" y1="1061.42" x2="1827.78" y2="1185.47"/> <polyline class="frame-line" points="1310.95 2773.5 1001.4 2773.5 1000.22 2773.5 1000.04 2773.5 1000 2773.5"/> <polyline class="frame-line" points="1827.78 1185.47 1827.78 1797.3 1505.26 2329.59 1505.26 2741.32 1474.99 2773.5 1310.95 2773.5"/> <polyline class="frame-line" points="1827.78 1061.42 1827.78 725.62 1342.17 240 1000 240"/> <polyline class="frame-line" points="1000 205.71 1383.88 205.71 1862.86 137.14 1862.86 1863.5 1759.5 2478.5 1481.5 2794.5 1000 2794.5"/> <circle class="frame-circ" cx="1811.14" cy="191.9" r="16.65"/> <circle class="frame-circ" cx="1811.14" cy="2745.05" r="16.65"/> </g> <use href="#half4" transform="scale(-1,1) translate(-2000,0)"></use> <circle class="frame-circ" cx="1000" cy="68.5" r="16.65"/> </g>'
          : "",
        __input.level5
          ? ' <g> <g id="half5"> <circle class="frame-circ" cx="1730.45" cy="2846.73" r="16.65"/> <path class="frame-circ" d="M1373.87,2812.06c0-19.52,108.68-17.5,108.68-17.5h-482.63l.2,17.5h373.75Z"/> <path class="frame-circ" d="M1373.87,2826.85c0-19.52,108.68-17.5,108.68-17.5h-482.63l.2,17.5h373.75Z"/> <polyline class="frame-line" points="1000 137.11 1131.57 137.04 1178.34 68.9 1931.5 68.5 1931.43 2930.43 1570 2931 1481 2828 1000 2828"/> <polyline class="frame-line" points="1897.28 863.04 1897.2 102.86 1210.67 102.86 1165.79 170.24 1000 170.31"/> <line class="frame-line" x1="1897.28" y1="863.04" x2="1897.5" y2="2880.53"/> <polyline class="frame-line" points="1897.5 2880.53 1897.5 2896.5 1710.61 2897.5 1607.61 2811.25 1000 2811.25"/> <polyline class="frame-line" points="1897.28 863.04 1880.5 941.98 1880.5 2482.5 1668.74 2606.83 1516.66 2779.74 1533.6 2794.5 1754.59 2794.5 1854.26 2880.53 1897.5 2880.53"/> <polyline class="frame-line" points="1897.5 2880.53 1897.5 2880.53 1897.5 862.02 1897.28 863.04"/> <polyline class="frame-line" points="1827.78 1192.28 1827.78 1797.3 1505.26 2329.59 1505.26 2741.32 1474.99 2773.5 1108.16 2773.5"/> <polyline class="frame-line" points="1108.16 2773.5 1001.4 2773.5 1000.22 2773.5 1000.04 2773.5 1000 2773.5"/> <polyline class="frame-line" points="1795.65 693.48 1342.17 240 1000 240"/> <line class="frame-line" x1="1827.78" y1="1192.28" x2="1827.78" y2="1061.42"/> <polyline class="frame-line" points="1827.78 1061.42 1827.78 725.62 1795.65 693.48"/> <polyline class="frame-line" points="1000 205.71 1343.14 205.71 1387.55 137.14 1637.33 137.14 1862.86 724.46 1862.86 1863.5 1759.5 2478.5 1481.5 2794.5 1000 2794.5"/> <polygon class="frame-line" points="1391.12 258.56 1749.43 619.82 1802.81 619.82 1623.32 160.77 1403.75 160.77 1391.12 258.56"/> <polyline class="frame-line" points="1743.58 1781.6 1792.75 1724.22 1792.75 1218.65 1827.78 1061.42"/> <line class="frame-line" x1="1827.82" y1="1061.26" x2="1827.78" y2="1061.42"/> <polyline class="frame-line" points="1367.45 2484.94 1367.45 2554.29 1433.9 2622.34 1433.9 2734.78 1412.76 2756.5 1188.13 2756.5 1108.16 2773.5"/> <polyline class="frame-line" points="1367.45 2484.94 1367.45 2220.5 1743.58 1781.6"/> <polyline class="frame-line" points="1367.45 2484.94 1268.07 2424.5 1268.07 1931.48 1725.5 1592.76 1725.5 1218.65 1760.57 1061.26 1760.57 658.41"/> <polyline class="frame-line" points="1760.57 1761.76 1760.57 1218.65 1795.65 1061.26 1795.65 972.9"/> <line class="frame-line" x1="1795.65" y1="693.48" x2="1795.65" y2="972.9"/> <polygon class="frame-line" points="1354.28 1995.11 1516.66 1871.28 1516.66 1822.34 1608.69 1751.67 1608.69 1697.46 1281.35 1941.68 1281.35 2416.1 1354.28 2461.09 1354.28 1995.11"/> <polygon class="frame-line" points="1367.48 2197.71 1728.39 1776.02 1725.8 1612.05 1621.83 1687.86 1621.83 1758.95 1528.89 1828.67 1528.89 1882.83 1367.48 2003.92 1367.48 2197.71"/> <polygon class="frame-line" points="1504.51 2079.27 1504.51 2307.23 1795.65 1826.17 1795.65 1741.8 1504.51 2079.27"/> <polygon class="frame-line" points="1379.42 2225.53 1379.42 2544.67 1447.81 2613.04 1488.39 2613.04 1488.39 2097.65 1379.42 2225.53"/> <polygon class="frame-line" points="1810.37 1957.47 1584.83 2627.74 1598.53 2636.23 1743.99 2466.19 1833.34 1957.47 1810.37 1957.47"/> <polygon class="frame-line" points="1792.74 1887.34 1521.19 2335.31 1519.33 2728.41 1540.01 2703.32 1792.74 1957.47 1792.74 1887.34"/> <polyline class="frame-line" points="1827.78 1192.28 1810.78 1272.24 1810.78 1825.36"/> <polyline class="frame-line" points="1743.58 1781.6 1743.58 1217.84 1795.65 972.9"/> <polygon class="frame-line" points="1880.5 2511.85 1862.86 2511.85 1681.48 2620.12 1580.39 2737.19 1618.59 2777.12 1759.78 2776.27 1859.09 2863.38 1880.17 2863.38 1880.5 2511.85"/> </g> <use href="#half5" transform="scale(-1,1) translate(-2000,0)"></use> <circle class="frame-circ" cx="1000" cy="68.5" r="16.65"/> </g>'
          : "",
        ' <text text-anchor="middle" x="1000" y="2895" class="title">',
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
        '<defs> <g id="halo" filter="url(#glowEmboss)"> <path d="',
        __input.halo0
          ? "M.48.13l114,425c-40.8-153.6-6.74-230.8,92.76-231.6,99.5.8,133.55,78,92.75,231.6l114-425c-31.4,116.1-103.4,173.9-206.7,173.4C103.91,174,31.78,116.23.48.13Z"
          : "",
        __input.halo1
          ? "M210.75,0Q181.91,217,105.43,215,29,217,.12,0L55.41,420q-21.87-164.34,50-164.66,71.91.33,50,164.66Z"
          : "",
        __input.halo2
          ? "M171.43,0q0,115.31,170.82,162.49L331.9,201.13Q171.43,162.26,171.43,420q0-257.73-160.47-218.87L.61,162.49Q171.43,115.3,171.43,0Z"
          : "",
        __input.halo3
          ? "M193.39,0c0,25.3-96.18,51.7-192.78,79.1L11,117.7c89.7-21.2,182.38-7.1,182.38,42.3,0-49.4,92.74-63.5,182.44-42.3l10.4-38.6C289.53,51.7,193.39,25.3,193.39,0Z"
          : "",
        __input.halo4
          ? "M.62,243.77l23.47,76.41c72.53-22.62,153.68-25.54,227.65-8.19L323.37.11q-48.76,209-206.45,222A520.91,520.91,0,0,0,.62,243.77Z"
          : "",
        __input.halo5
          ? "M157.16,46.3Q136.46,199,50.06,200.8c-16.5.6-33.1,2-49.5,4.1L11,284.2a441.94,441.94,0,0,1,114.9,0Z"
          : "",
        '" fill="hsl(',
        __input.hue,
        ', 10%, 64%)" style="transform: translateX(-50%); transform-box: fill-box;" /> '
      )
    );
    if (__input.halo4) {
      __result = string(
        abi.encodePacked(
          __result,
          ' <circle fill="hsl(',
          __input.hue,
          ', 10%, 64%)" cx="0" cy="80" r="40"/> '
        )
      );
    }
    __result = string(abi.encodePacked(__result, " "));
    if (__input.halo5) {
      __result = string(
        abi.encodePacked(
          __result,
          ' <circle fill="hsl(',
          __input.hue,
          ', 10%, 64%)" cx="0" cy="60" r="40"/> '
        )
      );
    }
    __result = string(
      abi.encodePacked(
        __result,
        " </g> </defs> ",
        ' <g transform="translate(1000 1060)"> '
      )
    );
    for (uint256 __i; __i < __input.rhythm.length; __i++) {
      __result = string(
        abi.encodePacked(
          __result,
          ' <g style="transform: rotate(calc(',
          SolidMustacheHelpers.uintToString(__i, 0),
          " * 15deg)) translateY(",
          __input.halo0 ? "-770px" : "",
          __input.halo1 ? "-800px" : "",
          __input.halo2 ? "-800px" : "",
          __input.halo3 ? "-800px" : "",
          __input.halo4 ? "-740px" : "",
          __input.halo5 ? "-720px" : "",
          ');" > ',
          __input.rhythm[__i] ? '<use href="#halo"></use>' : "",
          " </g> "
        )
      );
    }
    __result = string(abi.encodePacked(__result, " </g>"));
  }

  function handles(Handle memory __input)
    internal
    pure
    returns (string memory __result)
  {
    __result = string(
      abi.encodePacked(
        __result,
        '<defs> <style> .a, .d { fill: none; } .a, .b, .c, .d, .e, .f, .g, .h, .i, .k { stroke: #000; stroke-width: 0.25px; } .b, .c, .e, .g { fill: #fff; } .purpFill { fill: #584975; } .brickFill { fill: #e0727f; } .lavenderFill { fill: #ad93c5; } .red { --wedge-color: #e0727f; } .greyBlueFill { fill: #8a9fa4; } .orangeFill { fill: #efc981; } .goldFill { fill: #f5cc14; } .redFill { fill: #ed2d2e; } .navyFill { fill: #053c5b; } .grey { --wedge-color: #8a9fa4; } .blue { --wedge-color: #053c5b; } .blackFill{ fill: #1b1925; } .blueFill { fill: #425288; } .greenFill { fill: #aad37e; } .blue { --wedge-color: #425288; } .greyFill { fill: #8a9fa4; } .lightGreyFill { fill: #c3cdd7; } .lightBlueFill { fill: #8cb3db; } .darkBlueFill { fill: #3a4757; } .darkBlue { --wedge-color: #3a4757; } </style> <symbol id="wa" viewBox="0 0 111.09 111.03"> <style> .cw { fill: var(--wedge-color) } </style> <path class="c" d="M12.19,110.9A226.3,226.3,0,0,0,111,12.13l-6.6-3.37A226.31,226.31,0,0,1,8.83,104.3Z" ></path> <path class="c cw" d="M8.82,104.29A226.25,226.25,0,0,0,104.36,8.76L87.44.12C83.82,7.23,75.12,20.71,75.12,20.71c-14.76,21-32.2,22.58-52.73,1.6,21.12,20.29,19.36,38-1.6,52.75h-.06A203.67,203.67,0,0,1,.12,87.22Z" ></path> </symbol> <symbol id="wb" viewBox="0 0 113.58 64.7"> <style> .cw { fill: var(--wedge-color) } </style> <path class="a cw" d="M3.28,4.36.15,32S56.79,17.86,56.79,64.7C56.79,17.86,113.43,32,113.43,32L110.3,4.36C87.44-1.34,29.93-1.23,3.28,4.36Z" ></path> <path class="b" d="M.15,32S25.2,25.76,42,35.35C33.16,30,8.68,33.45,8.68,33.45L0,32.08" ></path> <path class="b" d="M113.43,32s-25.06-6.27-41.85,3.32c8.84-5.32,33.31-1.9,33.31-1.9l8.66-1.38" ></path> </symbol> <symbol id="c" viewBox="0 0 210.85 420.03"> <path class="greyFill" d="M210.72,0q-28.8,217.05-105.3,215Q28.92,217,.12,0l55.3,420q-21.9-164.4,50-164.7,71.85.3,50,164.7Z" ></path> </symbol> <symbol id="g" viewBox="0 0 345.72 148.44"> <path class="lightBlueFill" d="M172.86,0c1.43,20.32,9.8,60.4,172.84,87.8-167.23-20.58-171.58,36.62-172.84,60.5h0C171.59,124.43,167.25,67.23,0,87.81,163.06,60.41,171.43,20.33,172.86,0Z" ></path> </symbol> <symbol id="h" viewBox="0 0 47.93 90.1"> <path class="b" d="M24,90.1C24,75.61,39.62,56.23,47.8,48,47.8,36.39,24,17.56,24,0,24,17.56.12,36.39.12,48,8.31,56.23,24,75.61,24,90.1Z" ></path> <path class="c" d="M45.09,39.85C34.91,49.38,27.6,58.1,24,68.84,20.33,58.1,13,49.4,2.83,39.86,9.07,28.56,24,13.88,24,0,24,13.88,38.85,28.55,45.09,39.85Z" ></path> <line class="b" x1="23.96" y1="68.84" x2="23.96" y2="90.1"></line> </symbol> </defs>',
        __input.handle0
          ? '<g filter="url(#glowEmboss)" style="opacity: 1; mix-blend-mode: luminosity"> <path class="purpFill" d="M1072.87,2312.5c-12.89-12.84-17.5-23.55-25.2-80.09-26.48-194.64-1.49-683.16,34.33-778.18l-31.9-39.83H949.72L918,1454.26c35.82,95,60.81,583.51,34.33,778.15-7.7,56.54-12.34,67.25-25.23,80.09Z" ></path> <rect class="c" x="940.75" y="1406.98" width="118.5" height="7.43" rx="3.71" ></rect> <rect class="c" x="940.75" y="1592.58" width="118.5" height="7.43" rx="3.71" ></rect> <rect class="c" x="944.37" y="1630.58" width="111.25" height="7.43" rx="3.71" ></rect> <rect class="c" x="947.8" y="1668.58" width="104.4" height="7.43" rx="3.71" ></rect> <rect class="c" x="951.04" y="1706.58" width="97.92" height="7.43" rx="3.71" ></rect> <rect class="c" x="953.25" y="1744.58" width="93.5" height="7.43" rx="3.71" ></rect> <rect class="c" x="955.11" y="1782.58" width="89.77" height="7.43" rx="3.71" ></rect> <rect class="c" x="956.74" y="1820.58" width="86.52" height="7.43" rx="3.71" ></rect> <rect class="c" x="958.1" y="1858.58" width="83.8" height="7.43" rx="3.71" ></rect> <rect class="c" x="959.12" y="1896.58" width="81.75" height="7.43" rx="3.71" ></rect> <rect class="c" x="959.74" y="1934.58" width="80.51" height="7.43" rx="3.71" ></rect> <rect class="c" x="960.21" y="1972.58" width="79.59" height="7.43" rx="3.71" ></rect> <rect class="c" x="960.21" y="2010.58" width="79.59" height="7.43" rx="3.71" ></rect> <rect class="c" x="960.13" y="2048.58" width="79.74" height="7.43" rx="3.71" ></rect> <rect class="c" x="959.35" y="2086.58" width="81.29" height="7.43" rx="3.71" ></rect> <rect class="c" x="957.54" y="2124.58" width="84.91" height="7.43" rx="3.71" ></rect> <rect class="c" x="955.12" y="2162.58" width="89.75" height="7.43" rx="3.71" ></rect> <path class="b" d="M1000,1552.61a231.36,231.36,0,0,1-103.09-24.11l5.35-10.74a220.45,220.45,0,0,0,196.06-.28l5.37,10.72A231.46,231.46,0,0,1,1000,1552.61Z" ></path> <use class="red" width="111.09" height="111.03" transform="translate(1090.5 1425.54)" xlink:href="#wa" ></use> <use class="red" width="111.09" height="111.03" transform="matrix(0, 1, -1, 0, 909.49, 1425.8)" xlink:href="#wa" ></use> <use class="red" width="113.58" height="64.7" transform="translate(943.21 2198.93)" xlink:href="#wb" ></use> <use class="red" width="113.58" height="64.7" transform="translate(1070.91 1557.69) rotate(180) scale(1.25 1)" xlink:href="#wb" ></use> <line class="purpFill" x1="917.61" y1="1454.24" x2="1081.56" y2="1454.21" ></line> <g> <path class="b" d="M928.07,2383.83c9.66-5,8.46,14.84,8.46,14.84s-10.69,4.59-6.67,22.21C929.86,2420.88,918.41,2388.86,928.07,2383.83Z" ></path> <path class="b" d="M1071.93,2383.83c-9.66-5-8.46,14.84-8.46,14.84s10.69,4.59,6.66,22.21C1070.13,2420.88,1081.59,2388.86,1071.93,2383.83Z" ></path> <circle class="lavenderFill" cx="1000" cy="2350.44" r="79.72"></circle> <path class="b" d="M1000,2350.72s102.47,3.85,68.28-51.42l-4.4,3.31c29.56,43.54-63.87,42.68-63.87,42.68s-93.43.86-63.87-42.68l-4.4-3.31C897.54,2354.57,1000,2350.72,1000,2350.72Z" ></path> <path class="b" d="M949,2486.93l10.52,62.64c16.54-32.5,64.32-32.45,80.9,0l10.57-62.62C1020,2524.61,979,2524.72,949,2486.93Zm88.6,50.5c-18.61-22-56.81-22.18-75.3,0l-6-35.67c28.07,24.16,59.67,23.89,87.35,0Z" ></path> <path class="a" d="M949,2486.93c2.14,4.83,7.3,14.78,7.3,14.78"></path> <path class="a" d="M962.28,2537.38s-2.81,11.44-2.78,12.19"></path> <path class="a" d="M1037.58,2537.43s3,11.8,2.82,12.13"></path> <path class="a" d="M1051,2486.94c0,.26-7.34,14.77-7.34,14.77"></path> <path class="brickFill" d="M1068.27,2299.3c34.24,55.38-68.27,51.42-68.27,51.42s-102.51,4-68.27-51.42c-11.34,13.16-18.23,35.65-17.16,51.33,5.82,85.46,36.09,216.91,52.9,317.89-20.77-124.54,16-132.08,32.53-132.08s53.3,7.54,32.53,132.08c16.81-101,47.08-232.43,52.9-317.89C1086.5,2335,1079.61,2312.46,1068.27,2299.3Zm-27.87,250.26c-16.58-32.44-64.36-32.49-80.9,0L949,2486.93c30,37.79,71,37.68,102,0Zm32.77-145.09c-7.56,56.73-43.27,99.51-73.17,99.51s-65.61-42.78-73.17-99.51c-.72-5.37-9.09-48.88,73.17-47.72C1082.25,2355.59,1073.89,2399.1,1073.17,2404.47Z" ></path> </g> </g>'
          : "",
        __input.handle1
          ? '<g filter="url(#glowEmboss)" style="opacity: 1; mix-blend-mode: luminosity"> <rect class="c" x="946.87" y="1406.98" width="106.26" height="7.43" rx="3.71" ></rect> <g> <circle class="e" cx="1000" cy="2020.31" r="130.09"></circle> <circle class="greyBlueFill" cx="1000" cy="2020.31" r="125.67"></circle> <circle class="orangeFill" cx="1000" cy="2020.31" r="118.29"></circle> <path class="goldFill" d="M1000,2000.64a123.54,123.54,0,0,0-109.09,65.47,118.33,118.33,0,0,0,218.18,0A123.54,123.54,0,0,0,1000,2000.64Z" ></path> </g> <polygon class="redFill" points="963.33 1414.39 1036.63 1414.39 1079.21 2312.5 920.79 2312.5 963.33 1414.39" ></polygon> <rect class="c" x="951.74" y="1567.42" width="96.52" height="7.43" rx="3.71" ></rect> <rect class="c" x="949.95" y="1604.74" width="100.1" height="7.43" rx="3.71" ></rect> <rect class="c" x="948.75" y="1642.06" width="102.51" height="7.43" rx="3.71" ></rect> <rect class="c" x="946.88" y="1679.38" width="106.23" height="7.43" rx="3.71" ></rect> <rect class="c" x="944.69" y="1716.71" width="110.62" height="7.43" rx="3.71" ></rect> <rect class="c" x="943.48" y="1754.03" width="113.04" height="7.43" rx="3.71" ></rect> <rect class="c" x="941.76" y="1791.35" width="116.47" height="7.43" rx="3.71" ></rect> <rect class="c" x="940.3" y="1828.67" width="119.39" height="7.43" rx="3.71" ></rect> <rect class="c" x="938.51" y="1865.99" width="122.97" height="7.43" rx="3.71" ></rect> <rect class="c" x="936.6" y="1903.31" width="126.79" height="7.43" rx="3.71" ></rect> <rect class="c" x="934.63" y="1940.63" width="130.74" height="7.43" rx="3.71" ></rect> <g> <g> <path class="redFill" d="M823.81,2336.79c.19.2,168.38,231.74,168.38,231.74C892.77,2431.48,975.1,2417,985.67,2412l-37.34-17C935.51,2399.77,895.47,2416,823.81,2336.79Z" ></path> <path class="c" d="M895.73,2410.87C930.31,2420.63,962,2406,962,2406a59.81,59.81,0,0,0-33.12,50.49Z" ></path> <path class="redFill" d="M909,2419.34l16.36,22.41c5.31-16.42,11.81-22.89,11.81-22.89S921.2,2421.22,909,2419.34Z" ></path> <line class="d" x1="895.73" y1="2410.87" x2="909.03" y2="2419.34" ></line> <path class="d" d="M925.39,2441.75c2.05,9.95,3.51,14.76,3.51,14.76" ></path> <path class="d" d="M937.2,2418.86A270.9,270.9,0,0,1,962,2406"></path> </g> <g> <path class="redFill" d="M1176.19,2336.79c-.19.2-168.38,231.74-168.38,231.74,99.42-137.05,17.09-151.55,6.52-156.5l37.34-17C1064.49,2399.77,1104.53,2416,1176.19,2336.79Z" ></path> <path class="c" d="M1104.27,2410.87c-34.58,9.76-66.29-4.85-66.29-4.85a59.81,59.81,0,0,1,33.12,50.49Z" ></path> <path class="redFill" d="M1091,2419.34l-16.36,22.41c-5.31-16.42-11.81-22.89-11.81-22.89S1078.8,2421.22,1091,2419.34Z" ></path> <line class="d" x1="1104.27" y1="2410.87" x2="1090.97" y2="2419.34" ></line> <path class="d" d="M1074.61,2441.75c-2,9.95-3.51,14.76-3.51,14.76" ></path> <path class="d" d="M1062.8,2418.86A270.9,270.9,0,0,0,1038,2406"></path> </g> <circle class="c" cx="1000.05" cy="2334.14" r="82.11"></circle> <circle class="navyFill" cx="1000.05" cy="2334.14" r="74.63"></circle> <rect class="c" x="992.78" y="2252.03" width="14.55" height="164.22" rx="7.12" ></rect> </g> <use class="blue" width="113.58" height="64.7" transform="translate(948.16 1486.67) scale(0.91 1.82)" xlink:href="#wb" ></use> <path class="b" d="M999.7,2162.58a231.36,231.36,0,0,1-103.09-24.11l5.34-10.74a220.45,220.45,0,0,0,196.06-.28l5.38,10.72A231.46,231.46,0,0,1,999.7,2162.58Z" ></path> <path class="navyFill" d="M1078.05,2186.33l-9.91-197.5c-33.77-9.88-106.63-10.07-135.59,0L922,2185Z" ></path> <use class="grey" width="113.58" height="64.7" transform="translate(1085.39 2238.61) rotate(180) scale(1.5 1.77)" xlink:href="#wb" ></use> <use class="grey" width="111.09" height="111.03" transform="translate(910.84 2036.22) rotate(90)" xlink:href="#wa" ></use> <use class="grey" width="111.09" height="111.03" transform="translate(1088.81 2036.25)" xlink:href="#wa" ></use> </g>'
          : "",
        __input.handle2
          ? '<g filter="url(#glowEmboss)" style="opacity: 1; mix-blend-mode: luminosity"> <rect class="c" x="932.34" y="1407.11" width="135.32" height="7.43" rx="3.71" ></rect> <path class="blackFill" d="M1060.37,1414.53c-55.89,187.85-41.19,540.5-3.1,673.6,33.84,118.22,28,164.92,3.1,224.37H939.63c-24.87-59.45-30.74-106.15,3.1-224.37,38.09-133.1,52.79-485.75-3.1-673.6Z" ></path> <rect class="c" x="968.13" y="1872.46" width="63.75" height="7.43" rx="3.71" ></rect> <rect class="c" x="965.24" y="1910.11" width="69.53" height="7.43" rx="3.71" ></rect> <rect class="c" x="961.89" y="1947.76" width="76.21" height="7.43" rx="3.71" ></rect> <rect class="c" x="957.71" y="1985.42" width="84.58" height="7.43" rx="3.71" ></rect> <rect class="c" x="952.34" y="2023.07" width="95.31" height="7.43" rx="3.71" ></rect> <path class="b" d="M1042.37,1824.1a233.6,233.6,0,0,1-84.85.09l1.74-11.88a221.54,221.54,0,0,0,81.62-.14Z" ></path> <path class="blueFill" d="M916.49,1754.51c-16.93,41.41,10.56,48.51,45.38,51.59l-3.7,25.83c-31-27.59-59.35-37.66-76.7,4.67,16.44-40.6-2.06-54.22-50.75-57.78l17.32-20.1C860.89,1767.71,894.94,1805.21,916.49,1754.51Z" ></path> <path class="blueFill" d="M1083.51,1754.51c16.93,41.41-10.56,48.51-45.38,51.59l3.7,25.83c31-27.59,59.35-37.66,76.7,4.67-16.44-40.6,2.06-54.22,50.75-57.78l-17.32-20.1C1139.11,1767.71,1105.06,1805.21,1083.51,1754.51Z" ></path> <g> <circle class="blackFill" cx="1000" cy="2394.55" r="65.52"></circle> <path class="blueFill" d="M1000,2342.27c32.21,0,16.36-29.78,139.83-16.19-86.7-14.18-139.54-36.64-139.83-71h0c-.29,34.36-53.13,56.82-139.83,71C983.64,2312.49,967.79,2342.27,1000,2342.27Z" ></path> <rect class="blueFill" x="914.76" y="2375.4" width="170.48" height="38.31" rx="19.16" ></rect> <path class="blueFill" d="M1000,2763.05c0-116.17,66.07-174.07,148.34-201.87l-18.6-56.63c-109.58,20.79-98.24-62.3-129.74-62.3s-20.16,83.09-129.74,62.3l-18.6,56.63C933.93,2589,1000,2646.88,1000,2763.05Z" ></path> <path class="b" d="M1000,2662.47c3.87-8.43,27.43-73.82,124-113.07l-7.45-22.76c-33.32,5.72-91.7-4.19-116.59-65.21-24.89,61-83.27,70.93-116.59,65.21L876,2549.4C972.57,2588.65,996.13,2654,1000,2662.47Z" ></path> <path class="greenFill" d="M1000,2644.66c10.86-21.45,43.5-69.61,114.4-99.65l-3.27-10.11c-58.55,7.07-99.61-31.3-111.13-56.07-11.52,24.77-52.58,63.14-111.13,56.07L885.6,2545C956.5,2575.05,989.14,2623.21,1000,2644.66Z" ></path> <line class="greenFill" x1="883.41" y1="2526.64" x2="888.87" y2="2534.9" ></line> <line class="greenFill" x1="875.96" y1="2549.4" x2="885.6" y2="2545.01" ></line> <line class="greenFill" x1="1000" y1="2644.66" x2="1000" y2="2662.47" ></line> <line class="greenFill" x1="1111.13" y1="2534.9" x2="1116.59" y2="2526.64" ></line> <line class="greenFill" x1="1114.4" y1="2545.01" x2="1124.04" y2="2549.4" ></line> <line class="greenFill" x1="1000" y1="2461.43" x2="1000" y2="2478.83" ></line> <path class="b" d="M1000,2327.76s8.26-8.59,23.66-14.82c-15.24-7.85-23.66-16.4-23.66-16.4s-8.42,8.55-23.66,16.4C991.74,2319.17,1000,2327.76,1000,2327.76Z" ></path> <polygon class="greenFill" points="1000 2317.57 1007.43 2312.35 1000 2306.8 992.57 2312.35 1000 2317.57 1000 2317.57" ></polygon> <line class="a" x1="1000" y1="2296.54" x2="1000" y2="2306.8"></line> <line class="a" x1="992.57" y1="2312.35" x2="976.34" y2="2312.94"></line> <line class="a" x1="1000" y1="2317.57" x2="1000" y2="2327.76"></line> <line class="a" x1="1007.43" y1="2312.35" x2="1023.66" y2="2312.94" ></line> </g> <use class="blue" width="113.58" height="64.7" transform="translate(1034.23 1845.27) rotate(180) scale(0.6 1.46)" xlink:href="#wb" ></use> <use class="blue" width="113.58" height="64.7" transform="translate(931.59 2063.6) scale(1.2 1.17)" xlink:href="#wb" ></use> </g>'
          : "",
        __input.handle3
          ? '<g filter="url(#glowEmboss)" style="opacity: 1; mix-blend-mode: luminosity"> <polygon class="lightBlueFill" points="1020.73 2312.57 1056.21 1414.45 941.71 1414.45 980.49 2312.5 1020.73 2312.57" ></polygon> <rect class="g" x="932.34" y="1407.11" width="135.32" height="7.43" rx="3.71" ></rect> <rect class="g" x="952.07" y="1724.17" width="95.87" height="7.43" rx="3.71" ></rect> <rect class="g" x="953.03" y="1761.82" width="93.94" height="7.43" rx="3.71" ></rect> <rect class="g" x="954.56" y="1799.47" width="90.89" height="7.43" rx="3.71" ></rect> <rect class="g" x="956.51" y="1837.12" width="86.99" height="7.43" rx="3.71" ></rect> <rect class="g" x="958.05" y="1874.77" width="83.9" height="7.43" rx="3.71" ></rect> <rect class="g" x="959.5" y="1912.42" width="81.01" height="7.43" rx="3.71" ></rect> <rect class="g" x="961.19" y="1950.07" width="77.61" height="7.43" rx="3.71" ></rect> <rect class="g" x="962.89" y="1987.72" width="74.22" height="7.43" rx="3.71" ></rect> <path class="g" d="M1108.12,2074.94a212.16,212.16,0,0,0-216-.17l-4.22-7.57a220.86,220.86,0,0,1,224.88.45Z" ></path> <use class="darkBlue" width="113.58" height="64.7" transform="translate(960.53 2021.25) scale(0.7 1.46)" xlink:href="#wb" ></use> <use class="darkBlue" width="113.58" height="64.7" transform="translate(1057.53 1695.67) rotate(180) scale(1.01 1)" xlink:href="#wb" ></use> <use width="210.85" height="420.03" transform="matrix(0.2, 0.06, -0.08, 0.26, 1059.5, 1981.54)" xlink:href="#c" ></use> <use width="210.85" height="420.03" transform="matrix(0.18, 0.09, -0.12, 0.25, 1107.97, 1996.68)" xlink:href="#c" ></use> <use width="210.85" height="420.03" transform="matrix(0.2, -0.06, 0.08, 0.26, 899.72, 1993.62)" xlink:href="#c" ></use> <use width="210.85" height="420.03" transform="matrix(0.18, -0.09, 0.12, 0.25, 853.95, 2015.96)" xlink:href="#c" ></use> <g> <circle class="lightBlueFill" cx="1000.12" cy="2257.24" r="80.7"></circle> <path class="greyFill" d="M1000.12,2434.05c133.16,0,225.73-73.49,225.73-73.49L1139,2241.43c44.94,62.66,20.64,98.32-39.06,117.71-60.33,19.59-99.86-3.53-99.86-56.37,0,52.84-39.52,76-99.85,56.37-59.7-19.39-84-55-39.06-117.71L774.4,2360.56S867,2434.05,1000.12,2434.05Z" ></path> <path class="lightGreyFill" d="M825.14,2318.29c.16.5-28,38.34-28,38.34s58.07,41.42,141.65,55.79c26.24-12,45.06-23.78,45.18-42.78C928.84,2403.92,838.92,2361.64,825.14,2318.29Z" ></path> <path class="lightGreyFill" d="M1175.24,2318.29c-.17.5,28,38.34,28,38.34s-58.07,41.42-141.65,55.79c-26.23-12-45.06-23.78-45.18-42.78C1071.53,2403.92,1161.45,2361.64,1175.24,2318.29Z" ></path> <use width="345.72" height="148.44" transform="translate(827.27 2370.07)" xlink:href="#g" ></use> <path class="b" d="M1000.12,2471.48s13.9-19.84,51.12-28.43c-37.55-15.44-51.12-33.1-51.12-33.1s-13.56,17.66-51.11,33.1C986.23,2451.64,1000.12,2471.48,1000.12,2471.48Z" ></path> <path class="darkBlueFill" d="M1000.12,2462c11-10.89,24.64-17.12,33-20.15a143.14,143.14,0,0,1-33-22.49,142.72,142.72,0,0,1-33,22.49C975.49,2444.83,989.08,2451.06,1000.12,2462Z" ></path> <line class="b" x1="967.12" y1="2441.8" x2="949.01" y2="2443.05"></line> <line class="b" x1="1000.12" y1="2419.31" x2="1000.12" y2="2409.95" ></line> <line class="b" x1="1033.12" y1="2441.8" x2="1051.24" y2="2443.05"></line> <line class="b" x1="1000.12" y1="2461.95" x2="1000.12" y2="2471.48" ></line> <use width="47.93" height="90.1" transform="translate(976.04 2167.17)" xlink:href="#h" ></use> <use width="47.93" height="90.1" transform="translate(1090.11 2233.31) rotate(90)" xlink:href="#h" ></use> <use width="47.93" height="90.1" transform="translate(909.9 2281.24) rotate(-90)" xlink:href="#h" ></use> <use width="47.93" height="90.1" transform="translate(1023.96 2347.45) rotate(180)" xlink:href="#h" ></use> </g> </g>'
          : ""
      )
    );
  }

  function birthchart(__Input memory __input)
    internal
    pure
    returns (string memory __result)
  {
    __result = string(
      abi.encodePacked(
        __result,
        '<g transform="translate(1000 1060)"> <defs> <radialGradient id="aspectgradient" cx="0" cy="0" r="1" gradientUnits="objectBoundingBox" gradientTransform="translate(0.5 0.5)" > <stop stop-color="#FFFCFC" stop-opacity="0.7"></stop> <stop offset="1" stop-color="#534E41" stop-opacity="0.6"></stop> </radialGradient> <clipPath id="aspect-clip"> <circle cx="0" cy="0" r="260"></circle> </clipPath> <filter id="planet_blur"> <feGaussianBlur stdDeviation="4"></feGaussianBlur> </filter> <style> .p0 { fill: #FFF6F2 } .p1 { fill: #FFFCF0 } .p2 { fill: #FFEDED } .p3 { fill: #FFEEF4 } .p4 { fill: #FFF3E9 } .p5 { fill: #ECFDFF } .p6 { fill: #EEF7FF } .p7 { fill: #F8F0FF } </style> </defs> '
      )
    );
    for (uint256 __i; __i < __input.aspects.length; __i++) {
      __result = string(
        abi.encodePacked(
          __result,
          ' <path d="M',
          SolidMustacheHelpers.intToString(__input.aspects[__i].x1, 0),
          ",",
          SolidMustacheHelpers.intToString(__input.aspects[__i].y1, 0),
          " L",
          SolidMustacheHelpers.intToString(__input.aspects[__i].x2, 0),
          ",",
          SolidMustacheHelpers.intToString(__input.aspects[__i].y2, 0),
          ' m25,25" stroke="url(#aspectgradient)" stroke-width="8" clip-path="url(#aspect-clip)" ></path> '
        )
      );
    }
    __result = string(
      abi.encodePacked(__result, ' <g filter="url(#planet_blur)"> ')
    );
    for (uint256 __i2; __i2 < __input.planets.length; __i2++) {
      __result = string(abi.encodePacked(__result, " "));
      if (__input.planets[__i2].visible) {
        __result = string(
          abi.encodePacked(
            __result,
            '<circle cx="',
            SolidMustacheHelpers.intToString(__input.planets[__i2].x, 0),
            '" cy="',
            SolidMustacheHelpers.intToString(__input.planets[__i2].y, 0),
            '" class="p',
            SolidMustacheHelpers.uintToString(__i2, 0),
            '" r="11"></circle>'
          )
        );
      }
      __result = string(abi.encodePacked(__result, " "));
    }
    __result = string(abi.encodePacked(__result, " </g> </g>"));
  }

  function sparkle(Sparkle memory __input)
    internal
    pure
    returns (string memory __result)
  {
    __result = string(
      abi.encodePacked(
        __result,
        '<defs> <style type="text/css"> .sparkle { fill: white } </style> <symbol id="sprkl" viewBox="0 0 250.33 377.46"> <g id="b" data-name="star02"> <path class="sparkle" d="M4.01,40.74L125.22,187.24l125.11,1.79-122.18,1.79,118.17,146.5L125.11,190.82,0,189.03l122.18-1.79L4.01,40.74Z" /> <path class="sparkle" d="M105.4,0l20.23,185.39,86.64-83.73-86.17,88.3,18.11,187.5-20.23-185.39-86.64,83.73,86.17-88.3L105.4,0Z" /> </g> </symbol> </defs> <g filter="url(#burstBlur)" style="opacity: 0.6"> '
      )
    );
    for (uint256 __i; __i < __input.sparkles.length; __i++) {
      __result = string(
        abi.encodePacked(
          __result,
          ' <use width="250.33" height="377.46" transform="translate(',
          __input.sparkles[__i].tx,
          " ",
          __input.sparkles[__i].ty,
          ") scale(",
          __input.sparkles[__i].scale,
          ')" xlink:href="#sprkl" /> '
        )
      );
    }
    __result = string(abi.encodePacked(__result, " </g>"));
  }
}

library SolidMustacheHelpers {
  function intToString(int256 i, uint256 decimals)
    internal
    pure
    returns (string memory)
  {
    if (i >= 0) {
      return uintToString(uint256(i), decimals);
    }
    return string(abi.encodePacked("-", uintToString(uint256(-i), decimals)));
  }

  function uintToString(uint256 i, uint256 decimals)
    internal
    pure
    returns (string memory)
  {
    if (i == 0) {
      return "0";
    }
    uint256 j = i;
    uint256 len;
    while (j != 0) {
      len++;
      j /= 10;
    }
    uint256 strLen = decimals >= len
      ? decimals + 2
      : (decimals > 0 ? len + 1 : len);

    bytes memory bstr = new bytes(strLen);
    uint256 k = strLen;
    while (k > 0) {
      k -= 1;
      uint8 temp = (48 + uint8(i - (i / 10) * 10));
      i /= 10;
      bstr[k] = bytes1(temp);
      if (decimals > 0 && strLen - k == decimals) {
        k -= 1;
        bstr[k] = ".";
      }
    }
    return string(bstr);
  }
}
