import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
        <meta name="title" content="todo list online" />
        <meta
          name="description"
          content="manage your shedule with todo list and boosy your productivity"
        />
        <meta name="keywords" content="todo shedule manage todolist" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English"></meta>
      </Head>
      <div className="home-container">Please Login to start shrinking urls</div>
    </>
  );
};
export default Home;
