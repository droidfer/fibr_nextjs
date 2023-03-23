import Link from "next/link";
import Head from "next/head";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Image from "next/image";
import styles from "../../styles/fibr.module.css";

export async function getStaticPaths() {
  const host = process.env.API_PATH;
  const apiCompanies = `${host}/v1/companies`;
  const res = await fetch(apiCompanies);
  const data = await res.json();

  const paths = data.map((comp) => {
    return {
      params: { id: comp.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const host = process.env.API_PATH;
  const id = context.params.id;
  const apiCompanies = `${host}/v1/companies/${id}`;

  const response = await fetch(apiCompanies);
  const data = await response.json();
  return { props: { data } };
}

const Company = ({ data }) => {
  let displayData;
  displayData = data.contacts.map(function (contact) {
    return (
      <CardContent
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          margin: "10px",
          width: "300px",
        }}
        key={`cardContent_${contact.id}`}
      >
        <Typography variant="h5" component="div">
          {contact.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {contact.title}
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
        <CardContent
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            margin: "10px",
            width: "300px",
          }}
        >
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {data.description}
          </Typography>
          <Typography variant="h5" component="div">
            {data.name}
          </Typography>
          <Image
            key="imageTelco"
            src="/images/telco.png"
            className={styles.borderRound}
            height={150}
            width={300}
            alt=" "
            priority={true}
          />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {data.legal_name}
          </Typography>
          <Typography variant="body2">{data.ruc}</Typography>
          <Typography variant="body2">{data.url}</Typography>
        </CardContent>
        <CardActions>
          <Link href={`/company/edit/${data.id}`} key={data.id}>
            <Button size="small">edit</Button>
          </Link>
        </CardActions>

        <h1>Contacts</h1>

        {displayData}

        <Link href="/company/companies" key="back_company" passHref>
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
};

export default Company;
