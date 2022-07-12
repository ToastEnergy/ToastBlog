export default async function handler(req, res) {
    if (req.method === 'POST') {
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: `*[${req.body.article.title}](https://blog.toastenergy.xyz/articles/${req.body.article.url})*\n\n_by [@${req.body.author}](https://blog.toastenergy.xyz/users/${req.body.author})_`,
                parse_mode: 'MarkdownV2',
            }),
        });
        await res.revalidate('/');
        await res.revalidate('/articles/' + req.body.article.url);
        return res.status(200).send(JSON.stringify({message: 'ok'}));
    } else {
        return res.status(405).send(`${req.method} method not allowed`);
    }
  }
  