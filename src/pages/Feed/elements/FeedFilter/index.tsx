import { ChangeEvent, memo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { Checkbox, Fieldset, Collapse, Button, Card, Group, Text, Stack } from "@mantine/core";
import TextInput from "@/primitives/TextInput";
import {
  toggleOpened,
  setName,
  setIsHazardous,
  setIsSentryObject,
} from "@/reducers/feed/feedFilter";

function FeedFilter() {
  const state = useAppSelector((state) => state.feedFilter);
  const dispatch = useAppDispatch();

  return (
    <Stack>
      <Card withBorder>
        <Group justify="space-between">
          <Text>Настроить feed</Text>
          <Button onClick={() => dispatch(toggleOpened())}>Toggle</Button>
        </Group>
        <Collapse in={state.isOpened} mt="md">
          <Fieldset radius={6}>
            <TextInput
              label={"Название"}
              value={state.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setName(e.target.value))}
              onClear={() => dispatch(setName(""))}
            />
            <Checkbox
              checked={state.isHazardous || false}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch(setIsHazardous(e.target.checked))
              }
              mt="md"
              label="Потенциально опасен"
              labelPosition="left"
            />
            <Checkbox
              checked={state.isSentryObject || false}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch(setIsSentryObject(e.target.checked))
              }
              mt="md"
              label="Объект Sentry"
              labelPosition="left"
            />
          </Fieldset>
        </Collapse>
      </Card>
    </Stack>
  );
}

export default memo(FeedFilter);
