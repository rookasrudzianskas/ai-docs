import fm from "front-matter";
import OpenAI from "openai";
import { createClient } from '@supabase/supabase-js'
import {SLUGS} from "./slugs.js";

const openai = new OpenAI();
const supabase = createClient(
  'https://andyuvesarogqjseorkh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZHl1dmVzYXJvZ3Fqc2VvcmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc5MjE4NDIsImV4cCI6MjAzMzQ5Nzg0Mn0.OlyVZfdSg2dQauWDbzzAFtHXjK6RP8BDianU9UZRwgo'
)

const parseExpoDocs = async (slug) => {
  const url = `https://raw.githubusercontent.com/expo/expo/main/docs/pages/${slug}.mdx`;
  const response = await fetch(url);
  const content = await response.text();
  const data = fm(content)
  return data;
}

const handleDoc = async (slug) => {
  const data = await parseExpoDocs(slug);
  // generate a vector

  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: data.body,
    encoding_format: 'float',
  });
  const vector = embedding.data[0].embedding;

  const { error } = await supabase
    .from('docs')
    .insert([
      {
        id: slug,
        title: data.attributes.title,
        url: `https://docs.expo.dev${slug}`,
        vector: vector
      },
    ])
    .select()

  console.log(error);

}

const handleAllDocs = async () => {
  await Promise.all(SLUGS.map(slug => handleDoc(slug)));
}

handleAllDocs();
