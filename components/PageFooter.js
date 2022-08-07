import Link from "next/link";

function PageFooter({setProject}) {
    return (
        <div className='foot'>
            <div>Desenvolvido por Schaldach</div>
            <Link href='/'><div className="footerlink" onClick={() => setProject(true)}>Ir à Página inicial</div></Link>
        </div>
    )
}

export default PageFooter;