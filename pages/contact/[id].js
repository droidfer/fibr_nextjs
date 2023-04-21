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
  const apiContacs = `${host}/v1/contacts`;
  const res = await fetch(apiContacs);
  const data = await res.json();

  const paths = data.map((cont) => {
    return {
      params: { id: cont.id.toString() },
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
  const apiContacts = `${host}/v1/contacts/${id}`;

  const response = await fetch(apiContacts);
  const data = await response.json();
  return { props: { data, host } };
}

const Contact = ({ data, host }) => {
  const deleteContact = async () => {
    const apiContacts = `${host}/v1/contacts/${data.id}`;

    const response = await fetch(apiContacts, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();
  };

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
            {data.title}
          </Typography>
          <Typography variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {data.department?.name}
          </Typography>

          <Link href={`/company/${data.company?.id}`}>
            {" "}
            {data.company?.name}
          </Link>
          <Image
            src="/images/telco.png"
            className={styles.borderRound}
            height={150}
            width={300}
            alt=" "
          />

          <Typography variant="body2">{data.email}</Typography>
          <Typography variant="body2">{data.mobile_phone}</Typography>
          <Typography variant="body2">{data.landline}</Typography>
        </CardContent>
        <CardActions>
          <Link href={`/contact/edit/${data.id}`} key={data.id}>
            <Button size="small">edit</Button>
          </Link>

          <Button
            size="small"
            onClick={() => {
              deleteContact();
            }}
          >
            Delete
          </Button>
        </CardActions>

        <Link href="/contact/contacts" key="back_company" passHref>
          <button className={styles.button}>...all contacts</button>
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

export default Contact;
