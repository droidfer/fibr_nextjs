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
    const apiCompanies = `http://localhost:3000/v1/companies/${id}`

    const response = await fetch(apiCompanies)
    const data = await response.json()
    return { props: {data} }
  }

const Company = ({data})=> {
    const [company, setCompany] = useState({name: null})

    const updateName = async (companyId) => {
        const apiCompanies = `http://localhost:3000/v1/companies/${companyId}` 
    
        const response = await fetch(apiCompanies , {
            method: 'PUT',
            body: JSON.stringify({company}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const jsonResponse = await response.json()
        console.log(jsonResponse)
    } 

    return(
    <div>
        <h1>{data.name}</h1>
        <p>{data.legal_name}</p>
        <p>{data.description}</p>
        <p>{data.ruc}</p>
        <div>
            <input
            type='text'
            value={company.name}
            onChange={(e)=>setCompany({name: e.target.value})}
            />
            <button onClick={() => updateName(data.id)}>Update</button>
        </div>

        <Link href={`/company/${data.id}`} key='edit_company'>...back</Link>
    </div>
    );
}

export default Company;