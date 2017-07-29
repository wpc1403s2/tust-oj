/**
 * Created by wpc on 2017/7/26.
 */
import React, {Component} from 'react';
import S from './style.scss';

export default class Footer extends Component {
    render() {
        return (
            <div className={`ui vertical ${S.footer}`}>
                <div className="ui container">
                    <p>关于我们</p>
                </div>
            </div>
        )
    }
}