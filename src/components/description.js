import React from 'react';

import { useStateValue } from '../state';
import Link from './link';

export default function Description() {
  const [{ config }] = useStateValue();

  return (
    <>
      Visualizando ubicaciones, fork de <Link link="GOOGLE_GLOBE_TRENDS_GITHUB">google-globe-trends</Link>
    </>
  );
}
