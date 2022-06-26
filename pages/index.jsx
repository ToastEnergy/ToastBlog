import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Meta from "../components/Meta";
import dynamic from "next/dynamic";
import Link from "next/link";
import path from "path";
import fs from "fs";

export default function Home({ articles }) {
  return (
    <div className="home">
      {articles.map((article) => {
        return (
          <div>
            <MDXRemote {...article} components={{ Meta }} />
          </div>
        );
      })}
    </div>
  );
}

export function getStaticProps() {
  var files = fs.readdirSync(path.join(process.cwd(), "pages", "articles"));
  files = files.filter((file) => file.endsWith(".mdx"));
  /* files = files.map((file) => {
    fs.readFile(path.join(process.cwd(), "pages", "articles", file), (err, data) => {
      console.log('--------')
      console.log(data.toString());
      const source = getSerialize(data.toString());
      return source;
    });
  }) */
  let articles = [];

  files.forEach(async (file) => {
    const source = await serialize(
      fs.readFileSync(
        path.join(process.cwd(), "pages", "articles", file),
        "utf8"
      )
    );
    articles.push(source);
  });

  console.log(articles);

  return { props: { articles: articles } };
}
