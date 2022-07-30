import Link from "next/link";
import AnotationCard from "../components/AnotationCard";

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
            <div className="tutorial">
                <svg xmlns="http://www.w3.org/2000/svg" className="landingsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
                <div className="landingtext">Como funciona?</div>
                <div className="landingtext minor">Após criar sua conta, você terá acesso ao site, onde
                poderá fazer anotações. Elas incluem notas, listas, links e grupos,com o objetivo de
                ajudar na sua organização pessoal.
                </div>
                <div className="landinggrid">
                    <AnotationCard anotation='Notas' description='As notas são a forma mais comum de anotação, '></AnotationCard>
                    <AnotationCard anotation='Listas' description=''></AnotationCard>
                    <AnotationCard anotation='Links' description=''></AnotationCard>
                    <AnotationCard anotation='Grupos' description=''></AnotationCard>
                </div>
                <div className="landingtext minor">Os seus dados ficarão salvos na sua conta para que você possa acessar com qualquer dispositivo
                que esteja logado em sua conta. 
                </div>
                <div className="landingtext minor">Este site foi desenvolvido com Next.js e Supabase</div>
                <div className="landingtext minor">Meu github</div>
            </div>
        </div>
    );
}

export default Project;