import React, { Suspense } from 'react';

import {
  Box,
  Flex,
  formatDate,
  Grid,
  Pill,
  Skeleton,
  Text,
} from '@laodeaksarr/design-system';

import Hero from '~/theme/components/Hero';
import Link from '~/theme/components/Link';
import Layout from '~/theme/layout';
import TableOfContent from '~/theme/components/TableOfContent';

import type { Post } from '~/lib/types';

//import { getColor } from '~/lib/getColor';
//import generateSocialImage from '~/lib/OpenGraph';

const BlogLayout = ({
  children,
  post,
}: React.PropsWithChildren<{ post: any }>) => {
  const {
    createdAt,
    updatedAt,
    slug,
    description,
    title,
    readingTime,
    image,
    // tags,
    // url
  } = post;
  const headerProps = {
    title,
    offsetHeight: 256,
    showProgressBarOnMobile: true,
  };

  const [ids, setIds] = React.useState<Array<{ id: string; title: string }>>(
    []
  );

  React.useEffect(() => {
    setTimeout(() => {
      const titles = document.querySelectorAll('h2');
      const idArrays = Array.prototype.slice
        .call(titles)
        .map((title: { id: any; innerText: any }) => ({
          id: title.id,
          title: title.innerText,
        })) as Array<{
        id: string;
        title: string;
      }>;
      setIds(idArrays);
    }, 500);
  }, [slug]);

  /*const socialImage = generateSocialImage({
    title,
    underlayImage: image?.url
  });*/

  // const keywords = tags.join(", ");

  return (
    <Layout
      footer
      header
      // title={title}
      // description={description}
      // date={new Date(date).toISOString()}
      // imageUrl={socialImage}
      // type="article"
      headerProps={headerProps}
    >
      <article className="h-entry">
        <Suspense fallback={false}>
          <Grid columns="small" gapX={4}>
            <Hero>
              <Box
                css={{
                  marginBottom: '24px',
                  fontSize: '$2',
                }}
              >
                <Link href="/" arrow="left" discreet>
                  Home
                </Link>
              </Box>

              <Skeleton visible>
                <Hero.Title className="p-name">{title}</Hero.Title>
              </Skeleton>
              <Hero.Info>
                <Flex mb={3} wrap>
                  <Text
                    as="p"
                    size="1"
                    variant="tertiary"
                    weight="3"
                    css={{ marginBottom: 0 }}
                  >
                    {formatDate(createdAt.toISOString())} / {readingTime} /{' '}
                  </Text>
                </Flex>
                <Flex css={{ marginLeft: '-$2' }}>
                  <Pill variant="info">
                    Last Updated {formatDate(updatedAt.toISOString())}
                  </Pill>
                </Flex>
              </Hero.Info>

              {image && <Hero.Img className="u-photo" src={image} />}
            </Hero>
            <TableOfContent ids={ids} />
            <Skeleton visible>
              <Box
                css={{
                  padding: '20px 0px',
                  gridColumn: '2',
                  color: 'var(--laodeaksar-colors-typeface-secondary)',

                  h3: {
                    marginTop: '2em',
                  },

                  section: {
                    marginTop: '5em',
                  },
                }}
              >
                {children}
              </Box>
            </Skeleton>
          </Grid>
        </Suspense>
      </article>
    </Layout>
  );
};

export default BlogLayout;
