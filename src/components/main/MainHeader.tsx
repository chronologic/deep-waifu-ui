import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Layout, Image } from 'antd';
import { useHistory } from 'react-router-dom';

import { usePaymentContract, useWaifu } from '../../hooks';
import { flamingo } from '../colors';
import { AppHeader } from '../shared';
import ImageUploader from './ImageUploader';
import SoldOut from './SoldOut';

const { Content } = Layout;

export default function MainHeader() {
  const history = useHistory();
  const { onUpdateState } = useWaifu();
  const { fetchState } = usePaymentContract();
  const [ready, setReady] = useState(false);
  const [soldOut, setSoldOut] = useState(false);

  const handleSelfieUploadDone = useCallback(
    async (selfie: File) => {
      onUpdateState(
        {
          selfie,
        },
        true
      );
      history.push('/mint');
    },
    [history, onUpdateState]
  );

  useEffect(() => {
    async function init() {
      const state = await fetchState();
      setReady(true);
      if (state.count >= state.maxCount) {
        setSoldOut(true);
      }
    }

    init();
  }, [fetchState]);

  return (
    <Layout>
      <AppHeader />
      <CustomContent>
        <Content>
          <div className="grid-wrapper" id="generator">
            <div className="grid-layout">
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie1.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu1.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie2.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu2.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie3.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu3.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie4.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu4.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie5.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu5.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie6.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu6.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie7.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu7.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie8.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu8.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie9.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu9.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie10.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu10.png'} />
                </div>
              </div>
              <div className="grid-item span-1">
                {soldOut ? <SoldOut /> : <ImageUploader disabled={!ready} onUploadDone={handleSelfieUploadDone} />}
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie11.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu11.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie12.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu12.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie13.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu13.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie14.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu14.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie15.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu15.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie16.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu16.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie17.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu17.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie18.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu18.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie19.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu19.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie20.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu20.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie21.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu21.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie22.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu22.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie23.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu23.png'} />
                </div>
              </div>
              <div className="grid-item span-2">
                <div className="selfie">
                  <Image width={160} preview={false} src={'../img/selfie/selfie24.jpg'} />
                </div>
                <div className="waifu">
                  <Image width={160} preview={false} src={'../img/waifu/waifu24.png'} />
                </div>
              </div>
            </div>
          </div>
        </Content>
      </CustomContent>
    </Layout>
  );
}

const CustomContent = styled.div`
  .ant-layout-content {
    max-width: 1280px;
    margin: 8em auto 0 auto;
  }
  .titleRed {
    color: ${flamingo};
  }
  .grid-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .grid-layout {
    flex-grow: 0;
    flex-shrink: 0;
    display: grid;
    width: 1280px;
    grid-template-columns: repeat(auto-fill, minmax(8em, auto));
    grid-auto-rows: minmax(8em, auto);
    grid-gap: 0px;
  }
  .span-1 {
    grid-column-end: span 8;
    grid-row-end: span 4;
    margin: 2em;
  }
  .span-2 {
    grid-column-end: span 2;
    grid-row-end: span 2;
    height: 160px;
  }
  .selfie,
  .waifu {
    position: absolute;
    transition: 0.5s;
  }

  .waifu:hover {
    opacity: 0;
  }
`;
