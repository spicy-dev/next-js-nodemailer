import { ChakraProvider } from "@chakra-ui/react";
import AppContainer from "../components/AppContainer";
import theme from "../config/theme";

import Script from 'next/script'
const GTM_ID = 'GTM-5CRSZN9X';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <ChakraProvider >
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      </ChakraProvider >
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
        }}
      />
    </>
  );
}

export default MyApp;
