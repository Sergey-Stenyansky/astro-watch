import { ChangeEvent, memo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { Stack, Typography, FormGroup, Box, Collapse, IconButton } from "@mui/material";
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
import { useTranslation } from "react-i18next";
import Settings from "@mui/icons-material/Settings";

const FeedFilter = () => {
  const state = useAppSelector((state) => state.feedFilter);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <Stack>
      <Card>
        <Box sx={flexSpaceBetween}>
          <Typography>{t("feed.customize")}</Typography>
          <IconButton onClick={() => dispatch(toggleOpened())}>
            <Settings />
          </IconButton>
        </Box>
        <Collapse in={state.isOpened}>
          <Spacing v={1} />
          <TextInput
            sx={fullWidth}
            size="small"
            label={t("feed.name")}
            value={state.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setName(e.target.value))}
            onClear={() => dispatch(setName(""))}
          />
          <Spacing v={1} />
          <FormGroup>
            <Checkbox
              label={t("feed.astroObjectFields.isPotentiallyHazardous")}
              checked={state.isHazardous || false}
              onChange={(value: boolean) => dispatch(setIsHazardous(value))}
            />
            <Checkbox
              label={t("feed.astroObjectFields.isSentryObject")}
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
