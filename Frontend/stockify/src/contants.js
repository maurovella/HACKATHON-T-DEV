export const ENV = "DEV";

export const RPC_MUMBAI = "https://rpc-mumbai.maticvigil.com";
export const RPC_MAIN = "https://rpc-mainnet.maticvigil.com";
export const CHAINID_MUMBAI = 80001; // Matic Testnet
export const CHAINID_MAIN   = 137;   // Matic Mainnet
export const RPC_URL = ENV === "PROD" ? RPC_MAIN : RPC_MUMBAI;
export const CHAINID = ENV === "PROD" ? CHAINID_MAIN : CHAINID_MUMBAI;
export const CHAINNAME = ENV === "PROD" ? "Polygon Mainnet" : "Polygon Testnet";

export const ProjectManagerAddress_PROD = "0x"
export const ProjectManagerAddress_DEV  = "0x5836bE3a29c055dd36A169dd1803f5240654d0Be"
export const ProjectManagerAddress = ENV === "PROD" ? ProjectManagerAddress_PROD : ProjectManagerAddress_DEV;