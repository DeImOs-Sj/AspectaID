import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

const getLLMCalls = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { query, message, input } = await req.json();

    const headers = {
      "x-api-key": process.env.FLOCK_BOT_API_KEY as string,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      `${process.env.FLOCK_BOT_CHAT}/chat/conversational_rag_chat`,
      { query, message, input },
      { headers }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json(
      { error: "Error fetching suggestions" },
      { status: 500 }
    );
  }
};

export default getLLMCalls;
