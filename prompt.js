import {generateEmbedding} from "./embeddings.js";

const runPrompt = async (query) => {
  console.log(query);
  const vector = await generateEmbedding(query);
  console.log(vector);
}

runPrompt('How to initialize expo project')
