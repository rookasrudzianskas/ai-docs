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

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);

}

handleDoc('/get-started/start-developing');
