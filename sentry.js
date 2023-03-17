import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://d342784df9414b14afe7ce5934da6dc8@o4504856276828160.ingest.sentry.io/4504856295571456',
  enableInExpoDevelopment: true,
  debug: true,
});

export default Sentry;
