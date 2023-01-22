import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { NoticeCard } from '../../../components/molecules/mdx/noticeCard';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'NoticeCard',
  component: NoticeCard
} as ComponentMeta<typeof NoticeCard>;

const Template: ComponentStory<typeof NoticeCard> = (args) => <NoticeCard {...args} />;

export const Default: ComponentStory<typeof NoticeCard> = Template.bind({});
Default.args = {
  title: 'Notification',
  className: '',
  color: 'blue', // Mantine Color
  children: <p>Notification message</p>
};
Default.storyName;

export const Success: ComponentStory<typeof NoticeCard> = Template.bind({});
Success.args = {
  title: 'Notification',
  className: 'success',
  children: <p>Success message</p>
};
Success.storyName;

export const Warning: ComponentStory<typeof NoticeCard> = Template.bind({});
Warning.args = {
  title: 'Notification',
  className: 'warning',
  children: <p>Warning message</p>
};
Warning.storyName;

export const Error: ComponentStory<typeof NoticeCard> = Template.bind({});
Error.args = {
  title: 'Notification',
  className: 'error',
  children: <p>Error message</p>
};
Error.storyName;
