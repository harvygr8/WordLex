import { Badge, Card,Group,Stack, Text, Title } from "@mantine/core";
import {WordData,SoundLikeData,SpellLikeData} from '.././types.ts';
import { useMediaQuery } from "@mantine/hooks";


type Props = WordData | SoundLikeData | SpellLikeData;

//@ts-ignore
const InfoCard = ({ word, score, tags, numSyllables }: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Card withBorder shadow="sm" style={{ width: isMobile?'150px':'200px', height: isMobile?'130px':'160px' }}>
      <Stack gap="xl">
        <Stack gap="xl" justify="space-between">
          <Title order={isMobile?5:2} style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>{word}</Title>
          {/* {score &&<Text>{score}</Text>} */}
          {numSyllables && <Text>{numSyllables} syllable(s)</Text>}
        </Stack>
        {tags && (
          <Group gap="sm">
            {tags.map((tag:string, index:string | number) => (
              <Badge
                key={index}
                size="xs"
                variant="gradient"
                gradient={{ from: 'blue', to: 'indigo', deg: 90 }}
              >
                {tag}
              </Badge>
            ))}
          </Group>
        )}
      </Stack>
    </Card>
  );
};

export default InfoCard;