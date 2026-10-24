import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Decentralized Chain Link",
    summary:
      "A Layer-1 blockchain network simulation where peer nodes sync transactions over WebSockets and maintain a distributed ledger. Implements Proof-of-Stake consensus, Merkle trees and SHA-256 hashing, plus DCLScan — a real-time explorer for blocks, transactions and accounts.",
    stack: ["NestJS", "Next.js", "WebSockets", "LevelDB", "TypeScript"],
    links: [
      { label: "Explorer", href: "https://github.com/ratul701E/DecentralizedChainLink-Explorer" },
      { label: "P2P Network", href: "https://github.com/ratul701E/p2p" },
    ],
    featured: true,
    badge: "1st Place · AIUB CS Fest 2024",
  },
  {
    title: "Solana NFT Minting dApp",
    summary:
      "A decentralized NFT minting platform on Solana. Metadata and media are stored on IPFS via Pinata, while Phantom Wallet handles authentication and transaction signing through Solana Web3.js and the Wallet Adapter.",
    stack: ["Next.js", "Solana Web3.js", "Phantom Wallet", "Pinata / IPFS"],
    links: [
      {
        label: "Source",
        href: "https://github.com/tanvirh103/Solana-Based-NFT-Minting-and-Auction-dApp",
      },
    ],
    featured: true,
  },
  {
    title: "Travel Planner",
    summary:
      "A travel planning web app with an ASP.NET Web API backend built on an N-tier architecture and SOLID principles, paired with a responsive Next.js frontend.",
    stack: ["ASP.NET", "Next.js", "SQL Server", "N-Tier"],
    links: [{ label: "Source", href: "https://github.com/tanvirh103/TravelPlanner" }],
  },
  {
    title: "E-commerce Platform",
    summary:
      "A full e-commerce store with user registration, product browsing and checkout, plus an admin panel for inventory management, sales history and order tracking.",
    stack: ["PHP", "MySQL", "AJAX", "HTML", "CSS"],
    links: [{ label: "Source", href: "https://github.com/tanvirh103/ecommerce" }],
  },
  {
    title: "GameStop",
    summary:
      "A niche e-commerce site for PC and gaming gear with customer accounts, purchasing, and an admin dashboard to manage products, inventory and orders.",
    stack: ["PHP", "MySQL", "AJAX", "HTML", "CSS"],
    links: [{ label: "Source", href: "https://github.com/tanvirh103/GameStop" }],
  },
  {
    title: "iMBD",
    summary:
      "A team project (4 members): a movie and TV show platform where users can rate, review and purchase titles.",
    stack: ["PHP", "MySQL", "AJAX", "HTML", "CSS"],
    links: [{ label: "Source", href: "https://github.com/Borshon1017/iMBD" }],
  },
];
