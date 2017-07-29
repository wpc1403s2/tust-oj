/**
 * Created by wpc on 2017/7/26.
 */
import React , {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';

import Validation from 'util/validation';

export default class SignUpPanel extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            pwd: '',
            cfPwd: '',
            nameErr: false,
            pwdErr: false,
            cfPwdErr: false
        }

        this.validator = new Validation();
        this.validator.addByValue('username',[
            {strategy: 'isEmpty', errorMsg: '用户名不能是空'},
        ]);

        this.validator.addByValue('pwd',[
            {strategy: 'isEmpty', errorMsg: '密码不能是空'},
            {strategy: 'minLength:6', errorMsg: '密码最小长度为6'},
        ]);

        this.nameChange = this.nameChange.bind(this);
        this.pwdChange = this.pwdChange.bind(this);
        this.cfPwdChange = this.cfPwdChange.bind(this);

    }


    nameChange(ev){
        let {target} = ev;

        let msg = this.validator.valiOneByValue('username', target.value);

        console.log(msg);

        this.setState({
            username: target.value,
            nameErr: msg
        });

    }

    pwdChange(ev){
        let {target} = ev;

        let msg=this.validator.valiOneByValue('pwd',target.value);

        console.log(msg);

        let {cfPwdErr} = this.state;

        this.setState({
            pwd: target.value,
            pwdErr:msg
        });

        if(cfPwdErr){
            this.cfPwdChange();
        }
    }

    cfPwdChange(){
        let {pwdDom, cfPwdDom} = this.refs;

        let cfPwdErr = pwdDom.value === cfPwdDom.value ? '' : "密码不一致";

        this.setState({
            cfPwd:cfPwdDom.value,
            cfPwdErr
        })

    }


    render(){

        let {
            nameErr,
            pwdErr,
            cfPwdErr,
            username,
            pwd,
            cfPwd
        } = this.state;

        let {nameChange, pwdChange, cfPwdChange} = this;

        let nameErrMsg = nameErr ? (<p className={S.err}>{nameErr}</p>) : null;

        let pwdErrMsg = pwdErr ? (<p className={S.err}>{pwdErr}</p>) : null;

        let cfPwdErrMsg = cfPwdErr ? (<p className={S.err}>{cfPwdErr}</p>) : null;


        return (
            <div className={S.sign_panel}>
                <form
                    className="ui form"
                >
                    <div className={`field ${nameErr?'error':''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            value={username}
                            onChange={nameChange}
                            ref="nameDom"
                        />
                        {nameErrMsg}
                    </div>
                    <div className={`field ${pwdErr?'error':''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            value={pwd}
                            onChange={pwdChange}
                            ref="pwdDom"
                        />
                        {pwdErrMsg}
                    </div>
                    <div className={`field ${cfPwdErr?'error':''}`}>
                        <input
                            type="text"
                            placeholder="确认密码"
                            value={cfPwd}
                            onChange={cfPwdChange}
                            ref="cfPwdDom"
                        />
                        {cfPwdErrMsg}
                    </div>
                    <div className="field">
                        <button type="submit"
                                className="ui button fluid primary"
                        >注册</button>
                    </div>
                </form>
            </div>
        );
    }
}
