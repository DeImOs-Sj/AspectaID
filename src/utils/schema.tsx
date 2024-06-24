export const schema = {
  issuer: "Lighthouse Storage",
  desc: "A decentralized storage platform allowing users to store and share data securely",
  website: "https://lighthouse.storage",
  APIs: [
    {
      host: "gateway.lighthouse.storage",
      intercept: {
        url: "https://gateway.lighthouse.storage/ipfs/bafkreigtgzzocdx3ypyahxfs3uqchnwujfo5w3kouus63jvzlrfafrr76y",
        method: "GET",
        query: [
          {
            q: "UserStatsContentQuery",
            verify: false,
          },
        ],
      },
      assert: [
        {
          key: "data|viewer|__typename",
          value: "Viewer",
          operation: "=",
        },
      ],
      nullifier: "data|cid",
    },
  ],
  HRCondition: ["Lighthouse Storage Account Owner"],
  tips: {
    message:
      "When you successfully access the URL, please ensure the status code is 200 to verify the data retrieval.",
  },
};
