import { useEffect, useState } from 'react';
import { Typography } from 'antd';

import { usePaymentContract } from '../../hooks';
import { SECOND_MILLIS } from '../../constants';

const { Text } = Typography;

export default function NftCounter() {
  const { fetchState } = usePaymentContract();
  const [itemsLeft, setItemsLeft] = useState(0);

  useEffect(() => {
    async function refreshCount() {
      const state = await fetchState();
      setItemsLeft(state.maxCount - state.count);
    }

    const intervalId = setInterval(refreshCount, 10 * SECOND_MILLIS);
    refreshCount();

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchState]);

  return (
    <Text className="text14">
      Hurry up, there's only <strong> {itemsLeft} NFTs left to mint!</strong>
    </Text>
  );
}
