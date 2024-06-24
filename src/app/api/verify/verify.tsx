import { NextRequest, NextResponse } from "next/server";
import { getMessageHistoryContents } from "../../../utils/functions";
const Web3 = require("web3");

const web3 = new Web3(Web3.givenProvider);

export async function POST(request: NextRequest) {
  try {
    const {
      taskId,
      schemaId,
      validatorAddress,
      validatorSignature,
      recipient,
      uHash,
      publicFieldsHash,
    } = req.body;

    const taskIdHex = web3.utils.stringToHex(taskId);
    const schemaIdHex = web3.utils.stringToHex(schemaId);

    const types = ["bytes32", "bytes32", "bytes32", "bytes32"];
    const values = [taskIdHex, schemaIdHex, uHash, publicFieldsHash];

    if (recipient) {
      types.push("address");
      values.push(recipient);
    }

    const encodeParams = web3.eth.abi.encodeParameters(types, values);

    const paramsHash = web3.utils.soliditySha3(encodeParams);

    const signedValidatorAddress = web3.eth.accounts.recover(
      paramsHash,
      validatorSignature
    );

    const isValid = signedValidatorAddress === validatorAddress;
    NextResponse.json({ isValid });
  } catch (error) {
    console.error("Verification error:", error);
    NextResponse.json({ error: "Verification failed" });
  }
}
