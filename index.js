import fm from "front-matter";
import { createClient } from '@supabase/supabase-js'
import {SLUGS} from "./slugs.js";
import {generateEmbedding} from "./embeddings.js";

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
  const vector = await generateEmbedding(data.body);

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
