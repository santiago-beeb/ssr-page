import React from "react";

import { App } from "../../app/containers/App";
import { StaticRouter } from "react-router-dom/server";
import { renderToString } from "react-dom/server";
import { template } from "./template";
import { ServerStyleSheet } from "styled-components";

export const render = (url: string, initialProps = {}) => {
  const sheet = new ServerStyleSheet();
  try {
    const stream = renderToString(
      sheet.collectStyles(
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      )
    );

    const styleTags = sheet.getStyleTags();

    const html = template(stream, initialProps, styleTags);

    return html;
  } catch (error) {
    console.error(error);
  }
};
