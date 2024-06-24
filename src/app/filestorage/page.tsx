"use client";
import React, { useState, useEffect } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CornerDownLeft } from "lucide-react";
import { getApiKey } from "../Components/LighthouseSdkAPi";
import { useFileContext } from "../Components/FileContext";
import Form from "../Components/Form";
import abi from "../../utils/DealClient.json";
import Web3 from "web3";
import HFForm from "../Components/HuggingFaceForm";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import { schema } from "../../utils/schema";

const StoreFiles = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<(string | JSX.Element)[]>([]);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [uploadedFileHash, setUploadedFileHash] = useState<string | null>(null);
  const { setFileHash } = useFileContext();
  const [pieceCid, setPieceCid] = useState(
    "baga6ea4seaqhedb2m6yyr4wejjgxrrehujv5yp6ujzgebqaz22qlm6v74apw6oq"
  );
  const [pieceSize, setPieceSize] = useState(4096);
  const [verifiedDeal, setVerifiedDeal] = useState(false);
  const [label, setLabel] = useState("file-1686957219783.png");
  const [startEpoch, setStartEpoch] = useState(520000);
  const [endEpoch, setEndEpoch] = useState(1555200);
  const [storagePricePerEpoch, setStoragePricePerEpoch] = useState(0);
  const [providerCollateral, setProviderCollateral] = useState(0);
  const [clientCollateral, setClientCollateral] = useState(0);
  const [extraParamsVersion, setExtraParamsVersion] = useState("1");
  const [locationRef, setLocationRef] = useState(
    "https://data-depot.lighthouse.storage/api/download/download_car?fileId=c52f62f1-dd4d-4f02-8352-2af72442818d.car"
  );
  const [carSize, setCarSize] = useState(2061);
  const [skipIpniAnnounce, setSkipIpniAnnounce] = useState(false);
  const [removeUnsealedCopy, setRemoveUnsealedCopy] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [hfForm, setHFForm] = useState(false);
  // console.log(setFileHash);
  const address = "0xfd562f20e65e0d87598cda7f2a1ac348a008fa0d";

  const progressCallback = (progressData: any) => {
    if (
      progressData?.total !== undefined &&
      progressData?.uploaded !== undefined
    ) {
      const total = Number(progressData.total);
      const uploaded = Number(progressData.uploaded);
    } else {
      console.error("Missing total or uploaded in progressData:", progressData);
    }
  };

  const handleDownload = () => {
    const fileData = JSON.stringify(schema, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "schema.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const verify = async () => {
    try {
      // The appid of the project created in dev center
      const appid = "4bd6608d-8293-40d7-8634-59dddb05396a";

      // Create the connector instance
      const connector = new TransgateConnect(appid);

      // Check if the TransGate extension is installed
      // If it returns false, please prompt to install it from chrome web store
      const isAvailable = await connector.isTransgateAvailable();

      if (isAvailable) {
        // The schema id of the project
        const schemaId = "61f5b1e216c442509233bb6ba28f8be5";

        // Launch the process of verification
        const res = await connector.launch(schemaId);

        // Prepare data for verification
        const verificationData = {
          taskId: res.taskId,
          schemaId,
          validatorAddress: "your_validator_address", // Replace with actual validator address
          validatorSignature: res.validatorSignature,
          recipient: res.recipient,
          uHash: res.uHash,
          publicFieldsHash: res.publicFieldsHash,
        };

        // Call the backend endpoint for verification
        const response = await fetch("/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verificationData),
        });

        const result = await response.json();
        if (result.isValid) {
          console.log("Verification successful");
        } else {
          console.log("Verification failed");
        }
      } else {
        console.log("Please install TransGate");
      }
    } catch (error) {
      console.log("transgate error", error);
    }
  };

  const generate = async (schemaId: string, appid: string) => {
    try {
      const appid = "4bd6608d-8293-40d7-8634-59dddb05396a";

      const connector = new TransgateConnect(appid);

      const isAvailable = await connector.isTransgateAvailable();

      if (isAvailable) {
        const schemaId = "61f5b1e216c442509233bb6ba28f8be5";

        const res = await connector.launch(schemaId);

        const verificationData = {
          taskId: res.taskId,
          schemaId,
          validatorAddress: "your_validator_address",
          validatorSignature: res.validatorSignature,
          recipient: res.recipient,
          uHash: res.uHash,
          publicFieldsHash: res.publicFieldsHash,
        };

        const response = await fetch("/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verificationData),
        });

        const result = await response.json();
        if (result.isValid) {
          console.log("Verification successful");
        } else {
          console.log("Verification failed");
        }
      } else {
        console.log("Please install TransGate");
      }
    } catch (error) {
      console.log("transgate error", error);
    }
  };

  const uploadFile = async (file: File) => {
    try {
      const apiKey = await getApiKey();
      if (!apiKey) {
        throw new Error("API key not retrieved");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://node.lighthouse.storage/api/v0/add",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }

      const output = await response.json();

      if (output && output.Hash) {
        setFileHash(output.Hash);

        setMessages((prevMessages) => [
          ...prevMessages,
          "File uploaded successfully!",
          `Visit at https://gateway.lighthouse.storage/ipfs/${output.Hash}`,
        ]);
      } else {
        throw new Error("Upload output is invalid");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        "Failed to upload file. Please try again.",
      ]);
    }
  };

  const handleSendMessage = () => {
    setTimeout(() => {
      if (
        query.trim().toLowerCase() === "can you help me to upload the file?"
      ) {
        setShowUploadButton(true);
        setMessages((prevMessages) => ["Sure, please upload your file below."]);
      } else if (
        query.trim().toLowerCase() ===
        "can you help to deploy training node for gemma model?"
      ) {
        setShowForm(true);
        setMessages((prevMessages) => ["Yes, sure. Fill out this form."]);
      } else if (
        query.trim().toLowerCase() === "can you submit model to hugging face?"
      ) {
        setHFForm(true);
        setMessages((prevMessages) => [
          "Yes, sure. Fill can you fill out this form.",
        ]);
      } else {
        setMessages((prevMessages) => [...prevMessages, query]);
      }
      setQuery("");
    }, 2000);
  };

  // bg-[#151518]

  return (
    <div className="container mx-auto mt-4 ">
      <div className="message-container bg-[#151518] border  rounded-sm bg-background  max-h-90 overflow-y-auto p-6 text-white  ">
        <ul className="message-list list-none p-0 bg-[#151518]">
          {messages.map((message, index) => (
            <li key={index} className="message-item py-2 ">
              {typeof message === "string" ? message : JSON.stringify(message)}
            </li>
          ))}
        </ul>
        {showUploadButton && (
          <div className="upload-container mt-4 p-4  rounded-sm  text-center">
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  uploadFile(e.target.files[0]);
                }
              }}
              className="upload-input text-white "
            />
            <Button onClick={handleDownload}>Generate Schema</Button>
          </div>
        )}
        {showForm && (
          <div className="form-container mt-4 p-4 rounded-sm bg-[#151518] h-[30rem] w-[37rem]">
            <Form key="form" />
          </div>
        )}
        {hfForm && (
          <div className="form-container mt-4 p-4 rounded-sm bg-[#151518] h-[30rem] w-[37rem]">
            <HFForm key="form" />
          </div>
        )}
      </div>

      <form
        className="fixed bottom-0 left-0 right-0 mb-[1rem] text-center p-4 overflow-hidden rounded-lg mx-auto w-[80%] border  focus-within:ring-1  focus-within:ring-blue-50"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter query"
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0   text-white"
        />
        <div className="flex items-center p-3 pt-0 ">
          <Button
            size="sm"
            className="ml-auto gap-1.5"
            onClick={handleSendMessage}
          >
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StoreFiles;
