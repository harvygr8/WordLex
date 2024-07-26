import {
  Card,
  Stack,
  Title,
  Text,
  Group,
  List,
  Center,
  useMantineTheme,
  Button,
  Box,
  Divider,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { DictionaryData } from "../types";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useState, useRef } from "react";

type DictionaryCardProps = DictionaryData;

const DictCard = ({
  word,
  phonetic,
  phonetics,
  origin,
  meanings,
}: DictionaryCardProps) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    // <Center h={"85vh"}>
      <Card
        withBorder
        shadow="sm"
        radius={"md"}
        style={{ width:isMobile?'370px':'750px', maxHeight: isMobile?'850px':"560px", padding: "16px" }}
      >
        <Stack justify="center" gap="lg">
          <Group justify="space-between">
            <Group gap={"md"}>
              <Title order={1}>{word}</Title>
              {/* <Text>{origin}</Text> */}
              <Text size="lg" style={{ color: theme.colors.blue[7] }}>
                {phonetic}
              </Text>
            </Group>
            <Group>
              <audio id="audio" ref={audioRef}>
                <source src={phonetics[0].audio} type="audio/mpeg" />
              </audio>
              <Button variant="filled" onClick={playAudio}>
                <HiMiniSpeakerWave size={"22px"} />
              </Button>
            </Group>
          </Group>
          <Divider />
          <Box p="sm" style={{ maxHeight: "450px", overflowY: "scroll" }}>
            <Stack gap={"xl"}>
              {meanings.map((meaning, index) => (
                <Stack key={index} gap="md">
                  <Title order={4} style={{ color: theme.colors.blue[7] }}>
                    {meaning.partOfSpeech}
                  </Title>
                  <List>
                    {meaning.definitions.map((definition, defIndex) => (
                      <List.Item key={defIndex}>
                        <Text>{definition.definition}</Text>
                        {definition.example && (
                          <Text>{definition.example}</Text>
                        )}
                      </List.Item>
                    ))}
                  </List>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Card>
    // </Center>
  );
};

export default DictCard;
