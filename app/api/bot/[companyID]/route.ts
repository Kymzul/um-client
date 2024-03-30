import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from 'openai';
import { ChatCompletionMessage } from "openai/resources/index.mjs";

//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
//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
const APIKEY = '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';
const config = new Configuration({
    apiKey: APIKEY
})

const openai = new OpenAIApi(config);
export const runtime = 'edge';

export async function POST(req: Request, { params }: {
    params: {
        companyID: string
    }
}) {
    try {
        const body = await req.json();
        const messages = body.messages;
        console.log('Company ID: ' + params.companyID)

        const systemMessage = {
            role: "system", content: "You are good financial advisor"
        };

        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            stream: true,
            messages: [
                systemMessage,
                ...messages]
        });
        const stream = OpenAIStream(response)

        console.log(response);

        return new StreamingTextResponse(stream);

    } catch (e) {
        console.log(e);
        return Response.json({ 'error': 'Internal Server Error' }, { status: 500 })
    }
}