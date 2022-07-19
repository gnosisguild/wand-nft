import React from "react";
import styles from "./Slider.module.css";

type Props = {
  wide: boolean;
};

const Gradient: React.FC<Props> = ({ wide }) =>
  !wide ? (
    <linearGradient id="gray-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset={"0%"} stopColor="hsl(0, 0%, 90%)" />
      <stop offset={"80%"} stopColor="hsl(0, 0%, 10%)" />
    </linearGradient>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="-10 -10 220 220"
      className={styles.hueSliderSvg}
    >
      <defs>
        <linearGradient
          id="wheelseg1"
          gradientUnits="userSpaceOnUse"
          x1="0.000"
          y1="-100.000"
          x2="30.003"
          y2="-95.393"
        >
          <stop offset="0%" stopColor="hsl(0,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(17,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg2"
          gradientUnits="userSpaceOnUse"
          x1="30.003"
          y1="-95.393"
          x2="57.241"
          y2="-81.997"
        >
          <stop offset="0%" stopColor="hsl(17,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(35,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg3"
          gradientUnits="userSpaceOnUse"
          x1="57.241"
          y1="-81.997"
          x2="79.205"
          y2="-61.046"
        >
          <stop offset="0%" stopColor="hsl(35,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(52,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg4"
          gradientUnits="userSpaceOnUse"
          x1="79.205"
          y1="-61.046"
          x2="93.871"
          y2="-34.470"
        >
          <stop offset="0%" stopColor="hsl(52,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(70,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg5"
          gradientUnits="userSpaceOnUse"
          x1="93.871"
          y1="-34.470"
          x2="99.889"
          y2="-4.718"
        >
          <stop offset="0%" stopColor="hsl(70,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(87,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg6"
          gradientUnits="userSpaceOnUse"
          x1="99.889"
          y1="-4.718"
          x2="96.702"
          y2="25.469"
        >
          <stop offset="0%" stopColor="hsl(87,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(105,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg7"
          gradientUnits="userSpaceOnUse"
          x1="96.702"
          y1="25.469"
          x2="84.606"
          y2="53.308"
        >
          <stop offset="0%" stopColor="hsl(105,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(122,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg8"
          gradientUnits="userSpaceOnUse"
          x1="84.606"
          y1="53.308"
          x2="64.715"
          y2="76.237"
        >
          <stop offset="0%" stopColor="hsl(122,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(140,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg9"
          gradientUnits="userSpaceOnUse"
          x1="64.715"
          y1="76.237"
          x2="38.860"
          y2="92.141"
        >
          <stop offset="0%" stopColor="hsl(140,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(157,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg10"
          gradientUnits="userSpaceOnUse"
          x1="38.860"
          y1="92.141"
          x2="9.425"
          y2="99.555"
        >
          <stop offset="0%" stopColor="hsl(157,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(175,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg11"
          gradientUnits="userSpaceOnUse"
          x1="9.425"
          y1="99.555"
          x2="-20.878"
          y2="97.796"
        >
          <stop offset="0%" stopColor="hsl(175,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(192,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg12"
          gradientUnits="userSpaceOnUse"
          x1="-20.878"
          y1="97.796"
          x2="-49.257"
          y2="87.027"
        >
          <stop offset="0%" stopColor="hsl(192,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(210,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg13"
          gradientUnits="userSpaceOnUse"
          x1="-49.257"
          y1="87.027"
          x2="-73.098"
          y2="68.239"
        >
          <stop offset="0%" stopColor="hsl(210,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(227,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg14"
          gradientUnits="userSpaceOnUse"
          x1="-73.098"
          y1="68.239"
          x2="-90.204"
          y2="43.164"
        >
          <stop offset="0%" stopColor="hsl(227,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(244,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg15"
          gradientUnits="userSpaceOnUse"
          x1="-90.204"
          y1="43.164"
          x2="-98.999"
          y2="14.112"
        >
          <stop offset="0%" stopColor="hsl(244,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(262,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg16"
          gradientUnits="userSpaceOnUse"
          x1="-98.999"
          y1="14.112"
          x2="-98.672"
          y2="-16.240"
        >
          <stop offset="0%" stopColor="hsl(262,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(279,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg17"
          gradientUnits="userSpaceOnUse"
          x1="-98.672"
          y1="-16.240"
          x2="-89.254"
          y2="-45.097"
        >
          <stop offset="0%" stopColor="hsl(279,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(297,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg18"
          gradientUnits="userSpaceOnUse"
          x1="-89.254"
          y1="-45.097"
          x2="-71.612"
          y2="-69.798"
        >
          <stop offset="0%" stopColor="hsl(297,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(314,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg19"
          gradientUnits="userSpaceOnUse"
          x1="-71.612"
          y1="-69.798"
          x2="-47.372"
          y2="-88.068"
        >
          <stop offset="0%" stopColor="hsl(314,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(332,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg20"
          gradientUnits="userSpaceOnUse"
          x1="-47.372"
          y1="-88.068"
          x2="-18.767"
          y2="-98.223"
        >
          <stop offset="0%" stopColor="hsl(332,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(349,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg21"
          gradientUnits="userSpaceOnUse"
          x1="-18.767"
          y1="-98.223"
          x2="11.567"
          y2="-99.329"
        >
          <stop offset="0%" stopColor="hsl(349,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(367,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg22"
          gradientUnits="userSpaceOnUse"
          x1="11.567"
          y1="-99.329"
          x2="40.835"
          y2="-91.282"
        >
          <stop offset="0%" stopColor="hsl(367,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(384,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg23"
          gradientUnits="userSpaceOnUse"
          x1="40.835"
          y1="-91.282"
          x2="66.341"
          y2="-74.825"
        >
          <stop offset="0%" stopColor="hsl(384,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(402,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg24"
          gradientUnits="userSpaceOnUse"
          x1="66.341"
          y1="-74.825"
          x2="85.734"
          y2="-51.474"
        >
          <stop offset="0%" stopColor="hsl(402,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(419,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg25"
          gradientUnits="userSpaceOnUse"
          x1="85.734"
          y1="-51.474"
          x2="97.228"
          y2="-23.380"
        >
          <stop offset="0%" stopColor="hsl(419,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(436,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg26"
          gradientUnits="userSpaceOnUse"
          x1="97.228"
          y1="-23.380"
          x2="99.764"
          y2="6.868"
        >
          <stop offset="0%" stopColor="hsl(436,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(454,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg27"
          gradientUnits="userSpaceOnUse"
          x1="99.764"
          y1="6.868"
          x2="93.107"
          y2="36.483"
        >
          <stop offset="0%" stopColor="hsl(454,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(471,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg28"
          gradientUnits="userSpaceOnUse"
          x1="93.107"
          y1="36.483"
          x2="77.872"
          y2="62.737"
        >
          <stop offset="0%" stopColor="hsl(471,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(489,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg29"
          gradientUnits="userSpaceOnUse"
          x1="77.872"
          y1="62.737"
          x2="55.462"
          y2="83.210"
        >
          <stop offset="0%" stopColor="hsl(489,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(506,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg30"
          gradientUnits="userSpaceOnUse"
          x1="55.462"
          y1="83.210"
          x2="27.942"
          y2="96.017"
        >
          <stop offset="0%" stopColor="hsl(506,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(524,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg31"
          gradientUnits="userSpaceOnUse"
          x1="27.942"
          y1="96.017"
          x2="-2.153"
          y2="99.977"
        >
          <stop offset="0%" stopColor="hsl(524,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(541,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg32"
          gradientUnits="userSpaceOnUse"
          x1="-2.153"
          y1="99.977"
          x2="-32.050"
          y2="94.725"
        >
          <stop offset="0%" stopColor="hsl(541,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(559,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg33"
          gradientUnits="userSpaceOnUse"
          x1="-32.050"
          y1="94.725"
          x2="-58.993"
          y2="80.745"
        >
          <stop offset="0%" stopColor="hsl(559,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(576,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg34"
          gradientUnits="userSpaceOnUse"
          x1="-58.993"
          y1="80.745"
          x2="-80.501"
          y2="59.326"
        >
          <stop offset="0%" stopColor="hsl(576,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(594,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg35"
          gradientUnits="userSpaceOnUse"
          x1="-80.501"
          y1="59.326"
          x2="-94.592"
          y2="32.441"
        >
          <stop offset="0%" stopColor="hsl(594,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(611,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg36"
          gradientUnits="userSpaceOnUse"
          x1="-94.592"
          y1="32.441"
          x2="-99.967"
          y2="2.566"
        >
          <stop offset="0%" stopColor="hsl(611,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(629,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg37"
          gradientUnits="userSpaceOnUse"
          x1="-99.967"
          y1="2.566"
          x2="-96.132"
          y2="-27.545"
        >
          <stop offset="0%" stopColor="hsl(629,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(646,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg38"
          gradientUnits="userSpaceOnUse"
          x1="-96.132"
          y1="-27.545"
          x2="-83.439"
          y2="-55.118"
        >
          <stop offset="0%" stopColor="hsl(646,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(663,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg39"
          gradientUnits="userSpaceOnUse"
          x1="-83.439"
          y1="-55.118"
          x2="-63.058"
          y2="-77.612"
        >
          <stop offset="0%" stopColor="hsl(663,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(681,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg40"
          gradientUnits="userSpaceOnUse"
          x1="-63.058"
          y1="-77.612"
          x2="-36.867"
          y2="-92.956"
        >
          <stop offset="0%" stopColor="hsl(681,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(698,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg41"
          gradientUnits="userSpaceOnUse"
          x1="-36.867"
          y1="-92.956"
          x2="-7.280"
          y2="-99.735"
        >
          <stop offset="0%" stopColor="hsl(698,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(716,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg42"
          gradientUnits="userSpaceOnUse"
          x1="-7.280"
          y1="-99.735"
          x2="22.979"
          y2="-97.324"
        >
          <stop offset="0%" stopColor="hsl(716,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(733,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg43"
          gradientUnits="userSpaceOnUse"
          x1="22.979"
          y1="-97.324"
          x2="51.120"
          y2="-85.946"
        >
          <stop offset="0%" stopColor="hsl(733,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(751,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg44"
          gradientUnits="userSpaceOnUse"
          x1="51.120"
          y1="-85.946"
          x2="74.551"
          y2="-66.650"
        >
          <stop offset="0%" stopColor="hsl(751,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(768,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg45"
          gradientUnits="userSpaceOnUse"
          x1="74.551"
          y1="-66.650"
          x2="91.113"
          y2="-41.212"
        >
          <stop offset="0%" stopColor="hsl(768,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(786,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg46"
          gradientUnits="userSpaceOnUse"
          x1="91.113"
          y1="-41.212"
          x2="99.280"
          y2="-11.977"
        >
          <stop offset="0%" stopColor="hsl(786,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(803,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg47"
          gradientUnits="userSpaceOnUse"
          x1="99.280"
          y1="-11.977"
          x2="98.300"
          y2="18.361"
        >
          <stop offset="0%" stopColor="hsl(803,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(821,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg48"
          gradientUnits="userSpaceOnUse"
          x1="98.300"
          y1="18.361"
          x2="88.262"
          y2="47.008"
        >
          <stop offset="0%" stopColor="hsl(821,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(838,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg49"
          gradientUnits="userSpaceOnUse"
          x1="88.262"
          y1="47.008"
          x2="70.093"
          y2="71.323"
        >
          <stop offset="0%" stopColor="hsl(838,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(855,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg50"
          gradientUnits="userSpaceOnUse"
          x1="70.093"
          y1="71.323"
          x2="45.465"
          y2="89.067"
        >
          <stop offset="0%" stopColor="hsl(855,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(873,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg51"
          gradientUnits="userSpaceOnUse"
          x1="45.465"
          y1="89.067"
          x2="16.648"
          y2="98.605"
        >
          <stop offset="0%" stopColor="hsl(873,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(890,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg52"
          gradientUnits="userSpaceOnUse"
          x1="16.648"
          y1="98.605"
          x2="-13.703"
          y2="99.057"
        >
          <stop offset="0%" stopColor="hsl(890,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(908,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg53"
          gradientUnits="userSpaceOnUse"
          x1="-13.703"
          y1="99.057"
          x2="-42.791"
          y2="90.382"
        >
          <stop offset="0%" stopColor="hsl(908,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(925,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg54"
          gradientUnits="userSpaceOnUse"
          x1="-42.791"
          y1="90.382"
          x2="-67.937"
          y2="73.380"
        >
          <stop offset="0%" stopColor="hsl(925,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(943,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg55"
          gradientUnits="userSpaceOnUse"
          x1="-67.937"
          y1="73.380"
          x2="-86.823"
          y2="49.616"
        >
          <stop offset="0%" stopColor="hsl(943,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(960,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg56"
          gradientUnits="userSpaceOnUse"
          x1="-86.823"
          y1="49.616"
          x2="-97.709"
          y2="21.281"
        >
          <stop offset="0%" stopColor="hsl(960,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(978,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg57"
          gradientUnits="userSpaceOnUse"
          x1="-97.709"
          y1="21.281"
          x2="-99.593"
          y2="-9.014"
        >
          <stop offset="0%" stopColor="hsl(978,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(995,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg58"
          gradientUnits="userSpaceOnUse"
          x1="-99.593"
          y1="-9.014"
          x2="-92.300"
          y2="-38.480"
        >
          <stop offset="0%" stopColor="hsl(995,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(1013,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg59"
          gradientUnits="userSpaceOnUse"
          x1="-92.300"
          y1="-38.480"
          x2="-76.503"
          y2="-64.399"
        >
          <stop offset="0%" stopColor="hsl(1013,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(1030,100%,50%)"></stop>
        </linearGradient>
        <linearGradient
          id="wheelseg60"
          gradientUnits="userSpaceOnUse"
          x1="-76.503"
          y1="-64.399"
          x2="-53.657"
          y2="-84.385"
        >
          <stop offset="0%" stopColor="hsl(1030,100%,50%)"></stop>
          <stop offset="100%" stopColor="hsl(1048,100%,50%)"></stop>
        </linearGradient>
      </defs>
      <g fill="none" strokeWidth="8" transform="translate(100,100)">
        <path
          d="M 0.000,-100.000 A 100,100 0 0,1 30.003,-95.393"
          stroke="url(#wheelseg1)"
        ></path>
        <path
          d="M 30.003,-95.393 A 100,100 0 0,1 57.241,-81.997"
          stroke="url(#wheelseg2)"
        ></path>
        <path
          d="M 57.241,-81.997 A 100,100 0 0,1 79.205,-61.046"
          stroke="url(#wheelseg3)"
        ></path>
        <path
          d="M 79.205,-61.046 A 100,100 0 0,1 93.871,-34.470"
          stroke="url(#wheelseg4)"
        ></path>
        <path
          d="M 93.871,-34.470 A 100,100 0 0,1 99.889,-4.718"
          stroke="url(#wheelseg5)"
        ></path>
        <path
          d="M 99.889,-4.718 A 100,100 0 0,1 96.702,25.469"
          stroke="url(#wheelseg6)"
        ></path>
        <path
          d="M 96.702,25.469 A 100,100 0 0,1 84.606,53.308"
          stroke="url(#wheelseg7)"
        ></path>
        <path
          d="M 84.606,53.308 A 100,100 0 0,1 64.715,76.237"
          stroke="url(#wheelseg8)"
        ></path>
        <path
          d="M 64.715,76.237 A 100,100 0 0,1 38.860,92.141"
          stroke="url(#wheelseg9)"
        ></path>
        <path
          d="M 38.860,92.141 A 100,100 0 0,1 9.425,99.555"
          stroke="url(#wheelseg10)"
        ></path>
        <path
          d="M 9.425,99.555 A 100,100 0 0,1 -20.878,97.796"
          stroke="url(#wheelseg11)"
        ></path>
        <path
          d="M -20.878,97.796 A 100,100 0 0,1 -49.257,87.027"
          stroke="url(#wheelseg12)"
        ></path>
        <path
          d="M -49.257,87.027 A 100,100 0 0,1 -73.098,68.239"
          stroke="url(#wheelseg13)"
        ></path>
        <path
          d="M -73.098,68.239 A 100,100 0 0,1 -90.204,43.164"
          stroke="url(#wheelseg14)"
        ></path>
        <path
          d="M -90.204,43.164 A 100,100 0 0,1 -98.999,14.112"
          stroke="url(#wheelseg15)"
        ></path>
        <path
          d="M -98.999,14.112 A 100,100 0 0,1 -98.672,-16.240"
          stroke="url(#wheelseg16)"
        ></path>
        <path
          d="M -98.672,-16.240 A 100,100 0 0,1 -89.254,-45.097"
          stroke="url(#wheelseg17)"
        ></path>
        <path
          d="M -89.254,-45.097 A 100,100 0 0,1 -71.612,-69.798"
          stroke="url(#wheelseg18)"
        ></path>
        <path
          d="M -71.612,-69.798 A 100,100 0 0,1 -47.372,-88.068"
          stroke="url(#wheelseg19)"
        ></path>
        <path
          d="M -47.372,-88.068 A 100,100 0 0,1 -18.767,-98.223"
          stroke="url(#wheelseg20)"
        ></path>
        <path
          d="M -18.767,-98.223 A 100,100 0 0,1 11.567,-99.329"
          stroke="url(#wheelseg21)"
        ></path>
        <path
          d="M 11.567,-99.329 A 100,100 0 0,1 40.835,-91.282"
          stroke="url(#wheelseg22)"
        ></path>
        <path
          d="M 40.835,-91.282 A 100,100 0 0,1 66.341,-74.825"
          stroke="url(#wheelseg23)"
        ></path>
        <path
          d="M 66.341,-74.825 A 100,100 0 0,1 85.734,-51.474"
          stroke="url(#wheelseg24)"
        ></path>
        <path
          d="M 85.734,-51.474 A 100,100 0 0,1 97.228,-23.380"
          stroke="url(#wheelseg25)"
        ></path>
        <path
          d="M 97.228,-23.380 A 100,100 0 0,1 99.764,6.868"
          stroke="url(#wheelseg26)"
        ></path>
        <path
          d="M 99.764,6.868 A 100,100 0 0,1 93.107,36.483"
          stroke="url(#wheelseg27)"
        ></path>
        <path
          d="M 93.107,36.483 A 100,100 0 0,1 77.872,62.737"
          stroke="url(#wheelseg28)"
        ></path>
        <path
          d="M 77.872,62.737 A 100,100 0 0,1 55.462,83.210"
          stroke="url(#wheelseg29)"
        ></path>
        <path
          d="M 55.462,83.210 A 100,100 0 0,1 27.942,96.017"
          stroke="url(#wheelseg30)"
        ></path>
        <path
          d="M 27.942,96.017 A 100,100 0 0,1 -2.153,99.977"
          stroke="url(#wheelseg31)"
        ></path>
        <path
          d="M -2.153,99.977 A 100,100 0 0,1 -32.050,94.725"
          stroke="url(#wheelseg32)"
        ></path>
        <path
          d="M -32.050,94.725 A 100,100 0 0,1 -58.993,80.745"
          stroke="url(#wheelseg33)"
        ></path>
        <path
          d="M -58.993,80.745 A 100,100 0 0,1 -80.501,59.326"
          stroke="url(#wheelseg34)"
        ></path>
        <path
          d="M -80.501,59.326 A 100,100 0 0,1 -94.592,32.441"
          stroke="url(#wheelseg35)"
        ></path>
        <path
          d="M -94.592,32.441 A 100,100 0 0,1 -99.967,2.566"
          stroke="url(#wheelseg36)"
        ></path>
        <path
          d="M -99.967,2.566 A 100,100 0 0,1 -96.132,-27.545"
          stroke="url(#wheelseg37)"
        ></path>
        <path
          d="M -96.132,-27.545 A 100,100 0 0,1 -83.439,-55.118"
          stroke="url(#wheelseg38)"
        ></path>
        <path
          d="M -83.439,-55.118 A 100,100 0 0,1 -63.058,-77.612"
          stroke="url(#wheelseg39)"
        ></path>
        <path
          d="M -63.058,-77.612 A 100,100 0 0,1 -36.867,-92.956"
          stroke="url(#wheelseg40)"
        ></path>
        <path
          d="M -36.867,-92.956 A 100,100 0 0,1 -7.280,-99.735"
          stroke="url(#wheelseg41)"
        ></path>
        <path
          d="M -7.280,-99.735 A 100,100 0 0,1 22.979,-97.324"
          stroke="url(#wheelseg42)"
        ></path>
        <path
          d="M 22.979,-97.324 A 100,100 0 0,1 51.120,-85.946"
          stroke="url(#wheelseg43)"
        ></path>
        <path
          d="M 51.120,-85.946 A 100,100 0 0,1 74.551,-66.650"
          stroke="url(#wheelseg44)"
        ></path>
        <path
          d="M 74.551,-66.650 A 100,100 0 0,1 91.113,-41.212"
          stroke="url(#wheelseg45)"
        ></path>
        <path
          d="M 91.113,-41.212 A 100,100 0 0,1 99.280,-11.977"
          stroke="url(#wheelseg46)"
        ></path>
        <path
          d="M 99.280,-11.977 A 100,100 0 0,1 98.300,18.361"
          stroke="url(#wheelseg47)"
        ></path>
        <path
          d="M 98.300,18.361 A 100,100 0 0,1 88.262,47.008"
          stroke="url(#wheelseg48)"
        ></path>
        <path
          d="M 88.262,47.008 A 100,100 0 0,1 70.093,71.323"
          stroke="url(#wheelseg49)"
        ></path>
        <path
          d="M 70.093,71.323 A 100,100 0 0,1 45.465,89.067"
          stroke="url(#wheelseg50)"
        ></path>
        <path
          d="M 45.465,89.067 A 100,100 0 0,1 16.648,98.605"
          stroke="url(#wheelseg51)"
        ></path>
        <path
          d="M 16.648,98.605 A 100,100 0 0,1 -13.703,99.057"
          stroke="url(#wheelseg52)"
        ></path>
        <path
          d="M -13.703,99.057 A 100,100 0 0,1 -42.791,90.382"
          stroke="url(#wheelseg53)"
        ></path>
        <path
          d="M -42.791,90.382 A 100,100 0 0,1 -67.937,73.380"
          stroke="url(#wheelseg54)"
        ></path>
        <path
          d="M -67.937,73.380 A 100,100 0 0,1 -86.823,49.616"
          stroke="url(#wheelseg55)"
        ></path>
        <path
          d="M -86.823,49.616 A 100,100 0 0,1 -97.709,21.281"
          stroke="url(#wheelseg56)"
        ></path>
        <path
          d="M -97.709,21.281 A 100,100 0 0,1 -99.593,-9.014"
          stroke="url(#wheelseg57)"
        ></path>
        <path
          d="M -99.593,-9.014 A 100,100 0 0,1 -92.300,-38.480"
          stroke="url(#wheelseg58)"
        ></path>
        <path
          d="M -92.300,-38.480 A 100,100 0 0,1 -76.503,-64.399"
          stroke="url(#wheelseg59)"
        ></path>
        <path
          d="M -76.503,-64.399 A 100,100 0 0,1 -53.657,-84.385"
          stroke="url(#wheelseg60)"
        ></path>
      </g>
    </svg>
  );

export default React.memo(Gradient);
