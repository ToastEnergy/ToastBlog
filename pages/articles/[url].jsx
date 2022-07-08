import { supabase, getArticles } from '../../supabase';
import Article from '../../components/Article';

export default function Post({ article }) {
    return <Article article={article} />;
}

export async function getStaticProps({ params }) {
    const articles = await getArticles(params.url);

    return {
        props: {
            article: articles[0],
        },
    };
}

export async function getStaticPaths() {
    const { data, error } = await supabase.from("articles").select("url");

    const paths = data.map((article) => ({
      params: { url: article.url },
    }))
  
    return { paths, fallback: false }
  }
