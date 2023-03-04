import { useState, useEffect } from "react";
import Link from 'next/link';

export async function getStaticPaths() {
    const host= process.env.API_PATH
    const apiCompanies = `${host}/v1/companies`;
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
    const host= process.env.API_PATH
    const id = context.params.id;
    const apiCompanies = `${host}/v1/companies/${id}`

    const response = await fetch(apiCompanies)
    const data = await response.json()
    return { props: {data, host} }
  }

const Company = ({data, host})=> {
    const [tempCompany, setTempCompany] = useState({})
    const [company, setCompany] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setCompany(data);
      }, []); 

    const updateName = async (companyId) => {
        const apiCompanies = `${host}/v1/companies/${companyId}` 
    
        const response = await fetch(apiCompanies , {
            method: 'PUT',
            body: JSON.stringify({company: tempCompany}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const jsonResponse = await response.json()
        setCompany(jsonResponse)
        setLoading(false);
    } 

    return(
    <div>
        <h1>{company.name}</h1>
        <p>{company.legal_name}</p>
        <p>{company.description}</p>
        <p>{company.ruc}</p>

        <div>
            <input
            type='text'
            value={tempCompany.name}
            defaultValue={data.name}
            onChange={(e)=>setTempCompany({...tempCompany, name: e.target.value})}
            />
            <input
            type='text'
            value={tempCompany.legal_name}
            defaultValue={data.legal_name}
            onChange={(e)=>setTempCompany({...tempCompany, legal_name: e.target.value})}
            />
            <input
            type='text'
            value={tempCompany.description}
            defaultValue={data.description}
            onChange={(e)=>setTempCompany({...tempCompany, description: e.target.value})}
            />
            <input
            type='text'
            value={tempCompany.ruc}
            defaultValue={data.ruc}
            onChange={(e)=>setTempCompany({...tempCompany, ruc: e.target.value})}
            />
            
            {!loading && <button onClick={() => {
                setLoading(true);
                updateName(data.id);
                }}>Update</button>}
        </div>

        <Link href={`/company/${data.id}`} key='edit_company'>...back</Link>
    </div>
    );
}

export default Company;