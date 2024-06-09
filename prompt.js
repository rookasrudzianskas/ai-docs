import {completion, generateEmbedding} from "./embeddings.js";
import supabase from "./supabase.js";
import {parseExpoDocs} from "./docs-parser.js";

const buildFullPrompt = (query, docsContext) => {
  const prompt_boilerplate = "Answer the question posed in the user query section using the provided context";
  const user_query_boilerplate = "USER QUERY: ";
  const document_context_boilerplate = "CONTEXT: ";
  const final_answer_boilerplate = "Final answer: ";

  const filled_prompt_template = `
    ${prompt_boilerplate}
    ${user_query_boilerplate} ${query}
    ${document_context_boilerplate} ${docsContext}
    ${final_answer_boilerplate}
  `;
  return filled_prompt_template;
}

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

  const docs = await Promise.all(data.map(doc => parseExpoDocs(doc.id)));
  const docsBoddies = docs.map((doc) => doc.body);
  const contents = ''.concat(...docsBoddies);

  const filledPrompt = buildFullPrompt(query, contents);
  console.log(filledPrompt)

  const answer = await completion(filledPrompt);
  console.log(answer);
}

runPrompt('How to deploy the project?')
