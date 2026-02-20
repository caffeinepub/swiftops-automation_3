import { useEffect, useState } from 'react';

interface PerformanceState {
  isLowPerformance: boolean;
  isBatterySaver: boolean;
}

export function usePerformanceDetection(): PerformanceState {
  const [state, setState] = useState<PerformanceState>({
    isLowPerformance: false,
    isBatterySaver: false,
  });

  useEffect(() => {
    // Check hardware concurrency
    const cores = navigator.hardwareConcurrency || 4;
    const isLowPerf = cores < 4;

    setState(prev => ({ ...prev, isLowPerformance: isLowPerf }));

    // Check battery status
    const checkBattery = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          
          const updateBatteryStatus = () => {
            const isSaving = battery.charging === false && battery.level < 0.2;
            setState(prev => ({ ...prev, isBatterySaver: isSaving }));
          };

          updateBatteryStatus();
          
          battery.addEventListener('chargingchange', updateBatteryStatus);
          battery.addEventListener('levelchange', updateBatteryStatus);

          return () => {
            battery.removeEventListener('chargingchange', updateBatteryStatus);
            battery.removeEventListener('levelchange', updateBatteryStatus);
          };
        } catch (error) {
          // Battery API not supported or failed
          console.debug('Battery API not available');
        }
      }
    };

    checkBattery();
  }, []);

  return state;
}
