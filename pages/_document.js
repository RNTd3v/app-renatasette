import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <title>Renata Sette</title>
          {this.props.styleTags}
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="author" content="Renata Sette" />
          <meta name="description" content="Renata Sette" />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          ></link>
          <link
            rel="stylesheet"
            type="text/css"
            charset="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
