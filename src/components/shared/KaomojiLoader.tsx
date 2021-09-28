import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

import { flamingo } from '../colors';

const { Title } = Typography;

const kaomojis = [
  '(* ^ ω ^)',
  '( ´ ω ` )ノﾞ',
  '(☆▽☆)',
  '(„• ᴗ •„)',
  '(ﾉ◕ヮ◕)ﾉ*',
  '(─‿‿─)',
  '(´｡• ᵕ •｡`)',
  'ヽ(*・ω・)ﾉ',
  '(o･ω･o)',
  '(⌒ω⌒)',
  '(*≧ω≦*)',
];

interface IProps {
  message?: React.ReactNode;
}

export default function KaomojiLoader({ message }: IProps) {
  const [counter, setCounter] = useState(0);
  const [kaomoji, setKaomoji] = useState(kaomojis[0]);

  useEffect(() => {
    let i = 0;
    let interval = setInterval(() => {
      setCounter(i++);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (counter % 4 === 0) {
      setKaomoji(kaomojis[randomIndex(kaomojis.length)]);
    }
  }, [counter]);

  return (
    <Container>
      <Row>
        <Kaomoji>
          <Title className="red">{kaomoji}</Title>
        </Kaomoji>
        <Dots>
          <Title className="red">{'・'.repeat(counter % 4)}</Title>
        </Dots>
      </Row>
      <Row>
        <span className="message">{message}</span>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .red {
    color: ${flamingo};
    font-size: 60px;
  }

  .message {
    font-weight: bold;
    color: ${flamingo};
    font-size: 30px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Kaomoji = styled.div`
  width: 300px;
  text-align: center;
`;

const Dots = styled.div`
  width: 100px;
`;

function randomIndex(length: number): number {
  return Math.ceil(Math.random() * length) - 1;
}
