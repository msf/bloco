# bloco

Baremetal blockchain native (ethereum) client.

the goal is to have a cli to execute transfers, swaps.. etc..

## steps/ideas

Have a smartcontract that can do uniswap swaps between two hard-coded tokens:
- USDC
- ETHW
(using polygon network)

    I need to know the following addresses:
    ERC20 ETHW address on polygon
    ERC20 USDC address on polygon
    the smartcontract address for the uniswap pool for USDC:ETHW

    things needed:
    - deploy my own smartcontract
    - give the smartcontract approval to make swaps in my name, afaik
    - how to invoke the smartcontract from cli?

https://docs.uniswap.org/contracts/v3/guides/swaps/single-swaps
