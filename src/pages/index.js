import Head from '@docusaurus/Head';
import {Redirect} from '@docusaurus/router';

export default function Home() {
  // Use Docusaurus Redirect component for immediate redirect
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="0;url=/learning_dashboard.html" />
        <title>Redirecting...</title>
      </Head>
      <Redirect to="/learning_dashboard.html" />
    </>
  );
}
