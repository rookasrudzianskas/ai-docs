import fm from "front-matter";
import { createClient } from '@supabase/supabase-js'
import {SLUGS} from "./slugs.js";
import {generateEmbedding} from "./embeddings.js";
import supabase from "./supabase.js";

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
