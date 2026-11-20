import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { buildQRPayload } from '../utils/payloadBuilder';

const PREVIEW_SIZE = 280;

/**
 * Owns the single QRCodeStyling instance: builds it on mount, patches it on every
 * payload or style change, and exposes the instance for download / clipboard export.
 */
export function useQRCode({ activeTab, payloadData, styleOptions }) {
  const hostRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const instance = new QRCodeStyling({
      width: PREVIEW_SIZE,
      height: PREVIEW_SIZE,
      type: 'svg',
      data: buildQRPayload(activeTab, payloadData),
      margin: styleOptions.margin,
      qrOptions: { errorCorrectionLevel: styleOptions.errorCorrectionLevel },
      dotsOptions: { color: styleOptions.fgColor, type: styleOptions.dotType },
      backgroundOptions: { color: styleOptions.bgColor },
      cornersSquareOptions: { color: styleOptions.fgColor, type: styleOptions.cornerSquareType },
      cornersDotOptions: { color: styleOptions.fgColor, type: styleOptions.cornerDotType },
      imageOptions: { crossOrigin: 'anonymous', margin: 6, imageSize: styleOptions.logoSize },
    });

    instanceRef.current = instance;
    if (host) {
      host.innerHTML = '';
      instance.append(host);
    }

    return () => {
      instanceRef.current = null;
      if (host) host.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const instance = instanceRef.current;
    if (!instance) return;

    const effectiveECL =
      activeTab === 'image' ? 'L' : styleOptions.logoUrl ? 'H' : styleOptions.errorCorrectionLevel;

    instance.update({
      data: buildQRPayload(activeTab, payloadData),
      margin: styleOptions.margin,
      image: styleOptions.logoUrl || undefined,
      qrOptions: { errorCorrectionLevel: effectiveECL },
      dotsOptions: { color: styleOptions.fgColor, type: styleOptions.dotType },
      backgroundOptions: { color: styleOptions.bgColor },
      cornersSquareOptions: { color: styleOptions.fgColor, type: styleOptions.cornerSquareType },
      cornersDotOptions: { color: styleOptions.fgColor, type: styleOptions.cornerDotType },
      imageOptions: { crossOrigin: 'anonymous', margin: 6, imageSize: styleOptions.logoSize },
    });
  }, [activeTab, payloadData, styleOptions]);

  return { hostRef, instanceRef };
}
