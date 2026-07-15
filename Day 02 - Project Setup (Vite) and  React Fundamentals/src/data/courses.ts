import type { Course, PopularCourse } from "../types/course";
import blockchainIcon from "../assets/images/courses/blockchain.svg";
import ethereumIcon from "../assets/images/courses/ethereum.svg";
import solidityIcon from "../assets/images/courses/solidity.svg";
import reactIcon from "../assets/images/courses/react.svg";
import smartContractImage from "../assets/images/courses/smart-contract.svg";
import dappImage from "../assets/images/courses/dapp.svg";
import nftImage from "../assets/images/courses/nft.svg";
import defiImage from "../assets/images/courses/defi.svg";

export const courses: Course[] = [
  {
    id: 1,
    title: "Blockchain Foundation",
    description: "Hiểu các khái niệm cơ bản về blockchain",
    completedLessons: 8,
    totalLessons: 12,
    icon: blockchainIcon,
  },
  {
    id: 2,
    title: "Ethereum Architecture",
    description: "Tìm hiểu Ethereum, EVM và giao dịch",
    completedLessons: 6,
    totalLessons: 10,
    icon: ethereumIcon,
  },
  {
    id: 3,
    title: "Solidity Programming",
    description: "Học Solidity để xây dựng smart contract",
    completedLessons: 4,
    totalLessons: 15,
    icon: solidityIcon,
  },
  {
    id: 4,
    title: "Web3 Frontend",
    description: "Kết nối React với smart contract",
    completedLessons: 0,
    totalLessons: 12,
    icon: reactIcon,
  },
];

export const popularCourses: PopularCourse[] = [
  {
    tag: "Solidity",
    title: "Smart Contract Cơ Bản",
    lessons: 24,
    rating: "4.9",
    image: smartContractImage,
  },
  {
    tag: "DApp",
    title: "Xây DApp Đầu Tiên",
    lessons: 18,
    rating: "4.8",
    image: dappImage,
  },
  {
    tag: "NFT",
    title: "NFT Toàn Tập",
    lessons: 16,
    rating: "4.9",
    image: nftImage,
  },
  {
    tag: "DeFi",
    title: "DeFi Cho Người Mới",
    lessons: 20,
    rating: "4.7",
    image: defiImage,
  },
];
