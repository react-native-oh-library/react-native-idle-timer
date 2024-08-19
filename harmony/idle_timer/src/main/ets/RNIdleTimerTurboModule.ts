/**
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from '@rnoh/react-native-openharmony/generated/ts';
import window from '@ohos.window';
import common from '@ohos.app.ability.common';
import Logger from './Logger';

export class RNIdleTimerTurboModule extends TurboModule implements TM.IdleTimerNativeModule.Spec {
  private tags: Set<string> = new Set<string>();
  constructor(ctx) {
    super(ctx);
  }

  setIdleTimerDisabled(disabled: boolean, tag?: string): void {
    const context = this.ctx.uiAbilityContext;
      if(context) {
        if (disabled) {
          this.activate(context, tag);
        } else {
          this.deactivate(context, tag);
        }
      }
  }

   async activate(context: common.UIAbilityContext, tag?: string): Promise<void> {
    const checkFlag = this.tags.size === 0;
    this.tags.add(tag || "");
    if (checkFlag) {
      try {
        const win = await window.getLastWindow(context);
        if (win) {
          await win.setWindowKeepScreenOn(true);
          Logger.info('Screen will stay on');
        }
      } catch (error) {
        Logger.error('Failed to keep screen on :', error);
      }
    }
  }

   async deactivate(context: common.UIAbilityContext, tag?: string): Promise<void> {
    const checkFlag = this.tags.size === 1 && this.tags.has(tag || "");
    this.tags.delete(tag || "");
     if (checkFlag) {
      try {
        const win = await window.getLastWindow(context);
        if (win) {
          await win.setWindowKeepScreenOn(false);
          Logger.info('Screen will not stay on');
        }
      } catch (error) {
        Logger.error('Failed to stop keeping screen on: ', error);
      }
    }
  }

}