import React from "react";
import { useRouter } from "next/router";

import ConnectButton from "../ConnectButton";
import Nav from "../Nav";
import RecastButton from "../IconButton/RecastButton";
import styles from "./Gilding.module.css";

interface Props {
  className: string;
}

const CornerGilding: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <div className={className}>
      <div className={styles.upperLeft}>
        <svg
          viewBox="0 0 435 234"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.gildPiece}
        >
          <g className={styles.gildComposite}>
            <path
              vectorEffect="non-scaling-stroke"
              d="M8.87311 55.559C8.87311 29.3773 30.0975 8.1529 56.2792 8.1529C82.4609 8.1529 103.685 29.3773 103.685 55.559C103.685 81.7407 82.4609 102.965 56.2792 102.965C30.0975 102.965 8.87311 81.7407 8.87311 55.559Z"
            />
            <path
              vectorEffect="non-scaling-stroke"
              d="M419.624 44.4307H364.374H360.624M419.624 44.4307C419.624 48.3139 422.772 51.4619 426.655 51.4619C430.538 51.4619 433.686 48.3139 433.686 44.4307C433.686 40.5474 430.538 37.3994 426.655 37.3994C422.772 37.3994 419.624 40.5474 419.624 44.4307ZM360.624 44.4307L345.874 29.6807H325.124M360.624 44.4307L345.874 59.1807H261.624L246.874 44.4307M246.874 44.4307L261.624 29.6807H325.124M246.874 44.4307H238.624M238.624 44.4307L223.874 29.6807H159.624H139.624L124.874 44.4307L139.624 59.1807H223.874L238.624 44.4307ZM325.124 29.6807L309.124 13.6807H207.033M79.6235 13.6807H150.839L159.624 22.4653H198.249L207.033 13.6807M54.6235 7.56299V1.84033H218.874L207.033 13.6807M54.6235 152.313V230.813L43.6235 219.813V191.036M54.6235 152.313L43.6235 163.313V191.036M54.6235 152.313V141.563M54.6235 103.063V141.563M54.6235 141.563L30.1509 117.09M22.2134 88.688V108.938V109.153L30.1509 117.09M15.8872 30.4028H1.62354V1.87549H30.1509V16.1392M21.811 22.4653H9.56104V9.81299H22.2134V21.8755M30.1509 117.09V177.563L43.6235 191.036M125.624 44.7153H102.874M1.62354 149.5L9.56104 141.563V101M1.62354 149.5V108.938L9.56104 101M1.62354 149.5V191.036M9.56104 101V64.563"
            />
          </g>
        </svg>
        <Nav />
        <div className={styles.zodiacIcon}>
          <svg
            viewBox="0 0 79 79"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g style={{ mixBlendMode: "color-dodge" }}>
              <path
                d="M39.5759 72.875C58.1323 72.875 73.1751 57.8447 73.1751 39.3037C73.1751 20.7628 58.1323 5.73252 39.5759 5.73252C21.0194 5.73252 5.97644 20.7628 5.97644 39.3037C5.97644 57.8447 21.0194 72.875 39.5759 72.875Z"
                className={styles.iconStroke}
              />
              <path
                d="M40.9602 21.9395C40.9602 21.9395 39.6219 21.5717 39.6219 20.2265C39.6219 21.5717 38.2836 21.9395 38.2836 21.9395H40.9602Z"
                className={styles.iconFill}
              />
              <path
                d="M60.5739 28.3125C60.5739 28.3125 60.0386 26.4966 61.5963 25.5285C60.0359 26.4979 58.644 25.2129 58.644 25.2129L60.5739 28.3125Z"
                className={styles.iconFill}
              />
              <path
                d="M50.4965 60.1131C50.4965 60.1131 52.314 59.5783 53.2842 61.1348C52.314 59.5756 53.6001 58.1863 53.6001 58.1863L50.4965 60.1131Z"
                className={styles.iconFill}
              />
              <path
                d="M18.6692 50.0441C18.6692 50.0441 19.2046 51.86 17.6468 52.8294C19.2072 51.86 20.5911 53.145 20.5911 53.145L18.6692 50.0441Z"
                className={styles.iconFill}
              />
              <path
                d="M69.3947 41.4878C69.3947 41.4878 70.0305 39.1785 72.3552 39.1785C70.0305 39.1785 69.3947 36.8692 69.3947 36.8692V41.4878Z"
                className={styles.iconFill}
              />
              <path
                d="M9.84833 36.8692C9.84833 36.8692 9.2127 39.1785 6.88803 39.1785C9.2127 39.1785 9.84833 41.4878 9.84833 41.4878V36.8692Z"
                className={styles.iconFill}
              />
              <path
                d="M18.6692 28.3125C18.6692 28.3125 19.2046 26.4966 17.6468 25.5285C19.2072 26.4979 20.5911 25.2129 20.5911 25.2129L18.6692 28.3125Z"
                className={styles.iconFill}
              />
              <path
                d="M28.7462 60.1131C28.7462 60.1131 26.9288 59.5783 25.9585 61.1348C26.9288 59.5756 25.6427 58.1863 25.6427 58.1863L28.7462 60.1131Z"
                className={styles.iconFill}
              />
              <path
                d="M60.5739 50.0441C60.5739 50.0441 60.0386 51.86 61.5963 52.8294C60.0359 51.86 58.644 53.145 58.644 53.145L60.5739 50.0441Z"
                className={styles.iconFill}
              />
              <path
                d="M39.6218 62.6836C45.5261 62.6785 51.2116 60.4498 55.5442 56.4421C59.8768 52.4343 62.5382 46.942 62.9976 41.0605C63.4571 35.179 61.6806 29.3407 58.0228 24.7098C54.3649 20.079 49.0944 16.996 43.2624 16.0757C37.4303 15.1555 31.4654 16.4656 26.5573 19.7448C21.6492 23.024 18.1586 28.0314 16.7816 33.768C15.4047 39.5047 16.2427 45.5492 19.1284 50.696C22.0141 55.8427 26.7355 59.7135 32.3509 61.5363C34.6992 62.2977 37.1529 62.6848 39.6218 62.6836Z"
                className={styles.iconStroke}
                strokeMiterlimit="10"
              />
              <path
                d="M39.6391 29.3663L40.3846 20.2093L40.4087 29.3957L41.8714 20.3257L41.1755 29.4867L43.3449 20.5597L41.9317 29.6377L44.797 20.9073L42.6744 29.8464L46.2156 21.3686L43.3971 30.1138L47.594 21.9383L44.097 30.436L48.9229 22.6149L44.7702 30.8118L50.1957 23.3944L45.4112 31.241L51.4028 24.2703L46.0175 31.7171L52.5364 25.2385L46.5836 32.2412L53.5923 26.2922L47.1069 32.8069L54.5612 27.4261L47.5847 33.4113L55.4378 28.6322L48.0129 34.0518L56.2167 29.9039L48.3903 34.7244L56.8938 31.2317L48.7128 35.425L57.4653 32.609L48.9805 36.1471L57.9271 34.0264L49.1893 36.8893L58.275 35.4759L49.3392 37.6448L58.5079 36.9481L49.4302 38.4097L58.6256 38.4351L49.4609 39.1799L58.6256 39.926L49.4302 39.9501L58.5079 41.4116L49.3392 40.715L58.275 42.8838L49.1893 41.4705L57.9271 44.3333L48.9805 42.2126L57.4653 45.7507L48.7128 42.936L56.8938 47.128L48.3903 43.6353L56.2167 48.4572L48.0129 44.308L55.4378 49.7275L47.5847 44.9485L54.5612 50.9337L47.1069 45.5542L53.5923 52.0676L46.5836 46.1198L52.5364 53.1213L46.0175 46.6426L51.4028 54.0894L45.4112 47.12L50.1957 54.9653L44.7702 47.5479L48.9229 55.7448L44.097 47.9237L47.594 56.4215L43.3971 48.2473L46.2156 56.9924L42.6744 48.5134L44.797 57.4524L41.9317 48.7233L43.3449 57.8001L41.1755 48.8731L41.8714 58.0341L40.4087 48.964L40.3846 58.1504L39.6391 48.9934L38.8924 58.1504L38.8683 48.964L37.4055 58.0341L38.1015 48.8731L35.9321 57.8001L37.3453 48.7233L34.4813 57.4524L36.6039 48.5134L33.0614 56.9924L35.8799 48.2473L31.683 56.4215L35.18 47.9237L30.354 55.7448L34.5068 47.5479L29.0826 54.9653L33.8658 47.12L27.8741 54.0894L33.2595 46.6426L26.7406 53.1213L32.6934 46.1198L25.686 52.0676L32.1701 45.5542L24.7171 50.9337L31.6924 44.9485L23.8392 49.7275L31.2641 44.308L23.0603 48.4572L30.8867 43.6353L22.3831 47.128L30.5642 42.936L21.8117 45.7507L30.2965 42.2126L21.35 44.3333L30.0877 41.4705L21.002 42.8838L29.9379 40.715L20.7691 41.4116L29.8468 39.9501L20.6514 39.926L29.816 39.1799L20.6514 38.4351L29.8468 38.4097L20.7691 36.9481L29.9379 37.6448L21.002 35.4759L30.0877 36.8893L21.35 34.0264L30.2965 36.1471L21.8117 32.609L30.5642 35.425L22.3831 31.2317L30.8867 34.7244L23.0603 29.9039L31.2641 34.0518L23.8392 28.6322L31.6924 33.4113L24.7171 27.4261L32.1701 32.8069L25.686 26.2922L32.6934 32.2412L26.7406 25.2385L33.2595 31.7171L27.8741 24.2703L33.8658 31.241L29.0826 23.3944L34.5068 30.8118L30.354 22.6149L35.18 30.436L31.683 21.9383L35.8799 30.1138L33.0614 21.3686L36.6039 29.8464L34.4813 20.9073L37.3453 29.6377L35.9321 20.5597L38.1015 29.4867L37.4055 20.3257L38.8683 29.3957L38.8924 20.2093L39.6391 29.3663Z"
                className={styles.iconStroke}
              />
              <path
                d="M69.1205 39.1689C64.143 38.8841 63.7536 31.3465 63.7536 31.3465L60.4989 32.4015C61.9402 38.027 54.771 39.058 53.8341 39.1676H53.7324H53.7806H53.7324H53.8341C54.771 39.2773 61.9402 40.3082 60.4989 45.9337L63.7496 46.9888C63.7496 46.9888 64.139 39.4511 69.1159 39.1662H69.0574L69.1205 39.1689Z"
                className={styles.iconFill}
              />
              <path
                d="M10.1203 39.1785C10.1278 39.179 10.1353 39.1794 10.1428 39.1798C15.0986 38.8737 15.4855 31.3587 15.4855 31.3587L18.7363 32.4137C17.2962 38.0392 24.4655 39.0702 25.4023 39.1798C24.4655 39.2895 17.2962 40.3205 18.7363 45.946L15.4855 47.001C15.4855 47.001 15.0986 39.486 10.1428 39.1798C10.1353 39.1803 10.1278 39.1807 10.1203 39.1812V39.1785Z"
                className={styles.iconFill}
              />
              <path
                d="M22.9745 55.79C28.0601 50.7087 32.4846 53.1356 32.4846 53.1356C29.3503 50.004 37.1017 41.7122 39.1345 39.6436C37.0641 41.6748 28.7652 49.4197 25.6309 46.2881C25.6309 46.2881 28.0574 50.7127 22.9745 55.79Z"
                className={styles.iconFill}
              />
              <path
                d="M56.2313 55.7822C51.1485 50.7049 53.5747 46.2802 53.5747 46.2802C50.4403 49.4119 42.1417 41.667 40.0714 39.6358C42.1043 41.699 49.8558 49.9909 46.7214 53.128C46.7214 53.128 51.1485 50.7036 56.2313 55.7822Z"
                className={styles.iconFill}
              />
              <path
                d="M40.0822 38.6973C42.1512 36.6661 50.3927 28.8636 53.5269 32.0007C53.5269 32.0007 51.1004 27.5759 56.1832 22.4973C51.1004 27.5759 46.6718 25.1516 46.6718 25.1516C49.8074 28.2833 42.1151 36.63 40.0822 38.6973Z"
                className={styles.iconFill}
              />
              <path
                d="M39.1334 38.7012C37.1005 36.6326 29.3493 28.3408 32.4835 25.2091C32.4835 25.2091 28.055 27.6333 22.9734 22.5547C28.0563 27.6333 25.6299 32.0567 25.6299 32.0567C28.7641 28.925 37.0631 36.6701 39.1334 38.7012Z"
                className={styles.iconFill}
              />
              <path
                d="M54.3386 59.6412C54.2935 59.6601 54.2382 59.6835 54.1741 59.7115C53.9818 59.7956 53.709 59.9209 53.3858 60.0864C52.7397 60.4171 51.8901 60.9092 51.0793 61.5541C49.6401 62.6987 48.2965 64.348 48.4793 66.4443C47.3951 64.6385 45.3384 64.0919 43.5011 64.0104C42.4662 63.9645 41.4897 64.0651 40.7726 64.1769C40.4139 64.2328 40.1195 64.2916 39.9145 64.3364C39.8524 64.35 39.6897 64.3624 39.625 64.373C39.6164 64.3743 39.6089 64.3676 39.6089 64.3588V61.2206C41.0267 61.1083 42.1636 60.5901 42.8651 59.8507C43.5823 59.0946 43.9732 58.1168 44.1728 57.1314C44.4601 55.7128 44.3543 54.2605 44.2383 53.3855C44.6584 54.1617 45.4266 55.3995 46.4931 56.3793C47.2337 57.0597 48.1249 57.6218 49.1497 57.8127C50.1521 57.9994 51.2703 57.8288 52.4837 57.0874L54.3386 59.6412Z"
                className={styles.iconStroke}
              />
              <path
                d="M28.1603 16.7936C29.6 15.6485 30.9442 13.9981 30.7603 11.9002C31.8441 13.7085 33.902 14.2557 35.7403 14.3373C36.7752 14.3832 37.7517 14.2826 38.4688 14.1709C38.8275 14.1149 39.1219 14.0561 39.3269 14.0112C39.3951 13.9962 39.4535 13.9828 39.5011 13.9716V17.1258C38.0832 17.2384 37.0778 17.7568 36.3761 18.4964C35.6588 19.2525 35.2678 20.2306 35.0681 21.2159C34.7808 22.6343 34.8864 24.0861 35.0027 24.9609C34.5824 24.1845 33.8144 22.9472 32.7482 21.9679C32.0074 21.2875 31.1161 20.7256 30.0911 20.5348C29.0885 20.3482 27.9701 20.5189 26.7564 21.2603L24.9015 18.7065C24.9466 18.6876 25.0018 18.6642 25.0658 18.6362C25.2581 18.5521 25.5309 18.4267 25.8541 18.2613C26.5001 17.9306 27.3496 17.4385 28.1603 16.7936Z"
                className={styles.iconStroke}
              />
              <path
                d="M25.0462 59.7022C24.9822 59.6742 24.927 59.6507 24.8819 59.6319L26.7366 57.0807C27.9497 57.8241 29.068 57.9962 30.0707 57.8104C31.0958 57.6205 31.9876 57.059 32.7288 56.3788C33.7956 55.3999 34.5645 54.1627 34.9853 53.3859C34.8685 54.2604 34.7618 55.7112 35.0478 57.1288C35.2467 58.1141 35.6369 59.0922 36.3535 59.8485C37.0546 60.5884 38.1992 61.1072 39.6172 61.2205V64.3398C39.6172 64.3604 39.5995 64.3763 39.579 64.3736C39.5033 64.3637 39.3597 64.3524 39.3037 64.3401C39.0989 64.2949 38.8047 64.2357 38.4462 64.1794C37.7298 64.0667 36.7538 63.9649 35.7193 64.0095C33.8807 64.0889 31.8216 64.6343 30.7359 66.4443C30.9221 64.344 29.5789 62.692 28.1396 61.5459C27.3293 60.9006 26.4801 60.4082 25.8343 60.0773C25.5112 59.9118 25.2385 59.7864 25.0462 59.7022Z"
                className={styles.iconStroke}
              />
              <path
                d="M46.5117 21.9649C45.4439 22.9447 44.6746 24.1834 44.2541 24.96C44.3713 24.0857 44.4784 22.6336 44.1921 21.2149C43.9933 20.2296 43.6031 19.2516 42.8865 18.4951C42.1856 17.7553 41.1807 17.2364 39.7631 17.1232V13.9678C39.8106 13.9791 39.8688 13.9926 39.9369 14.0076C40.1418 14.0528 40.4359 14.1119 40.7944 14.1683C41.5109 14.281 42.4867 14.3828 43.5213 14.3381C45.3606 14.2588 47.4205 13.7131 48.5059 11.9018C48.3208 14.0008 49.6632 15.652 51.1017 16.7977C51.9118 17.4431 52.7609 17.9354 53.4065 18.2663C53.7296 18.4319 54.0022 18.5573 54.1944 18.6414C54.2584 18.6695 54.3136 18.6929 54.3587 18.7117L52.504 21.2629C51.2909 20.5195 50.1726 20.3474 49.1699 20.5332C48.1447 20.7231 47.253 21.2847 46.5117 21.9649Z"
                className={styles.iconStroke}
              />
              <path
                d="M39.622 69.0727C44.3432 69.0714 48.9972 67.954 53.2035 65.8125C57.41 63.6702 61.0495 60.5642 63.8249 56.7481C66.6004 52.9319 68.4327 48.5139 69.1724 43.8549C69.912 39.1959 69.5379 34.4281 68.081 29.9412C66.624 25.4519 64.1241 21.3712 60.7852 18.0331C57.4464 14.6952 53.3638 12.1948 48.8716 10.7367C44.3794 9.27871 39.6055 8.9046 34.9408 9.64488C30.276 10.3852 25.8531 12.2189 22.0342 14.996C16.9194 18.7048 13.1117 23.9371 11.1572 29.9421C9.20283 35.9472 9.20217 42.4165 11.1554 48.4219C13.1086 54.4274 16.9152 59.6603 22.0293 63.3703C27.1434 67.0803 33.3021 69.0767 39.622 69.0727Z"
                className={styles.iconStroke}
                strokeMiterlimit="10"
              />
              <path
                d="M49.3153 68.9883C49.3153 68.9883 53.0626 67.9944 58.0558 64.5327C58.0558 64.5327 50.0166 55.1043 48.2126 55.9133C46.4085 56.7222 49.3153 68.9883 49.3153 68.9883Z"
                className={styles.iconFill}
              />
              <path
                d="M47.3835 15.3325C39.7552 12.6461 39.6281 6.27447 39.6281 6.27447C39.6281 6.27447 39.5063 12.6461 31.8727 15.3325C31.8727 15.3325 27.9207 16.552 24.8787 18.8974L25.8008 20.1677C25.8008 20.1677 27.3264 18.5912 32.3585 16.8248C32.3585 16.8248 39.6267 13.7626 39.6267 32.915C39.6214 13.76 46.8897 16.8288 46.8897 16.8288C51.9231 18.5979 53.4474 20.1718 53.4474 20.1718L54.3695 18.9014C51.3288 16.552 47.3835 15.3325 47.3835 15.3325Z"
                className={styles.iconFill}
              />
              <path
                d="M39.6215 51.7134C41.3533 51.7134 42.7571 50.3107 42.7571 48.5804C42.7571 46.85 41.3533 45.4473 39.6215 45.4473C37.8898 45.4473 36.4859 46.85 36.4859 48.5804C36.4859 50.3107 37.8898 51.7134 39.6215 51.7134Z"
                className={styles.iconFill}
              />
              <path
                d="M39.6213 70.5056C39.6213 70.5056 43.4944 70.7382 49.3187 69.0118C49.3187 69.0118 44.6426 57.5431 42.6753 57.745C40.708 57.9469 39.6213 70.5056 39.6213 70.5056Z"
                className={styles.iconFill}
              />
              <path
                d="M29.9245 68.9883C29.9245 68.9883 26.1773 67.9944 21.1841 64.5327C21.1841 64.5327 29.2232 55.1043 31.0273 55.9133C32.8313 56.7222 29.9245 68.9883 29.9245 68.9883Z"
                className={styles.iconFill}
              />
              <path
                d="M39.6217 70.5056C39.6217 70.5056 35.7473 70.7382 29.9231 69.0118C29.9231 69.0118 34.6071 57.5431 36.5677 57.745C38.5283 57.9469 39.6217 70.5056 39.6217 70.5056Z"
                className={styles.iconFill}
              />
              <path
                d="M66.221 25.5093C66.1895 25.4445 66.1441 25.3539 66.0849 25.243C65.96 25.0096 65.7728 24.6856 65.5225 24.3224C65.0226 23.5971 64.2675 22.7094 63.2509 22.0748C62.2318 21.4387 60.9503 21.0575 59.407 21.3488C58.2554 21.5661 56.9654 22.1565 55.5349 23.2831C56.6621 21.8545 57.2528 20.5661 57.4703 19.4157C57.7619 17.874 57.3805 16.5934 56.7442 15.575C56.1093 14.5589 55.2212 13.8041 54.4955 13.3043C54.1321 13.0541 53.808 12.8668 53.5745 12.742C53.4634 12.6826 53.3728 12.6374 53.308 12.6061L54.6199 10.0326C57.0815 11.2558 59.1176 12.7328 60.5461 13.9118C61.2702 14.5096 61.8378 15.0304 62.2251 15.4022C62.4188 15.5881 62.5673 15.7368 62.6678 15.8392C62.7181 15.8904 62.7564 15.9301 62.7823 15.9572C62.7917 15.9669 62.7994 15.975 62.8056 15.9815C62.808 15.984 62.8102 15.9863 62.8121 15.9883C62.8155 15.9918 62.8184 15.9949 62.8205 15.9971C62.8216 15.9981 62.8228 15.9995 62.824 16.0006C62.8246 16.0012 62.8255 16.0021 62.8267 16.0032L62.8268 16.0033C65.2497 18.3927 67.2657 21.1609 68.7957 24.1987L66.221 25.5093Z"
                className={styles.iconStroke}
              />
              <path
                d="M10.4461 54.1719L13.0202 52.8625C13.0515 52.9273 13.0968 53.0179 13.1561 53.1287C13.281 53.3622 13.4682 53.686 13.7185 54.0492C14.2184 54.7744 14.9735 55.6619 15.9901 56.2963C17.0092 56.9322 18.2907 57.3132 19.8339 57.0219C20.9855 56.8044 22.2755 56.214 23.706 55.0874C22.5789 56.5159 21.9882 57.8044 21.7706 58.9547C21.4791 60.4964 21.8604 61.777 22.4968 62.7955C23.1317 63.8115 24.0198 64.5663 24.7455 65.0661C25.1089 65.3163 25.433 65.5036 25.6665 65.6284C25.7775 65.6878 25.8682 65.733 25.933 65.7644L24.6211 68.3379C19.827 65.9494 16.659 62.6114 16.4343 62.3747C16.4266 62.3665 16.4223 62.362 16.4216 62.3614C16.4217 62.3615 16.1994 62.1566 15.8266 61.7698C15.4544 61.3835 14.9329 60.8169 14.3344 60.0937C13.1534 58.6669 11.6736 56.6321 10.4461 54.1719Z"
                className={styles.iconStroke}
              />
              <path
                d="M24.6205 10.0242L25.9287 12.6014C25.8638 12.6326 25.7732 12.6779 25.662 12.7373C25.4284 12.862 25.1042 13.049 24.7407 13.2992C24.0147 13.7986 23.1263 14.5531 22.4912 15.5688C21.8546 16.5871 21.4731 17.8676 21.7646 19.4095C21.982 20.5601 22.5729 21.8491 23.7005 23.2783C22.2707 22.1522 20.9812 21.5619 19.8299 21.3446C18.2869 21.0533 17.0052 21.4342 15.9859 22.0701C14.969 22.7044 14.2136 23.5917 13.7134 24.3169C13.4629 24.68 13.2755 25.0038 13.1506 25.2372C13.0912 25.3481 13.0458 25.4386 13.0145 25.5034L10.439 24.1926C12.8299 19.4022 16.1743 16.2319 16.4111 16.0073C16.4192 15.9996 16.4237 15.9954 16.4243 15.9947L16.3364 15.9166L16.4243 15.9947H16.4244C16.4276 15.9911 16.6326 15.7697 17.0167 15.4001C17.4033 15.0283 17.9705 14.5073 18.6945 13.9091C20.1227 12.7293 22.159 11.2507 24.6205 10.0242Z"
                className={styles.iconStroke}
              />
              <path
                d="M53.3145 65.7603C53.3793 65.729 53.47 65.6838 53.581 65.6245C53.8146 65.4998 54.1387 65.3127 54.5022 65.0626C55.228 64.5631 56.1162 63.8087 56.7511 62.7929C57.3876 61.7747 57.769 60.4942 57.4774 58.9523C57.2598 57.8019 56.669 56.5131 55.5416 55.0839C56.9709 56.2098 58.2602 56.7999 59.4113 57.0172C60.9542 57.3085 62.2359 56.9276 63.2553 56.2917C64.2723 55.6574 65.0278 54.7701 65.5282 54.0449C65.7787 53.6818 65.9661 53.358 66.0911 53.1246C66.1507 53.0137 66.1961 52.9232 66.227 52.8584L68.8029 54.1692C66.4117 58.9593 63.0714 62.1247 62.8347 62.3491C62.8265 62.3568 62.822 62.3611 62.8214 62.3618L62.9093 62.4398L62.8214 62.3618C62.8191 62.3643 62.6142 62.586 62.2293 62.9563C61.8428 63.3282 61.2757 63.8492 60.5519 64.4473C59.124 65.6272 57.0879 67.1061 54.6264 68.3325L53.3145 65.7603Z"
                className={styles.iconStroke}
              />
            </g>
          </svg>
        </div>
      </div>
      <div className={styles.lowerLeft}>
        <svg
          viewBox="0 0 443 228"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.gildPiece}
        >
          <g className={styles.gildComposite}>
            <path
              vectorEffect="non-scaling-stroke"
              d="M442.5 215H382M382 215L370.25 226.75L316.5 226.75L304.75 215M382 215H351.5L304.75 215M304.75 215H273L263.817 205.17M304.75 215L294.92 205.17H263.817M212.5 196H255.25L263.817 205.17M212.5 196H189L174.25 181.25L100 181.25L85.25 196H61H41L37 192L27.8125 201.188M212.5 196L193.5 215L53.5 215L39.5 226H3L10.375 218.625M17.75 60.25L17.75 78L10.375 85.375M17.75 60.25L32.25 74.75V100.5L23.625 109.125V116.75M17.75 60.25V38L10.375 30.625M3 0.75L3 23.25L10.375 30.625M27.8125 201.188L14.0625 214.938L10.375 218.625M27.8125 201.188L17.0625 190.438V148.938M23.625 116.75L32.25 125.375L23.625 134M23.625 116.75L15 125.375L23.625 134M23.625 134V142.375L11.0547 154.945L10.375 155.625M10.375 85.375L3 92.75L3 163L10.375 155.625M10.375 85.375L10.375 30.625M10.375 155.625L10.375 218.625"
            />
          </g>
        </svg>
      </div>
      <div className={styles.upperRight}>
        <svg
          viewBox="0 0 438 323"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.gildPiece}
        >
          <g className={styles.gildComposite}>
            <path
              vectorEffect="non-scaling-stroke"
              d="M14.9165 45.5903H72.4165M72.4165 45.5903L87.1665 30.8403H140.917L155.667 45.5903M72.4165 45.5903H105.917M234.917 45.5903L252.667 27.8403H292.917M234.917 45.5903L252.667 63.3403H334.917M234.917 45.5903H155.667M105.917 45.5903L140.167 79.8403H316.417L334.917 63.3403M105.917 45.5903H155.667M334.917 63.3403H389.417L407.167 45.5903L389.417 27.8403H292.917M292.917 27.8403L307.917 14.8403H348.667L361.667 1.84033H386.417H434.417L427.042 8.21533M419.667 217.59V169.84L427.042 162.465M419.667 217.59L405.167 203.09V147.34L413.792 138.715V120.09M419.667 217.59V239.84M434.417 322.59V292.84M434.417 292.84V257.09V254.59L427.042 247.215M434.417 292.84L419.667 278.09V239.84M419.667 239.84L427.042 247.215M409.604 25.6528L423.354 11.9028L427.042 8.21533M409.604 25.6528L420.354 36.4028V77.9028M409.604 25.6528L398.854 36.4028M413.792 120.09L405.167 111.465L413.792 102.84M413.792 120.09L422.417 111.465L413.792 102.84M413.792 102.84V84.4653L426.362 71.895L427.042 71.2153M427.042 162.465L434.417 155.09V63.8403L427.042 71.2153M427.042 162.465V247.215M427.042 71.2153V8.21533"
            />
            <circle
              vectorEffect="non-scaling-stroke"
              r="7.03125"
              transform="matrix(-1 0 0 1 8.44775 46.6528)"
            />
          </g>
        </svg>
        <ConnectButton />
      </div>
      <div className={styles.lowerRight}>
        <svg
          viewBox="0 0 221 234"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.gildPiece}
        >
          <g className={styles.gildComposite}>
            <path
              vectorEffect="non-scaling-stroke"
              d="M212.75 178.345C212.75 204.526 191.526 225.751 165.344 225.751C139.163 225.751 117.938 204.526 117.938 178.345C117.938 152.163 139.163 130.938 165.344 130.938C191.526 130.938 212.75 152.163 212.75 178.345Z"
            />
            <path
              vectorEffect="non-scaling-stroke"
              d="M146.75 221.938H78.375L67.875 211.438H45.625M167 226.34V232.063H2.75L23.375 211.438H45.625M167 130.84V92.3403M167 81.5903V3.09033L178 14.0903V42.8677M167 81.5903L178 70.5903V42.8677M167 81.5903V92.3403M167 92.3403L191.473 116.813M199.41 145.215V124.965V124.75L191.473 116.813M205.736 203.5H220V232.028H191.473V217.764M199.812 211.438H212.062V224.09H199.41V212.028M191.473 116.813V56.3403L178 42.8677M45.625 211.438L67.875 189.188H118.75M212.062 169.34V132.903M220 84.4028L212.062 92.3403V132.903M220 84.4028V124.965L212.062 132.903M220 84.4028V42.8677"
            />
          </g>
        </svg>

        {currentRoute === "/" && <RecastButton />}
      </div>
    </div>
  );
};

export default CornerGilding;
