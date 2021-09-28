import { useEffect, useState } from 'react';
import ConfettiExplosion from '@reonomy/react-confetti-explosion';
import styled from 'styled-components';
import { sleep } from '../../utils';

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

export default function Confetti() {
  const [exploding, setExploding] = useState(true);

  useEffect(() => {
    async function explode() {
      await sleep(3000);
      setExploding(false);
    }

    explode();
  }, []);

  return exploding ? (
    <Container>
      <ConfettiExplosion
        force={0.7}
        duration={3000}
        particleCount={250}
        floorWidth={windowWidth}
        floorHeight={windowHeight}
      />
    </Container>
  ) : null;
}

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  top: 20%;
  left: 50%;
  width: 0;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
`;
