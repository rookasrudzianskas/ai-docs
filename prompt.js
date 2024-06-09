import {generateEmbedding} from "./embeddings.js";
import supabase from "./supabase.js";

const runPrompt = async (query) => {
  console.log(query);
  const vector = await generateEmbedding(query);
  console.log(vector);

  const {data, error} = await supabase.rpc('match_documents', {
    query_embedding: vector,
    match_threshold: 0.2,
    match_count: 2,
  });

  console.log(error);
  console.log(data);
}

runPrompt('How to deploy the project?')
