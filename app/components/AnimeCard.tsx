export const AnimeCard = ({ id, coverImage, title, description }: {
    id: number;
    coverImage: { large: string };
    title: { romaji: string; english?: string };
    description?: string;
}) => {
    return (
        <div key={id} style={{ margin: "16px", textAlign: "center" }}>
            <img src={coverImage.large} alt={title.romaji} width={200} />
            <h3>{title.english || title.romaji}</h3>
            <p>{description ? description.slice(0, 100) + "..." : "No description available."}</p>
        </div>
    );
}