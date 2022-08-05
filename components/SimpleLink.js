function SimpleLink({href, name}) {
    return (
        <div className='littlelink wholeborder'>
            <img className='linkimage' src={`http://www.google.com/s2/favicons?sz=32&domain_url=${href}`} />
            <a className='linktext' href={href} target='_blank' rel='noreferrer'>{name}</a>
        </div>
    );
}

export default SimpleLink;