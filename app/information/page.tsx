"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Flex, Button } from "@chakra-ui/react";
import { GET_ANIME_LIST_QUERY } from "../graphql/getAnimeList";
import { AnimeCard } from "../components/AnimeCard";

const PER_PAGE = 5;

const Information = () => {
    const [page, setPage] = useState(1);
    const { data, loading, error, } = useQuery(GET_ANIME_LIST_QUERY, {
        variables: { page, perPage: PER_PAGE },
    });

    const media = data?.Page?.media ?? [];
    const pageInfo = data?.Page?.pageInfo;

    return (
        <Flex flex="1" alignItems="center" justifyContent="center" flexDirection="column" p={4}>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {
                !loading && (media && media.length === 0) ? (
                    <div>No anime found.</div>
                ) : (
                    <Flex wrap="wrap" justifyContent="center" gap={4}>
                        {media.map((anime: any) => (
                            <AnimeCard
                                key={anime.id}
                                id={anime.id}
                                coverImage={anime.coverImage}
                                title={anime.title}
                                description={anime.description}
                            />
                        ))}

                    </Flex>
                )
            }
            {
                pageInfo && (
                    <Flex>
                        <Button
                            onClick={() => setPage(page - 1)}
                            disabled={page <= 1}
                        >
                            Previous
                        </Button>
                        <span style={{ margin: "0 8px" }}>
                            Page {page} of {pageInfo.lastPage}
                        </span>
                        <Button
                            onClick={() => setPage(page + 1)}
                            disabled={!pageInfo.hasNextPage}
                        >
                            Next
                        </Button>
                    </Flex>
                )
            }


        </Flex>
    );
}

export default Information;