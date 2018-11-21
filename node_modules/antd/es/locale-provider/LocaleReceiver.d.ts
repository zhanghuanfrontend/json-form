import * as React from 'react';
import * as PropTypes from 'prop-types';
export interface LocaleReceiverProps {
    componentName: string;
    defaultLocale: object | Function;
    children: (locale: object, localeCode?: string) => React.ReactElement<any>;
}
export interface LocaleReceiverContext {
    antLocale?: {
        [key: string]: any;
    };
}
export default class LocaleReceiver extends React.Component<LocaleReceiverProps> {
    static contextTypes: {
        antLocale: PropTypes.Requireable<object>;
    };
    context: LocaleReceiverContext;
    getLocale(): any;
    getLocaleCode(): any;
    render(): React.ReactElement<any>;
}
