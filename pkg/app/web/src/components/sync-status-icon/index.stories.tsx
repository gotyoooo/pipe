import { Story } from "@storybook/react";
import { ApplicationSyncStatus } from "~/modules/applications";
import { SyncStatusIcon, SyncStatusIconProps } from "./";

export default {
  title: "APPLICATION/SyncStatusIcon",
  component: SyncStatusIcon,
};

const Template: Story<SyncStatusIconProps> = (args) => (
  <SyncStatusIcon {...args} />
);

export const Unknown = Template.bind({});
Unknown.args = {
  status: ApplicationSyncStatus.UNKNOWN,
};

export const Synced = Template.bind({});
Synced.args = {
  status: ApplicationSyncStatus.SYNCED,
};

export const Deploying = Template.bind({});
Deploying.args = {
  status: ApplicationSyncStatus.DEPLOYING,
};

export const OutOfSync = Template.bind({});
OutOfSync.args = {
  status: ApplicationSyncStatus.OUT_OF_SYNC,
};
