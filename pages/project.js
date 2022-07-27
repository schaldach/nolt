import SecondTitle from "../components/SecondTitle";

function Project() {
    return (
        <div>
            <SecondTitle titlecontent='Projeto'/>
            <div className="secondtext">
            Este projeto é baseado em um antigo projeto Lead, e tem como principal objetivo ajudar a 
            organizar todas as notas, listas e links pessoais, trazendo todos estes elementos em um lugar só.<br/><br/> 
            Desta forma, nunca foi tão fácil organizar as pequenas e grandes coisas da sua vida pessoal.<br/><br/>
            Desenvolvido por Gabriel Schaldach Morgado com React.js e Supabase.
            </div>
        </div>
    )
}

export default Project;