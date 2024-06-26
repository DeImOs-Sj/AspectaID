"use client";
import React, { useState } from "react";
import { useFileContext } from "../Components/FileContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { data } from "../../lib/data";

const BuyDataPage = () => {
  const { fileHash } = useFileContext();
  const [deploying, setDeploying] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Get Precision Data Models</h1>
      <br />
      {/* {fileHash && <p>File Hash: {fileHash}</p>} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((model, index) => (
          <Card className="w-[350px] mb-4" key={index}>
            <CardHeader>
              <CardTitle>{model.model_name}</CardTitle>
              <CardDescription>{model.short_description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`name-${index}`}>Providers Name</Label>
                    <CardDescription>{model.provider_name}</CardDescription>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`framework-${index}`}>
                      Model Description
                    </Label>
                    <CardDescription className="w-[20rem] h-[13rem]">
                      {model.long_description}
                    </CardDescription>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Buy</Button>
              <Button onClick={handleDeploy} disabled={deploying}>
                {deploying ? "Deploying..." : "Deploy"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BuyDataPage;

// {
//   model.createrName;
// }
