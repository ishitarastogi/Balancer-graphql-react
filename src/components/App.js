import React from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { useQuery } from "@apollo/react-hooks";

import { POOL_TOKENS,POOL_SHARES,LATEST_PRICES, TOKENS_PRICES,POOL_SNAPSHOTS,POOLS,SWAPS} from "../utils/graphql";
import balancerLogo from "../images/balancer-bal-logo.png";
import Balancer from "../images/Balancer.png";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-kovan-v2"
  }),
  fetchOptions: {
    mode: "no-cors"
  },
  cache: new InMemoryCache()
});

const App = () => {
  const { loading: poolSharesLoading, error: poolSharesError, data: poolSharesData } = useQuery(
    POOL_SHARES,
    {
      variables: {
        tokenAddress: "0x3a19030ed746bd1c3f2b0f996ff9479af04c5f0a000200000000000000000004"
      }
    }
  );
  const { loading: poolTokensLoading, error: poolTokensError, data: poolTokensData } = useQuery(
    POOL_TOKENS,
    {
      variables: {
        tokenAddress: "0x3a19030ed746bd1c3f2b0f996ff9479af04c5f0a000200000000000000000004"
      }
    }
  );
  const { loading: latestPricesLoading, error: latestPricesError, data: latestPricesData } = useQuery(
    LATEST_PRICES,
    {
      variables: {
        tokenAddress: "0x3a19030ed746bd1c3f2b0f996ff9479af04c5f0a000200000000000000000004"
      }
    }
  );
  const { loading: tokenPricesLoading, error: tokenPricesError, data: tokenPricesData } = useQuery(
    TOKENS_PRICES,
    {
      variables: {
        tokenAddress: "0x3a19030ed746bd1c3f2b0f996ff9479af04c5f0a000200000000000000000004"
      }
    }
  );
  const { loading: poolSnapshotsLoading, error: poolSnapshotsError, data: poolSnapshotsData } = useQuery(
    POOL_SNAPSHOTS
  );
  const { loading: poolLoading, error: poolError, data: poolData } = useQuery(
    POOLS,
    {
      variables: {
        tokenAddress: "0x3a19030ed746bd1c3f2b0f996ff9479af04c5f0a000200000000000000000004"
      }
    }
  );
  // const { loading: swapLoading, error: swapError, data: swapData } = useQuery(
  //   SWAPS,
  //   {
  //     variables: {
  //       tokenAddress: "0xaac98ee71d4f8a156b6abaa6844cdb7789d086ce00020000000000000000001b"
  //     }
  //   }
  // );
  const poolTokensbalance1 = poolTokensData && poolTokensData.poolTokens[0].balance;
  const poolTokensbalance2 = poolTokensData && poolTokensData.poolTokens[1].balance;
  const poolTokensWeight1= poolTokensData && poolTokensData.poolTokens[0].weight;
  const poolTokensWeight2= poolTokensData && poolTokensData.poolTokens[1].weight;
  const poolTokensDecimals = poolTokensData && poolTokensData.poolTokens[0].decimals;
  const poolShares=poolSharesData&& poolSharesData.poolShares[0].balance;
  //const latestPrices=latestPricesData&& latestPricesData.latestPrices[0].price;
  const tokenPricesamount=tokenPricesData&& tokenPricesData.tokenPrices[0].amount;
  const tokenPricesprice=tokenPricesData&& tokenPricesData.tokenPrices[0].price;
  const tokenPricesPricingAsset=tokenPricesData&& tokenPricesData.tokenPrices[0].pricingAsset;
  const tokenPricesasset=tokenPricesData&& tokenPricesData.tokenPrices[0].asset;

  const poolSnapshots=poolSnapshotsData&& poolSnapshotsData.poolSnapshots[0].totalShares;
  const pools=poolData && poolData.pools[0].totalShares;

  console.log(pools);




  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://thegraph.com/explorer/subgraph/balancer-labs/balancer-v2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={balancerLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          &nbsp; Balancer Data
        </a>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <div>
                <img
                  src={Balancer}
                  width="150"
                  height="150"
                  className="mb-4"
                  alt=""
                />
                
                 <h2> Balancer Data:</h2>{" "}
                  { poolSharesError || poolTokensError || latestPricesError || tokenPricesError || poolSnapshotsError 
                    ? "GraphQL Error"
                    : [
                         poolSharesLoading || poolTokensLoading || latestPricesLoading || tokenPricesLoading || poolSnapshotsLoading 
                          ? "Loading token data..."
                          : [
                            <br></br>,
                             "POOL_TOKENS Balance 1", " : ",poolTokensbalance1,<br></br>,
                             "POOL_TOKENS Balance 2", " : ",poolTokensbalance2,<br></br>,
                             "POOL_TOKENS Weight 1", " : ",poolTokensWeight1,<br></br>,
                             "POOL_TOKENS Weight 1", " : ",poolTokensWeight2,<br></br>,
                             "POOL_TOKENS-decimals", ":",poolTokensDecimals,<br></br>,
                             "POOL_SHARES", ":",poolShares,<br></br>,
                            //  "LATEST_PRICE", ":",latestPrices,<br></br>,
                             "TOKEN_PRICE", ":",tokenPricesamount,<br></br>,
                             "POOL_SNAPSHOTS", ":",poolSnapshots,<br></br>,
                              "Pools_totalshares",":",pools,
                              tokenPricesprice,<br></br>,tokenPricesPricingAsset,<br></br>,  tokenPricesasset,<br></br>

                            


                         
                              
                            
                            ]
                      ]}
               
             
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
