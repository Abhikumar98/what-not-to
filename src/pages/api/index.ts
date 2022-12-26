// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const Prompt = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body } = req;

    const { prompt } = body;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `Write safe dank and funny advice for how to get in trouble with police by while ${String(
        prompt
      )}.`,
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const {
      data: { choices },
    } = response;

    res.send(choices);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default Prompt;
