import gql from "graphql-tag";

export const POOL_TOKENS = gql`
  query poolTokens($tokenAddress: Bytes!) {
    poolTokens(where: { poolId: $tokenAddress }) {
      name
      poolId{
       owner
      }
      address
      decimals
      balance
      weight
    }
  }
`;

export const POOL_SHARES = gql`
  query poolShares ($tokenAddress: Bytes!){
    poolShares(where: { poolId: $tokenAddress }){
      id 
      balance
}
 
  }
`;


export const LATEST_PRICES = gql`
  query latestPrices ($tokenAddress: Bytes!){
    latestPrices(where: { poolId: $tokenAddress }){
      price
        asset
}
 
  }
`;
export const TOKENS_PRICES = gql`
  query tokenPrices ($tokenAddress: Bytes!){
    tokenPrices(where: { poolId: $tokenAddress }){
      asset
      amount
      pricingAsset
      price
}
 
  }
`;
export const POOL_SNAPSHOTS = gql`
  query amounts {
    
    poolSnapshots{
      totalShares
    }

 
  }
`;
export const SWAPS=gql`
query swaps ($tokenAddress: Bytes!){
  swaps(where: { poolId: $tokenAddress }){
    tokenIn
    userAddress{
      id
    }
    tokenOut
    tokenAmountIn
    tokenAmountOut
}

}

`
export const POOLS=gql`
query pools ($tokenAddress: Bytes!){
  pools(where: { id: $tokenAddress }){
    id
    address
    totalLiquidity
    totalShares
    
}
}

`
