import Link from "next/link";

function Project({setProject, user}) {

    return (
        <div className="landingpage">
            <div className="upperlanding">
                <div className="titulo">nolt</div>
                <div className="subtitle">Um site feito para organizar todos os tipos de anotações pessoais, em qualquer lugar.</div>
                <Link href={user?'/home':'/auth'}>
                    <button className="landingbutton" onClick={() => setProject(false)}>Entrar</button>
                </Link>
            </div>
        </div>
    );
}

export default Project;