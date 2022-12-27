import { Group, MediaQuery, createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

const useStyles = createStyles((theme) => ({
  iframe: {
    width: 500,
    [theme.fn.smallerThan('xs')]: {
      width: 375
    }
  }
}));

export const ContactForm: FC = () => {
  const router = useRouter();
  const { classes } = useStyles();
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  const redirect = () => {
    if (isFirstVisit) {
      setIsFirstVisit(false);
      return;
    }

    router.push({
      pathname: '/contact'
    });
  };

  return (
    <Group>
      <MediaQuery
        query='(max-width: 500px) and (min-width: 375)'
        styles={() => ({
          '> div:width': 450
        })}
      >
        <iframe
          className={classes.iframe}
          frameBorder='0'
          height={1200}
          onLoad={redirect}
          src='https://docs.google.com/forms/d/e/1FAIpQLSedEnTFW6g7W-gP6chg3A7UuB6USb3HjeTT8sJTKGYiQbpBjA/viewform?usp=sf_link'
          title='apply'
        >
          読み込んでいます…
        </iframe>
      </MediaQuery>
    </Group>
  );
};
