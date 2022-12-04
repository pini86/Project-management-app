import 'i18next';
import ru from 'locales/ru/translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      ru: typeof ru;
    };
  }
  interface CustomPluginOptions {
    backend?: BackendOptions;
    detection?: DetectorOptions;
  }
}
