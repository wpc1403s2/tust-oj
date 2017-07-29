/**
 * Created by wpc on 2017/7/26.
 */
import React , {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';
import Validation from 'util/validation';

let propTypes = {
    signInAjax: PT.func,
    signInMsg: PT.object
};



export default class SignInPanel extends Component{

    constructor(props){
        super(props);
        this.state={
            userId:'',
            userPwd:'',
            nameErr:false,
            pwdErr:false
        }

        this.validator = new Validation();

        this.validator.addByValue('userId',[
            {strategy:'isEmpty',errorMsg:'用户名不能为空'},
        ]);

        this.validator.addByValue('userPwd',[
            {strategy:'isEmpty',errorMsg:'密码不能为空'},
            {strategy: 'minLength:6', errorMsg: '最小长度为6'}
        ]);
        this.nameChange = this.nameChange.bind(this);
        this.pwdChange = this.pwdChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    nameChange(ev){
        let {target}=ev;

        let msg = this.validator.valiOneByValue('userId', target.value);

        this.setState({
            userId:target.value,
            nameErr:msg
        });
    }

    pwdChange(ev){
        let {target} = ev;
        let msg = this.validator.valiOneByValue('userPwd', target.value);
        this.setState({
            userPwd: target.value,
            pwdErr: msg
        });
    }
    onSubmit(ev){
        ev.preventDefault();
        ev.stopPropagation();

        let {validator} = this;

        let {nameDom, pwdDom} = this.refs;

        let nameErr = this.validator.valiOneByValue('userId', nameDom.value);

        let pwdErr = this.validator.valiOneByValue('userPwd', pwdDom.value);

        this.setState({
            nameErr,pwdErr
        });

        if( !nameErr && !pwdErr ){
            console.log('befor ajax ');
            this.props.signInAjax({
                userId: nameDom.value,
                userPwd: pwdDom.value
            });

        }
    }


    render(){

        let {nameChange, pwdChange, onSubmit} = this;

        let {userId, userPwd, pwdErr, nameErr} = this.state;

        let {signInMsg}=this.props;

        let resInfo = null;

        if(signInMsg&&signInMsg.status!==1){
            resInfo=(
                <div className="ui message error">
                    <p>{signInMsg.msg}</p>
                </div>
            )
        }

        let nameErrMsg = nameErr ? (<p className={S.err}>{nameErr}</p>) : null;

        let pwdErrMsg = pwdErr ? (<p className={S.err}>{pwdErr}</p>) : null;

        return (
            <div className={S.sign_panel}>
                {resInfo}
                <form
                    className="ui form"
                    onSubmit={onSubmit}
                >
                    <div className={`field ${nameErr?'error':''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            ref="nameDom"
                            value={userId}
                            onChange={nameChange}
                        />
                        {nameErrMsg}
                    </div>

                    <div className={`field ${pwdErr?'error':''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            value={userPwd}
                            onChange={pwdChange}
                            ref="pwdDom"
                        />
                        {pwdErrMsg}
                    </div>

                    <div className="field">
                        <button type="submit"
                                className="ui button fluid primary"
                        >登录</button>
                    </div>
                </form>
            </div>
        );
    }
}
