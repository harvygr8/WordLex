import {
  AppShell,
  Title,
  useMantineTheme,
  Flex,
  Loader,
  Center,
  Group,
  Text,
  Stack,
  Button,
  Box,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import InfoCard from "./components/InfoCard";
import InputBar from "./components/InputBar";
import useStore from "./store";
import { WordData, SoundLikeData, SpellLikeData } from "./types";
import {
  FaBook,
} from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import DictCard from "./components/DictCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function App() {
  const theme = useMantineTheme();
  const words = useStore((state) => state.words);
  const dictionaryData = useStore((state) => state.dictionaryData);
  const isLoading = useStore((state) => state.isLoading);
  const endpoint = useStore((state) => state.endpoint);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % dictionaryData.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? dictionaryData.length - 1 : prevIndex - 1
    );
  };

  const renderDictionaryData = () => {
    if (dictionaryData.length === 0) {
      return (
        <Center h="85vh">
          <Stack align="center">
            <HiOutlineEmojiHappy size="48px" />
            <Text size="xl">Looks empty, try searching for a word.</Text>
          </Stack>
        </Center>
      );
    }
    return (
      <Box>
        {dictionaryData.length > 1 && !isMobile && (
          <Center h="85vh">
            <Stack align="center">
              <Group mt="xs" gap="xl">
                <Button size="compact-sm" w={"35px"} onClick={handlePrevCard}>
                  <IoIosArrowBack size="26px" />
                </Button>
                <DictCard {...dictionaryData[currentCardIndex]} />
                <Button size="compact-sm" w={"35px"} onClick={handleNextCard}>
                  <IoIosArrowForward size="26px" />
                </Button>
              </Group>
            </Stack>
          </Center>
        )}
        {dictionaryData.length === 1 && !isMobile && (
          <Center h="85vh">
            <Stack align="center">
              <DictCard {...dictionaryData[currentCardIndex]} />
            </Stack>
          </Center>
        )}

        {/* isMobile */}
        {dictionaryData.length > 1 && isMobile && (
          <Center h="75vh">
            <Stack align="center">
              <Stack align="center" gap="md">
                <DictCard {...dictionaryData[currentCardIndex]} />
                <Group mt="xs" gap="sm">
                  <Button size="compact-xs" onClick={handlePrevCard}>
                    <IoIosArrowBack size="20px" />
                  </Button>
                  <Button size="compact-xs" onClick={handleNextCard}>
                    <IoIosArrowForward size="20px" />
                  </Button>
                </Group>
              </Stack>
            </Stack>
          </Center>
        )}
        {dictionaryData.length === 1 && isMobile && (
          <Center h="75vh">
            <Stack align="center">
              <DictCard {...dictionaryData[currentCardIndex]} />
            </Stack>
          </Center>
        )}
      </Box>
    );
  };

  const renderWordsData = () => {
    if (words.length === 0) {
      return (
        <Center h="85vh">
          <Stack align="center">
            <HiOutlineEmojiHappy size="48px" />
            <Text size="xl">Looks empty, try searching for a word.</Text>
          </Stack>
        </Center>
      );
    }
    return (
      <Flex justify="center" gap="xl" direction="row" wrap="wrap">
        {words.map((wordData) => (
          <InfoCard
            key={wordData.word}
            {...(wordData as WordData | SoundLikeData | SpellLikeData)}
          />
        ))}
      </Flex>
    );
  };

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header
        h={isMobile ? "130px" : "60px"}
        style={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
        }}
      >
        <Group
          h="100%"
          px={isMobile ? "xs" : "md"}
          pt={isMobile ? "12px" : "0px"}
          justify={isMobile ? "center" : "space-between"}
          gap="xs"
          pb={isMobile ? "12px" : "0px"}
        >
          <Group gap="xs" align="center" justify="center">
            <FaBook size="28px" style={{ color: theme.colors.blue[7] }} />
            <Title style={{ color: theme.colors.blue[7] }}>WordLex</Title>
          </Group>

          <Group align="center">
            <InputBar />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        {isLoading ? (
          <Center style={{ height: isMobile ? "120vh" : "100vh" }}>
            <Loader size="xl" />
          </Center>
        ) : (
          <Box pt={isMobile ? "10vh" : "0px"}>
            {endpoint === "dict" && renderDictionaryData()}
            {endpoint !== "dict" && renderWordsData()}
          </Box>
        )}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
