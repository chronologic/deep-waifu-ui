import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Typography, Upload, Modal, Button, Space } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import Cropper from 'react-easy-crop';

import { fileToDataUrl, srcToFile } from '../../utils';
import getCroppedImg from './cropImage';
import { NftCounter } from '../shared';

const { Dragger } = Upload;
const { Title, Text } = Typography;

interface IProps {
  disabled: boolean;
  onUploadDone: (selfie: File) => void;
}

export default function ImageUploader({ disabled, onUploadDone }: IProps) {
  const [dataUrl, setDataUrl] = useState<string>();
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCustomRequest = useCallback(
    async ({ file, onSuccess, onError }: { file: File; onSuccess: Function; onError: Function }) => {
      const du = await fileToDataUrl(file);
      setDataUrl(du);
      setShowCropper(true);
    },
    []
  );

  const handleCancel = useCallback(() => {
    setShowCropper(false);
    setDataUrl('');
  }, []);

  const handleSubmit = useCallback(async () => {
    setShowCropper(false);
    const cropResult = await getCroppedImg(dataUrl, croppedAreaPixels);
    const file = await srcToFile(cropResult.dataUrl, 'selfie.jpg', cropResult.mimeType);
    onUploadDone(file);
    setDataUrl('');
  }, [croppedAreaPixels, dataUrl, onUploadDone]);

  const footer = (
    <Footer>
      <Space direction="vertical" size="middle">
        <Text className="text12">
          For best results, your selfie should be a face-and-shoulders shot, directly facing the camera. Try as many
          images as you wish.
        </Text>
        <div>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" className="crop" onClick={handleSubmit}>
            Crop
          </Button>
        </div>
      </Space>
    </Footer>
  );

  return (
    <>
      <Dragger
        name="selfie"
        accept="image/jpeg,image/png"
        action=""
        multiple={false}
        showUploadList={false}
        customRequest={handleCustomRequest as any}
        disabled={disabled}
      >
        <p className="ant-upload-drag-icon">
          <CloudUploadOutlined />
        </p>
        <Title className="titleRed">(=^･ω･^=)</Title>
        <Title>Upload a Selfie Here</Title>
        <NftCounter />
        <br />
        <br />
        <p>Photos you upload will NOT BE PUBLISHED</p>
      </Dragger>
      <Modal visible={showCropper} destroyOnClose closable={false} width={400} footer={footer}>
        <CropperContainer>
          <Cropper
            image={dataUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            showGrid
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
          />
        </CropperContainer>
      </Modal>
    </>
  );
}

const CropperContainer = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;

  .text12 {
    font-size: 12px;
  }
`;
