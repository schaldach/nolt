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
                poderá fazer anotações.<br/> Elas incluem notas, listas, links e grupos, com o objetivo de
                ajudar na sua organização pessoal.
                </div>
                <div className="landinggrid">
                    <AnotationCard anotation='Notas' description='As notas são a forma mais comum de anotação, e você pode optar por colocar uma data para elas.'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='cardsvg' viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                    </AnotationCard>
                    <AnotationCard anotation='Listas' description='As listas são compostas por vários itens, e cada um pode ser marcado por completo ou incompleto.'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='cardsvg' viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                    </AnotationCard>
                    <AnotationCard anotation='Links' description='Os links são anotações simples, que possuem um título e um URL para o qual eles redirecionam quando clicados.'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='cardsvg' viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                    </AnotationCard>
                    <AnotationCard anotation='Grupos' description='Os grupos são coleções de notas, listas e links, que servem para categorizar e organizar melhor as anotações.'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="cardsvg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                        </svg>
                    </AnotationCard>
                </div>
                <div className="upperlanding secondlanding">
                    <svg xmlns="http://www.w3.org/2000/svg" className="landingsvg blacktext" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                    </svg>
                    <div className="landingflex">
                        <div className="landingtext landinghalf minor blacktext">Os seus dados ficarão salvos na sua conta para que você possa acessá-los em qualquer dispositivo
                        que também esteja logado. 
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="landingsvg blacktext" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                    </div>
                    <div className="landingflex">
                        <div className="landingtext landinghalf minor blacktext">Ele é totalmente compatível tanto com computadores quanto celulares &#40;responsivo&#41;
                        para aumentar a flexibilidade de acesso.
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="landingsvg blacktext" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="landingflex">
                        <div className="landingtext landinghalf minor blacktext">Os seus dados estão protegidos com a política de Row Level Security,
                        oferecida pelo Supabase para fornecer privacidade à sua conta pessoal.
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="landingsvg blacktext" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>
                <div className="landingfooter">
                    <div className="landingtext minor">Este site foi desenvolvido com&#160;
                        <span><a className="blacklink" href="https://nextjs.org/" target='_blank' rel='noreferrer'>Next.js</a></span>&#160;e&#160;<span><a className="greenlink" href="https://supabase.com/" target='_blank' rel='noreferrer'>Supabase</a></span>
                        &#160;por <span><a className="purplelink" href="https://github.com/schaldach" target='_blank' rel='noreferrer'>Gabriel Schaldach Morgado</a></span></div>
                </div>
            </div>
        </div>
    );
}

export default Project;