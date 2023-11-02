import React from 'react';

import Button from './button';
import Fade from './fade';
import Link from './link';

export default function About({ onHide, show }) {
  return (
    <Fade className="about" show={show}>
      <div className="about-content">
        <h2>About</h2>
        <p>
          <Link link="GITHUB_REPO">Eperdemic Frontier</Link> es un proyecto para la materia de
          Estrategias de Persistencia. Este es un fork de{' '}
          <Link link="GOOGLE_GLOBE_TRENDS_GITHUB">google-globe-trends</Link>.
        </p>
        <Button label="Back" onClick={onHide} />
      </div>
    </Fade>
  );
}
