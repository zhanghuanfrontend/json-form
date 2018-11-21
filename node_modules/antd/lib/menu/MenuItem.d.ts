import * as React from 'react';
import * as PropTypes from 'prop-types';
declare class MenuItem extends React.Component<any, any> {
    static contextTypes: {
        inlineCollapsed: PropTypes.Requireable<boolean>;
    };
    static isMenuItem: number;
    context: any;
    private menuItem;
    onKeyDown: (e: React.MouseEvent<HTMLElement>) => void;
    saveMenuItem: (menuItem: any) => void;
    render(): JSX.Element;
}
export default MenuItem;
