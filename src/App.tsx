import {
  AppShell,
  Title,
  useMantineTheme,
  Flex,
  Loader,
  Center,
  Group,
  Box,
  Text,
  Stack,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import InfoCard from "./components/InfoCard";
import InputBar from "./components/InputBar";
import useStore from "./store";
import {
  WordData,
  SoundLikeData,
  SpellLikeData,
  DictionaryData,
} from "./types";
import { FaBook } from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import DictCard from "./components/DictCard";

function App() {
  const theme = useMantineTheme();
  const words = useStore((state) => state.words);
  const dictionaryData = useStore((state) => state.dictionaryData);
  const isLoading = useStore((state) => state.isLoading);
  const endpoint = useStore((state) => state.endpoint);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
          gap={"xs"}
          pb={isMobile ? "12px" : "0px"}
        >
          <Group gap={"xs"} align="center" justify="center">
            <FaBook size={"28px"} style={{ color: theme.colors.blue[7] }} />
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
          <Flex gap="xl" justify="center" direction="row" wrap="wrap">
            {endpoint === "dict" ? (
              dictionaryData.length === 0 ? (
                <Center h={"85vh"}>
                  <Stack align="center">
                    <HiOutlineEmojiHappy size="48px" />
                    <Text size="xl">
                      Looks empty, try searching for a word.
                    </Text>
                  </Stack>
                </Center>
              ) : (
                  <Flex
                    pt={isMobile ? "12vh" : "0px"}
                    h={isMobile?'0vh':'85vh'}
                    gap="xl"
                    justify='center'
                    align={'center'}
                    direction={isMobile?"row":"row"}
                    wrap="wrap"
                  >
                    {
                    dictionaryData.map((data, index) => (
                      <DictCard key={index} {...data} />
                    ))
                    }
                  </Flex>
              )
            ) : words.length === 0 ? (
              <Center h={"85vh"}>
                <Stack align="center">
                  <HiOutlineEmojiHappy size="48px" />
                  <Text size="xl">Looks empty, try searching for a word.</Text>
                </Stack>
              </Center>
            ) : (
              <Flex
                gap="xl"
                justify="center"
                direction="row"
                wrap="wrap"
                mt={isMobile ? "82px" : "0px"}
              >
                {words.map((wordData) => (
                  <InfoCard
                    key={wordData.word}
                    {...(wordData as WordData | SoundLikeData | SpellLikeData)}
                  />
                ))}
              </Flex>
            )}
          </Flex>
        )}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
