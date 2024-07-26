import { Button, Group, Input, Select, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import useStore from ".././store.ts";
import { WordData, EndpointType } from ".././types.ts";
import { useQuery } from "@tanstack/react-query";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useMediaQuery } from "@mantine/hooks";

const fetchData = async (searchQuery: string, endpoint: EndpointType) => {
  let url = `https://api.datamuse.com/words?${endpoint}=${searchQuery}`;
  if (endpoint === "dict") {
    url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  if (endpoint === "ml") {
    return data.map((wordData: WordData) => ({
      ...wordData,
      tags: filterAndExpandTags(wordData.tags),
    }));
  }
  return data;
};

const tagMapping: { [key: string]: string } = {
  n: "Noun",
  v: "Verb",
  adj: "Adjective",
  adv: "Adverb",
  syn: "Synonymous",
};

const filterAndExpandTags = (tags: string[]) => {
  return tags.filter((tag) => tag in tagMapping).map((tag) => tagMapping[tag]);
};

const InputBar = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [value, setValue] = useState("");
  const setWords = useStore((state) => state.setWords);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setDictionaryData = useStore((state) => state.setDictionaryData);
  const endpoint = useStore((state) => state.endpoint);
  const setEndpoint = useStore((state) => state.setEndpoint);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleSearch = async () => {
    if (value.trim() === "") return;
    setIsLoading(true);
    try {
      const data = await refetch();
      if (data.data) {
        if (endpoint === "dict") {
          setDictionaryData(data.data);
        } else {
          setWords(data.data);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndpointChange = (value: string | null) => {
    if (value !== null && ["ml", "sl", "sp", "dict"].includes(value)) {
      setEndpoint(value as EndpointType);
      setWords([]);
      setDictionaryData([]);
    }
  };

  const { refetch } = useQuery({
    queryKey: ["words"],
    queryFn: () => fetchData(value, endpoint),
    enabled: false,
    staleTime: Infinity,
  });

  return (
    <Group gap={isMobile?'xs':'md'}>
      <Select
        placeholder="Select endpoint"
        style={{width:isMobile?'150px':'155px'}}
        value={endpoint}
        onChange={handleEndpointChange}
        data={[
          { value: "dict", label: "Dictionary" },
          { value: "ml", label: "Similar Meaning" },
          { value: "sl", label: "Similar Sound" },
        ]}
      />
      <Input
        placeholder="Enter a word"
        style={{width:isMobile?'120px':'145px'}}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <Button
        variant="filled"
        size={isMobile?'compact-lg':'sm'}
        onClick={handleSearch}
        disabled={useStore.getState().isLoading}
      >
        <FaSearch size={isMobile?'10px':'20px'}/>
      </Button>

      <Button
              onClick={() => toggleColorScheme()}
              size={isMobile?'compact-lg':'sm'}
              style={{
                backgroundColor: theme.colors.blue[7],
                color: "white",
                
              }}
      >
      {colorScheme === 'dark' ? <FaSun size={isMobile?'10px':'20px'} /> : <FaMoon size={isMobile?'10px':'20px'}/>}
      </Button>
    </Group>
  );
};

export default InputBar;
