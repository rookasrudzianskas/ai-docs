import fm from "front-matter";
import OpenAI from "openai";

const openai = new OpenAI();

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

  console.log(embedding.data[0]);

}

handleDoc('/get-started/start-developing');
