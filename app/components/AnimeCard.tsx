import { Card, CardBody, Image, Heading, Text } from "@chakra-ui/react";

export const AnimeCard = ({ id, coverImage, title, description }: {
    id: string;
    coverImage: {
        large: string;
    };
    title: {
        romaji: string;
        english?: string;
    };
    description?: string;
}) => {
    return (
        <Card key={id} maxW="220px" m={4} textAlign="center" boxShadow="md">
            <CardBody>
                <Image src={coverImage.large} alt={title.romaji} borderRadius="md" mx="auto" mb={2} />
                <Heading as="h3" size="md" mb={2}>
                    {title.english || title.romaji}
                </Heading>
                <Text fontSize="sm">
                    {description ? description.slice(0, 100) + "..." : "No description available."}
                </Text>
            </CardBody>
        </Card>
    );
}
