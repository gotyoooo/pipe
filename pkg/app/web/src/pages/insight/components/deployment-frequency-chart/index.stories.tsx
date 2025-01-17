import { Box } from "@material-ui/core";
import { Story } from "@storybook/react";
import { DeploymentFrequencyChart, DeploymentFrequencyChartProps } from "./";

export default {
  title: "insights/DeploymentFrequencyChart",
  component: DeploymentFrequencyChart,
};

const randData = Array.from(new Array(20)).map((_, v) => ({
  value: Math.floor(Math.random() * 20 + 10),
  timestamp: new Date(`2020/10/${v + 5}`).getTime(),
}));

const Template: Story<DeploymentFrequencyChartProps> = (args) => (
  <Box width={800}>
    <DeploymentFrequencyChart data={args.data} />
  </Box>
);
export const Overview = Template.bind({});
Overview.args = {
  data: [{ name: "Total Deployments", points: randData }],
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
};
