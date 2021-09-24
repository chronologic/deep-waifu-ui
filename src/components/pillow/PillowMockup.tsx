import styled from 'styled-components';
import { Image } from 'antd';

import { useWaifu } from '../../hooks';

export default function PillowMockup() {
  const { state } = useWaifu();

  return (
    <Container>
      <PillowBase>
        <Image width={180} preview={false} src={'../img/pillow-base.png'} />
      </PillowBase>
      <PillowImage>
        <Image width={180} preview={false} src={state.waifuDataUrl || state.selfieDataUrl} />
      </PillowImage>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
`;

const PillowBase = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;

const PillowImage = styled.div`
  position: absolute;
  top: -3px;
  left: 0;
  mix-blend-mode: multiply;

  mask-image: url('../img/pillow-mask.png');
  mask-size: 180px;
  mask-repeat: no-repeat;
  mask-position: center;
`;
