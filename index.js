import fm from "front-matter";
const parseExpoDocs = async (slug) => {
  const url = `https://raw.githubusercontent.com/expo/expo/main/docs/pages/${slug}.mdx`;
  const response = await fetch(url);
  const content = await response.text();
  const data = fm(content)
  return dat;
}

parseExpoDocs('/get-started/start-developing');
