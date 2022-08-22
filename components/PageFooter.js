import Link from "next/link";

function PageFooter({setProject, changeCurrentPage}) {
    return (
        <div className='foot'>
            <div>Desenvolvido por Schaldach</div>
            <Link href='/'><div className="footerlink" onClick={() => {setProject(true);changeCurrentPage('home')}}>Ir à Página inicial</div></Link>
        </div>
    )
}

export default PageFooter;