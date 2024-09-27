import type { Meta, StoryObj } from "@storybook/react";
import AstroObjectCard from "@/pages/Feed/elements/AstroObjectCard";

const meta = {
  title: "Feed/AstroObjectCard",
  component: AstroObjectCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AstroObjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      links: {
        self: "http://api.nasa.gov/neo/rest/v1/neo/2215757?api_key=DEMO_KEY",
      },
      id: "2215757",
      neoReferenceId: "2215757",
      name: "215757 (2004 FU64)",
      nasaJplUrl: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=2215757",
      absoluteMagnitudeH: 17.93,
      estimatedDiameter: {
        kilometers: {
          diameterMin: 0.6895328745,
          diameterMax: 1.54184238,
        },
        meters: {
          diameterMin: 689.5328744512,
          diameterMax: 1541.8423799937,
        },
        miles: {
          diameterMin: 0.4284557317,
          diameterMax: 0.9580561415,
        },
        feet: {
          diameterMin: 2262.2470358144,
          diameterMax: 5058.5381539784,
        },
      },
      isPotentiallyHazardous: false,
      closeApproachData: [
        {
          closeApproachDate: "2024-09-20",
          closeApproachDateFull: "2024-Sep-20 09:01",
          epochDateCloseApproach: 1726822860000,
          relativeVelocity: {
            kilometersPerSecond: "17.6927475589",
            kilometersPerHour: "63693.8912118974",
            milesPerHour: "39576.9070144148",
          },
          missDistance: {
            astronomical: "0.4705798403",
            lunar: "183.0555578767",
            kilometers: "70397741.773820161",
            miles: "43743128.3424377818",
          },
          orbitingBody: "Earth",
        },
      ],
      isSentryObject: false,
    },
  },
};
