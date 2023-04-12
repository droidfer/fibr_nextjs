import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Image from "next/image";
import styles from "../../styles/fibr.module.css";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Input from "@mui/material/Input";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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

export async function getStaticProps() {
  const host = process.env.API_PATH;

  const apiCompanies = `${host}/v1/companies`;
  const response = await fetch(apiCompanies);
  const companies = await response.json();

  const apiDepartments = `${host}/v1/departments`;
  const depResponse = await fetch(apiDepartments);
  const depData = await depResponse.json();

  return { props: { host, companies, depData } };
}

const Contact = ({ host, companies, depData }) => {
  const [tempContact, setTempContact] = useState({});
  const [loading, setLoading] = useState(false);

  const createContact = async () => {
    const apiContacts = `${host}/v1/contacts/`;

    const response = await fetch(apiContacts, {
      method: "POST",
      body: JSON.stringify({ contact: tempContact }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    setLoading(false);
  };

  const handleCompanyChange = (event) => {
    setTempContact({ ...tempContact, company_id: event.target.value });
  };

  const handleDepChange = (event) => {
    setTempContact({ ...tempContact, department_id: event.target.value });
  };

  let optionComp;
  optionComp = companies.map(function (comp) {
    return (
      <MenuItem key={`optionsDep_${comp.id}`} value={comp.id}>
        {comp.name}
      </MenuItem>
    );
  });

  let optionDep;
  optionDep = depData.map(function (department) {
    return (
      <MenuItem key={`optionsDep_${department.id}`} value={department.id}>
        {department.name}
      </MenuItem>
    );
  });

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
          <Image
            src="/images/telco.png"
            className={styles.borderRound}
            height={150}
            width={300}
            alt=" "
            priority={true}
          />

          <Typography variant="h5" component="div">
            NEW CONTACT
          </Typography>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Name
            </InputLabel>
            <Input
              type="text"
              value={tempContact.name}
              inputProps={ariaLabel}
              onChange={(e) =>
                setTempContact({ ...tempContact, name: e.target.value })
              }
            />
          </FormControl>

          <br></br>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Company
            </InputLabel>
            <Select
              value={tempContact.department_id}
              onChange={handleCompanyChange}
            >
              {optionComp}
            </Select>
          </FormControl>
          <br></br>

          <br></br>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Departments
            </InputLabel>
            <Select
              value={tempContact.department_id}
              onChange={handleDepChange}
            >
              {optionDep}
            </Select>
          </FormControl>
          <br></br>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Titulo
            </InputLabel>
            <Input
              type="text"
              value={tempContact.title}
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
                createContact();
              }}
            >
              Create
            </Button>
          )}
        </CardActions>

        <div></div>

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
    </div>
  );
};

export default Contact;
