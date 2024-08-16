import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    setIdleTimerDisabled: (disabled: boolean, tag?: string)=>void;
}

export default TurboModuleRegistry.get<Spec>('IdleTimerNativeModule') as Spec | null;