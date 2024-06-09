console.log('Running');

const parseExpoDocs = async (slug) => {
  const url = `https://raw.githubusercontent.com/expo/expo/main/docs/pages/${slug}.mdx`;
  const response = await fetch(url);
  const content = await response.text();
  console.log(content);
}

parseExpoDocs('/get-started/start-developing');
