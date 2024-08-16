'use strict'

import { NativeModules, TurboModuleRegistry } from 'react-native';

const IdleTimerManager = TurboModuleRegistry ? TurboModuleRegistry.get('IdleTimerNativeModule') : NativeModules.IdleTimerNativeModule;

export default IdleTimerManager;










