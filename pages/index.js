import Link from "next/link";
import { useState } from 'react'
import NoteSvg from "../public/svgs/notesvg";
import ListSvg from "../public/svgs/listsvg";
import GroupSvg from "../public/svgs/groupsvg";
import ImageSvg from "../public/svgs/imagesvg";
import LinkSvg from "../public/svgs/linksvg";

function Project({ setProject, user }) {
    const [currentImage, changeImage] = useState(0)
    const allAnotations = [
        {
            title: 'Notas',
            description: 'As notas são a forma mais comum de anotação, e você pode optar por colocar uma data para elas.',
            image: <NoteSvg/>
        },
        {
            title: 'Listas',
            description: 'As listas são compostas por vários itens, e cada um pode ser marcado por completo ou incompleto.',
            image: <ListSvg/>
        },
        {
            title: 'Links',
            description: 'Os links são anotações simples, que possuem um título e um URL para o qual eles redirecionam quando clicados.',
            image: <LinkSvg/>
        },
        {
            title: 'Fotos',
            description: 'As fotos permitem que você faça o upload de imagens, para uma forma mais rápida de visuzalização.',
            image: <ImageSvg/>
        },
        {
            title: 'Grupos',
            description: 'Os grupos são coleções de notas, listas, links e imagens, para categorizar e organizar suas anotações.',
            image: <GroupSvg/>
        }
    ]
    return (
        <div className="landingpage">
            <div className="landingnavbar">
                <a className="titulo">nolt</a>
                <a className="landinglink" href="#overview">Como funciona?</a>
                <a className="landinglink" href="#features">Principais features</a>
                <a className="landinglink" href="mailto:gabimorgado0311@gmail.com" target='_blank' rel="noreferrer">Contato</a>
            </div>
            <div className="upperlanding">
                <div className="titulo">nolt</div>
                <div className="subtitle">O site para você organizar suas anotações pessoais, em qualquer lugar.</div>
                <div className="landingbuttons">
                    <Link href={user ? '/home' : '/auth'}>
                        <button className="landingbutton" onClick={() => setProject(false)}>Entrar</button>
                    </Link>
                    <button className="landingbutton otherbutton">Saiba Mais
                        <svg xmlns="http://www.w3.org/2000/svg" className="smalllandingsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

            </div>
            <div className="tutorial whitetutorial cardtutorial">
                <a className="landingtext secondlandingtitle" id="overview">Como funciona?</a>
                <div className="landingtext secondminor">Após criar sua conta, você terá acesso ao Nolt, onde poderá fazer diferentes tipos de anotações para ajudar a organizar o seu dia-a-dia. Confira os diferentes tipos de anotações:</div>
                <div className="pannel">
                    <div className='left-arrow' onClick={() => { if (currentImage > 0) { changeImage(currentImage - 1) } else { changeImage(4) } }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg></div>
                    <div className='right-arrow' onClick={() => { if (currentImage < 4) { changeImage(currentImage + 1) } else { changeImage(0) } }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></div>
                    {allAnotations.map((anotation, index) =>
                        <div className="innerpannel" style={{display:currentImage===index?'grid':'none'}}>
                            <div className="anotation-image">{anotation.image}</div>
                            <div className="anotation-name">{anotation.title}</div>
                            <div className="anotation-description">{anotation.description}</div>
                        </div>
                    )
                    }
                    <div className="image-circles">
                        {allAnotations.map((anotation, index) => <div onClick={() => changeImage(index)} className={currentImage === index ? 'filled' : ''} />)}
                    </div>
                </div>
            </div>
            <div className="tutorial whitetutorial">
                <a id="features" className="landingtext blacktext secondlandingtitle">Principais features</a>
                <div className="featuresshowcase">
                    <div className="landingflex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="landingsvg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <div className="cardanotation">Usuário</div>
                        <div className="landingtext minor blacktext">Os seus dados ficarão salvos na sua conta para que você possa acessá-los em qualquer dispositivo
                            que também esteja logado.
                        </div>
                    </div>
                    <div className="landingflex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="landingsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div className="cardanotation">Responsividade</div>
                        <div className="landingtext minor blacktext">Ele é totalmente compatível tanto com computadores quanto celulares &#40;responsivo&#41;
                            para aumentar a flexibilidade de acesso.
                        </div>
                    </div>
                    <div className="landingflex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="landingsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <div className="cardanotation">Privacidade</div>
                        <div className="landingtext minor blacktext">A política de Row Level Security provida pela Supabase
                            fornece privacidade e segurança para os seus dados.
                        </div>
                    </div>
                    <div className="landingflex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="landingsvg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                        <div className="cardanotation">Sincronização</div>
                        <div className="landingtext minor blacktext">O salvamento automático faz com que você não precise se preocupar
                            com alterações não salvas ou carregamentos longos.
                        </div>
                    </div>
                    <div className="landingflex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="landingsvg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                        <div className="cardanotation">Velocidade</div>
                        <div className="landingtext minor blacktext">O React com o Next.js introduz uma navegação quase instantânea e permite
                            que você use seu tempo com o que importa.
                        </div>
                    </div>
                    <div className="landingflex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="landingsvg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                        <div className="cardanotation">Organização</div>
                        <div className="landingtext minor blacktext">Personalize as principais anotações através dos favoritos e grupos, para deixar em destaque
                            somente aquelas que você precisa.
                        </div>
                    </div>
                </div>
            </div>
            <div className="landingfooter">
                <div className="landingtext minor">Desenvolvido com&#160;
                    <span><a className="blacklink" href="https://nextjs.org/" target='_blank' rel='noreferrer'>Next.js</a></span>&#160;e&#160;<span><a className="greenlink" href="https://supabase.com/" target='_blank' rel='noreferrer'>Supabase</a></span>
                    &#160;por <span><a className="purplelink" href="https://portfolio-schaldach.vercel.app/" target='_blank' rel='noreferrer'>Gabriel Schaldach Morgado</a></span></div>
            </div>
        </div>
    );
}

export default Project;