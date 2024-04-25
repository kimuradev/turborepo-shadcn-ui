type ArticleProps = {
    anchorId: string,
    title: string
    children?: React.ReactNode;
}

export default function Articles({ title, anchorId, children } : ArticleProps) {
    return (
        <article id={anchorId} className="text-justify mt-4">
            <p className="font-bold mb-2">{title}</p>
            {children}
        </article>
    )
}