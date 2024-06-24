export const schema = {
  issuer: "Lighthouse Storage",
  desc: "A decentralized storage platform allowing users to store and share data securely.",
  website: "https://lighthouse.storage",
  APIs: [
    {
      host: "gateway.lighthouse.storage",
      intercept: {
        url: "ipfs/bafkreifql4h5ndxflc6bfilmqrf43h3w554ugqqh6ad2cyjbbtauyltt34",
        method: "GET",
        query: [],
      },
      assert: [
        {
          key: "status",
          value: "200",
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
