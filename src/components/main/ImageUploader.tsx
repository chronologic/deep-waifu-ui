import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Typography, Upload, Modal, Button } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import Cropper from 'react-easy-crop';

import { fileToDataUrl, srcToFile } from '../../utils';
import getCroppedImg from './cropImage';

const { Dragger } = Upload;
const { Title } = Typography;

interface IProps {
  onUploadDone: (selfie: File) => void;
}

export default function ImageUploader({ onUploadDone }: IProps) {
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
      <Button onClick={handleCancel}>Cancel</Button>
      <Button type="primary" className="crop" onClick={handleSubmit}>
        Crop
      </Button>
    </Footer>
  );

  return (
    <>
      <Dragger
        name="selfie"
        accept="image/*"
        action=""
        multiple={false}
        showUploadList={false}
        customRequest={handleCustomRequest as any}
      >
        <p className="ant-upload-drag-icon">
          <CloudUploadOutlined />
        </p>
        <Title className="titleRed">(=^･ω･^=)</Title>
        <Title>Upload a Selfie Here</Title>
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
`;
