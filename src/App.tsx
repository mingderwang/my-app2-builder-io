import { BuilderComponent, builder } from '@builder.io/react';

builder.init('c98546b785c64577a2bb69b50a526eba');

export const getStaticProps = async () => {
  // Fetch the builderJson data using Builder.io SDK
  const builderJson = await builder.get('page', { url: '/' }).promise();

  return {
    props: {
      builderJson,
    },
  };
};

export default function App() {
  return (
    <>
      <BuilderComponent model="page"  />
    </>
  );
}