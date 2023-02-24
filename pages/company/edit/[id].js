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
  return { props: { data, host } };
}

const Company = ({ data, host }) => {
  const [tempCompany, setTempCompany] = useState({});
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCompany(data);
  }, []);

  const updateName = async (companyId) => {
    const apiCompanies = `${host}/v1/companies/${companyId}`;

    //Double check if the param is not the same on the update
    let sendCompany = {};
    for (const key in tempCompany) {
      if (tempCompany[key] != company[key]) {
        sendCompany[key] = tempCompany[key];
      }
    }

    const response = await fetch(apiCompanies, {
      method: "PUT",
      body: JSON.stringify({ company: sendCompany }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    setCompany(jsonResponse);
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
            {company.description}
          </Typography>
          <Typography variant="h5" component="div">
            {company.name}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {company.legal_name}
          </Typography>
          <Typography variant="body2">{company.ruc}</Typography>

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
              value={tempCompany.name}
              defaultValue={data.name}
              inputProps={ariaLabel}
              onChange={(e) =>
                setTempCompany({ ...tempCompany, name: e.target.value })
              }
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Legal Name
            </InputLabel>
            <Input
              type="text"
              value={tempCompany.legal_name}
              defaultValue={data.legal_name}
              inputProps={ariaLabel}
              onChange={(e) =>
                setTempCompany({ ...tempCompany, legal_name: e.target.value })
              }
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Description
            </InputLabel>
            <Input
              type="text"
              value={tempCompany.description}
              defaultValue={data.description}
              onChange={(e) =>
                setTempCompany({ ...tempCompany, description: e.target.value })
              }
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              RUC
            </InputLabel>
            <Input
              type="text"
              value={tempCompany.ruc}
              defaultValue={data.ruc}
              onChange={(e) =>
                setTempCompany({ ...tempCompany, ruc: e.target.value })
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

        <Link href={`/company/${data.id}`} key="edit_company" passHref>
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

export default Company;
