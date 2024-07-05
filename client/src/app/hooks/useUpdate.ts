import { useEffect, useRef } from 'react';

const useUpdate = (effect: any, dependencies: any) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return effect();
  }, dependencies);
};

export default useUpdate;