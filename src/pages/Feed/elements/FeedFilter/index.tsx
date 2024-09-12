import { ChangeEvent, memo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { Stack, Button, Typography, FormGroup, Box, Collapse } from "@mui/material";
import TextInput from "@/primitives/TextInput";
import {
  toggleOpened,
  setName,
  setIsHazardous,
  setIsSentryObject,
} from "@/reducers/feed/feedFilter";

import Spacing from "@/primitives/Spacing";
import Checkbox from "@/primitives/Checkbox";
import Card from "@/primitives/Card";

import { flexSpaceBetween, fullWidth } from "@/theme/commonStyles";

const FeedFilter = () => {
  const state = useAppSelector((state) => state.feedFilter);
  const dispatch = useAppDispatch();

  return (
    <Stack>
      <Card>
        <Box sx={flexSpaceBetween}>
          <Typography>Настроить feed</Typography>
          <Button onClick={() => dispatch(toggleOpened())}>Toggle</Button>
        </Box>
        <Collapse in={state.isOpened}>
          <Spacing v={1} />
          <TextInput
            sx={fullWidth}
            size="small"
            label="Название"
            value={state.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setName(e.target.value))}
            onClear={() => dispatch(setName(""))}
          />
          <Spacing v={1} />
          <FormGroup>
            <Checkbox
              label="Потенциально опасен"
              checked={state.isHazardous || false}
              onChange={(value: boolean) => dispatch(setIsHazardous(value))}
            />
            <Checkbox
              label="Объект Sentry"
              checked={state.isSentryObject || false}
              onChange={(value: boolean) => dispatch(setIsSentryObject(value))}
            />
          </FormGroup>
        </Collapse>
      </Card>
    </Stack>
  );
};

export default memo(FeedFilter);
