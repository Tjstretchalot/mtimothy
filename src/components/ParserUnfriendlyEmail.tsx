import { ReactElement, useEffect } from 'react';
import { useWritableValueWithCallbacks } from '../shared/callbacks/hooks/useWritableValueWithCallbacks';
import { setVWC } from '../shared/callbacks/setVWC';
import { WithVWC } from './WithVWC';
import { LAYOUT } from '../styles/layout';

/**
 * Renders our email address in a way that is annoying for parsers to read, both
 * in the javascript and in the HTML, but easy for humans to read.
 */
export const ParserUnfriendlyEmail = (): ReactElement => {
  const partsVWC = useWritableValueWithCallbacks<ReactElement[] | null>(
    () => null
  );
  useEffect(() => {
    let running = true;
    loadObfuscated();
    return () => {
      running = false;
    };

    async function loadObfuscated() {
      if (!running) {
        return;
      }
      if (partsVWC.get() !== null) {
        return;
      }
      const keyString = '77982c9da8fb58dee1945236a1de8529';
      const encryptedValueString =
        '57d2be6e29ee8bd44b5ed607a7c7f17af2c8ef537521e5f86c8a94c78beb05328ad35f3803ed37ad5ec0';

      const key = new Uint8Array(
        keyString.match(/.{2}/g)!.map((byte) => parseInt(byte, 16))
      );
      const encryptedValue = new Uint8Array(
        encryptedValueString.match(/.{2}/g)!.map((byte) => parseInt(byte, 16))
      );
      const loadedKey = await window.crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-CTR' },
        false,
        ['encrypt', 'decrypt']
      );
      if (!running) {
        return;
      }
      const decryptedValue = await window.crypto.subtle.decrypt(
        { name: 'AES-CTR', counter: new Uint8Array(16), length: 64 },
        loadedKey,
        encryptedValue
      );
      if (!running) {
        return;
      }

      const value = new Uint8Array(decryptedValue);
      const noise = value.slice(value.length / 2);
      const encodedValueXORNoise = value.slice(0, value.length / 2);

      const parts: ReactElement[] = [];
      for (let i = 0; i < encodedValueXORNoise.length; i++) {
        parts.push(
          <span key={i} style={{ order: i }}>
            {String.fromCharCode(encodedValueXORNoise[i] ^ noise[i])}
          </span>
        );
      }

      // fisher-yates shuffle
      for (let i = parts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [parts[i], parts[j]] = [parts[j], parts[i]];
      }

      if (!running) {
        return;
      }
      setVWC(partsVWC, parts);
    }
  }, [partsVWC]);
  return (
    <WithVWC
      value={partsVWC}
      component={(parts) =>
        parts === null ? <></> : <div className={LAYOUT.row}>{parts}</div>
      }
    />
  );
};

(window as any).generateNewObfuscatedValue = async (value: string) => {
  const encodedValue = new TextEncoder().encode(value);
  const noise = window.crypto.getRandomValues(
    new Uint8Array(encodedValue.length)
  );

  const encodedValueXORNoise = new Uint8Array(encodedValue.length);
  for (let i = 0; i < encodedValue.length; i++) {
    encodedValueXORNoise[i] = encodedValue[i] ^ noise[i];
  }
  const valueToEncrypt = new Uint8Array(encodedValue.length + noise.length);
  valueToEncrypt.set(encodedValueXORNoise);
  valueToEncrypt.set(noise, encodedValue.length);

  const key = (await window.crypto.subtle.generateKey(
    { name: 'AES-CTR', length: 128 },
    true,
    ['encrypt', 'decrypt']
  )) as CryptoKey;
  const encryptedValue = await window.crypto.subtle.encrypt(
    { name: 'AES-CTR', counter: new Uint8Array(16), length: 64 },
    key,
    valueToEncrypt
  );

  const keyExport = await window.crypto.subtle.exportKey('raw', key);
  const keyArray = new Uint8Array(keyExport);
  const keyString = Array.from(keyArray)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  const encryptedValueArray = new Uint8Array(encryptedValue);
  const encryptedValueString = Array.from(encryptedValueArray)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  const parts: string[] = [];
  parts.push(`const keyString = '${keyString}';`);
  parts.push(`const encryptedValueString = '${encryptedValueString}';`);
  return parts.join('\n');
};
