import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';


export interface GithubAccessTokenEmailProps {
  username?: string;
  verifytoken?:string
}


export const GithubAccessTokenEmail = ({
  verifytoken,
  username
}: GithubAccessTokenEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>
        A fine-grained personal access token has been added to your account
      </Preview>
      <Container style={container}>
        

        <Text style={title}>
          <strong>@{username}</strong>, a personal access was created on your
          account.
        </Text>

        <Section style={section}>
          <Text style={text}>
            Hey <strong>{username}</strong>!
          </Text>
          <Text style={text}>
            A fine-grained personal access token was
            recently added to your account.
          </Text>

          <Text style={button}>{verifytoken}</Text>
        </Section>

        <Text style={footer}>
          murtazadev, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
        </Text>
      </Container>
    </Body>
  </Html>
);


export default GithubAccessTokenEmail;

const main = {
  backgroundColor: '#ffffff',
  color: '#24292e',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: '480px',
  margin: '0 auto',
  padding: '20px 0 48px',
};

const title = {
  fontSize: '24px',
  lineHeight: 1.25,
};

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  textAlign: 'center' as const,
};

const text = {
  margin: '0 0 10px 0',
  textAlign: 'left' as const,
};

const button = {
  fontSize: '14px',
  backgroundColor: '#28a745',
  color: '#fff',
  lineHeight: 1.5,
  borderRadius: '0.5em',
  padding: '12px 24px',
};

const footer = {
  color: '#6a737d',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '60px',
};
