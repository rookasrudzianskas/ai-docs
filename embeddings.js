import OpenAI from "openai";

const openai = new OpenAI();

export const generateEmbedding = async (input) => {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: input,
    encoding_format: 'float',
  });
  const vector = embedding.data[0].embedding;
  return vector;
}
