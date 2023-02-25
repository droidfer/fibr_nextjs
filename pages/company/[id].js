import { useState } from "react";
import Link from 'next/link';


export async function getStaticPaths() {
    const apiCompanies = 'http://localhost:3000/v1/companies';
    const res = await fetch(apiCompanies);
    const data = await res.json();

    const paths = data.map(comp => {
        return {
            params: {id: comp.id.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;
    const apiCompanies = 'http://localhost:3000/v1/companies/' + id

    const response = await fetch(apiCompanies)
    const data = await response.json()
    return { props: {data} }
  }

const Company = ({data})=> {
    const [name, setName] = useState('')

    return(
    <div>
        <h1>{data.name}</h1>
        <p>{data.legal_name}</p>
        <p>{data.description}</p>
        <p>{data.ruc}</p>
        <Link href={'/company/edit/' + data.id} key='edit_company'>...edit</Link>
        <br></br>
        <Link href="/company/companies" key='back_company'>...back</Link>       
    </div>
    );
}

export default Company;