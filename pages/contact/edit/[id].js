import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Image from "next/image";
import styles from "../../../styles/fibr.module.css";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Input from "@mui/material/Input";

const ariaLabel = { "aria-label": "description" };

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export async function getStaticPaths() {
  const host = process.env.API_PATH;
  const apiContacts = `${host}/v1/contacts`;
  const res = await fetch(apiContacts);
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
  const [tempContact, setTempContact] = useState({});
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setContact(data);
  }, []);

  const updateName = async (contactId) => {
    const apiContacts = `${host}/v1/contacts/${contactId}`;

    //Double check if the param is not the same on the update
    let sendContact = {};
    for (const key in tempContact) {
      if (tempContact[key] != contact[key]) {
        sendContact[key] = tempContact[key];
      }
    }

    const response = await fetch(apiContacts, {
      method: "PUT",
      body: JSON.stringify({ contact: sendContact }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    setContact(jsonResponse);
    setLoading(false);
  };

  return (
    <div>
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
            {contact.title}
          </Typography>
          <Typography variant="h5" component="div">
            {contact.name}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {contact.department}
          </Typography>
          <Typography variant="body2">{contact.email}</Typography>
          <Typography variant="body2">{contact.mobile_phone}</Typography>
          <Typography variant="body2">{data.landline}</Typography>

          <Image
            src="/images/telco.png"
            className={styles.borderRound}
            height={150}
            width={300}
            alt=" "
          />

          <Typography variant="h5" component="div">
            EDIT PROPERTIES
          </Typography>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Name
            </InputLabel>
            <Input
              type="text"
              value={tempContact.name}
              defaultValue={data.name}
              inputProps={ariaLabel}
              onChange={(e) =>
                setTempContact({ ...tempContact, name: e.target.value })
              }
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Titulo
            </InputLabel>
            <Input
              type="text"
              value={tempContact.title}
              defaultValue={data.title}
              inputProps={ariaLabel}
              onChange={(e) =>
                setTempContact({ ...tempContact, title: e.target.value })
              }
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Email
            </InputLabel>
            <Input
              type="text"
              value={tempContact.email}
              defaultValue={data.email}
              inputProps={ariaLabel}
              onChange={(e) =>
                setTempContact({ ...tempContact, email: e.target.value })
              }
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Mobile Phone
            </InputLabel>
            <Input
              type="text"
              value={tempContact.mobile_phone}
              defaultValue={data.mobile_phone}
              onChange={(e) =>
                setTempContact({ ...tempContact, mobile_phone: e.target.value })
              }
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Landline
            </InputLabel>
            <Input
              type="text"
              value={tempContact.landline}
              defaultValue={data.landline}
              onChange={(e) =>
                setTempContact({ ...tempContact, landline: e.target.value })
              }
            />
          </FormControl>
        </CardContent>

        <CardActions>
          {!loading && (
            <Button
              size="small"
              onClick={() => {
                setLoading(true);
                updateName(data.id);
              }}
            >
              Update
            </Button>
          )}
        </CardActions>

        <div></div>

        <Link href={`/contact/${data.id}`} key="edit_contact" passHref>
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
    </div>
  );
};

export default Contact;
