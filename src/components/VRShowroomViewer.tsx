/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";

export default function VRShowroomViewer() {
  return (
    <div className="w-full" id="vr-showroom-section">
      {/* Main Viewport Container */}
      <div className="relative w-full aspect-video bg-[#050608] border border-white/10 overflow-hidden shadow-2xl">
        <iframe
          src="https://www.youtube-nocookie.com/embed/CQhLsQdad98?autoplay=1&mute=1&loop=1&playlist=CQhLsQdad98&controls=1&rel=0"
          className="w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Zeta Estudio VR 360 Tour"
        />
      </div>
    </div>
  );
}
