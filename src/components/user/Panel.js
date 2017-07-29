/**
 * Created by wpc on 2017/7/26.
 */
import {NavLink} from 'react-router-dom';
import style from './style.scss';

export default function Panel({children}){

    return (
        <div className="ui stackable grid container center aligned">
            <div className={`six wide column ${style.main}`}>
                <h4 className={style.title}>
                    <div className={style['normal-title']}>
                        <NavLink to="/sign_in"
                                 activeClassName={style.active}
                        >登录</NavLink>
                        <b>·</b>
                        <NavLink to="/sign_up"
                                 activeClassName={style.active}
                        >注册</NavLink>
                    </div>
                </h4>
                {children}
            </div>
        </div>
    );
}