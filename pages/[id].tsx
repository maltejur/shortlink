import getId from "lib/getId";
import { GetServerSideProps } from "next";

export default function ID() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const link = await getId(ctx.query.id.toString());
  if (link)
    return {
      props: {},
      redirect: {
        destination: link.target,
      },
    };
  else
    return {
      props: {},
      notFound: true,
    };
};
