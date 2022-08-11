package main

import (
	"context"
	"fmt"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/namsral/flag"
)

//const RPLADDR = "0xD33526068D116cE69F19A9ee46F0bd304F21A51f"
//const rETHADDR = "0xae78736Cd615f374D3085123A210448E74Fc6393"

func main() {
	addr := flag.String("addr", "http://gracehopper:8545", "api url")
	useInfura := flag.Bool("infura", false, "use infura")
	apiKey := flag.String("api_key", "", "API key for infura")
	blockNumber := flag.Int("blockN", 0, "block number")
	flag.Parse()

	addrEndp := *addr
	if *useInfura {
		addrEndp = fmt.Sprintf("https://mainnet.infura.io/v3/%v", *apiKey)
	}
	cli, err := ethclient.Dial(addrEndp)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Connected to: %v\n", addrEndp)

	var blockN *big.Int
	if *blockNumber != 0 {
		blockN = big.NewInt(int64(*blockNumber))
	}
	header, err := cli.HeaderByNumber(context.Background(), blockN)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Block number: %v, Difficulty: %v\n", header.Number.String(), header.Difficulty.String())

}

//index.js

// The minimum ABI to get ERC20 Token balance

// const minABI = [
//   // balanceOf
//   {
//     constant: true,
//     inputs: [{ name: "_owner", type: "address" }],
//     name: "balanceOf",
//     outputs: [{ name: "balance", type: "uint256" }],
//     type: "function",
//   },
//
// ];
