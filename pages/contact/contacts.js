import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/fibr.module.css";

import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function contacts({ data }) {
  let displayData;
  displayData = data.map(function (contact) {
    return (
      <CardContent
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          margin: "10px",
          width: "300px",
        }}
      >
        <Typography variant="h5" component="div">
          {contact.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {contact.title} / {contact.company?.name}
        </Typography>

        <Link href={`/contact/${contact.id}`} key={contact.id}>
          <Button size="small">{contact.name} show</Button>
        </Link>
      </CardContent>
    );
  });

  return (
    <>
      <Head>
        <title>Fibr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Image
          src="/images/telco.png"
          className={styles.borderRound}
          height={150}
          width={300}
          alt=" "
        />
        <h1>Contact of Telecom Companies</h1>

        {displayData}

        <Link href="/" key="back_company" passHref>
          <button className={styles.button}>...back</button>
        </Link>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;

          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps() {
  const host = process.env.API_PATH;
  const apiCompanies = `${host}/v1/contacts`;

  const response = await fetch(apiCompanies);
  const data = await response.json();
  return { props: { data } };
}
