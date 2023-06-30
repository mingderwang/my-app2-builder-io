import React from 'react';
import { useRouter } from 'next/router';
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';

// Replace with your Builder.io API Key
builder.init('c98546b785c64577a2bb69b50a526eba');
builder.apiVersion = "v3";

// Allow us to fetch page contents server side
export async function getStaticProps({ params }) {
  const page = await builder
    .get('page', {
      userAttributes: { urlPath: '/' + (params?.page?.join('/') || ''),
      vercelPreview: process.env.VERCEL_ENV === 'preview',
    }}).toPromise();

  return {
    props: { page: page || null },
    revalidate: 5,
    fallback: 'blocking'
  };
}

export default function Page({ page }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  // Show 404 for any non existent page
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{page?.data.title}</title>
      </Head>
      {/* Render the Builder conten */}
      <BuilderComponent model="page" content={page} />
    </>
  );
}