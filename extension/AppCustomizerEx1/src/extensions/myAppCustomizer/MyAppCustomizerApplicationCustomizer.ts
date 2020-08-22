import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'MyAppCustomizerApplicationCustomizerStrings';
import styles from './AppCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

const LOG_SOURCE: string = 'MyAppCustomizerApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IMyAppCustomizerApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class MyAppCustomizerApplicationCustomizer
  extends BaseApplicationCustomizer<IMyAppCustomizerApplicationCustomizerProperties> {

  private _topPlacholder: PlaceholderContent | undefined;
  private _bottomPlacholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlacHolders);

    return Promise.resolve();
  }

  private _renderPlacHolders(): void {

    if (!this._topPlacholder) {
      this._topPlacholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      if (!this._topPlacholder) {
        console.error("This expected placholder (Top) was not found");
        return;
      }

      if (this._topPlacholder.domElement) {
        this._topPlacholder.domElement.innerHTML = `

        <div class="${styles.app}">
        <div class="${styles.top}">
        <div class="${styles.dropdown}">
        <div class="${styles.dropbtn}">Dropdown</div>
        <div class="${styles.dropdowncontent}">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
        </div>
      </div>

        </div>
        </div>
        `;
      }
    }

    if (!this._bottomPlacholder) {
      this._bottomPlacholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );

      if (!this._bottomPlacholder) {
        console.error("This expected placholder (Bottom) was not found");
        return;
      }

      var gaProperty = 'UA-163461330-1';
      var disableStr = 'ga-disable-' + gaProperty;

      if (!this.getCookie(disableStr)) {
        if (this._bottomPlacholder.domElement) {
          this._bottomPlacholder.domElement.innerHTML = `
        <div id="spfxCookieConsent" class="${styles.app}">
            <div class="${styles.bottom}">
              <span id="cookieconsent:desc" class="${styles.ccmessage}">
            We use cookies on this site to enhance your user experience. By continuing to use this site you are giving us your consent to place cookies on your device.
            <a aria-label="learn more about cookies" role="button" tabindex="0" class="${styles.cclink}" href="http://www.jenkinsblogs.com" rel="noopener noreferrer nofollow" target="_blank">Learn more</a></span>

            <div class="${styles.cccompliance}">
            <a aria-label="deny cookies" role="button" tabindex="0" class="${styles.ccbtnd}" onClick="denyCookieSpfx()">Decline</a>
            <a aria-label="allow cookies" role="button" tabindex="0" class="${styles.ccbtna}" onClick="setCookieSpfx()">Allow cookies</a></div>
            </div>
          </div>`;

          document['denyCookieSpfx'] = (e) => {
            document.cookie = disableStr + '=true;expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
            window[disableStr] = true;
            document.getElementById('spfxCookieConsent').style.display = "none";
          };

          document['setCookieSpfx'] = (e) => {
            document.cookie = disableStr + '=false;' + document.cookie;
            window[disableStr] = false;
            document.getElementById('spfxCookieConsent').style.display = "none";
          };
        }
        //  });

      }

    }
  }

  private _onDispose(): void {
    console.log('');
  }

  private getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }

  private getCookievalue(cname) {
    var _returnvalue = 'false';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      var data = c.split('=');
      var _name = data[0];
      var _value = data[1];
      if (_name.trim() == cname) {
        _returnvalue = _value;
      }
    }
    return _returnvalue;
  }
}
