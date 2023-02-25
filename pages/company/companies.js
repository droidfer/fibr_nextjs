import Link from 'next/link';

export default function companies({data}) {    
    let displayData
    displayData = data.map(function(company) {
        return (
                < div key={`div_${company.id}`}>
                <Link href={`/company/${company.id}`} key={company.id}>
                    {company.name}
                </Link> 
                <br></br>
                </div>
        )
    })

    return (
    <>
        <h1>List of Companies</h1>
        <p>Here should be the list of companies required</p>
        {displayData}
        <Link href="/" key='back_company'>...back</Link>
    </>
    );
  }

  export async function getServerSideProps() {
    const apiCompanies = 'http://localhost:3000/v1/companies'

    const response = await fetch(apiCompanies)
    const data = await response.json()
    return { props: {data} }
  }