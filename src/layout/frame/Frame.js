/*
/!**
 * Created by wpc on 2017/7/26.
 *!/
import {Route} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home.js';
import SignUp from 'view/user/SignUp';
import SignIn from 'view/user/SignIn';
import Footer from 'view/footer/Footer'
import S from './style.scss';
import cfg from 'config/config.json';


export default class Frame extends React.Component{
    constructor(props){
        super(props);
        this.state={
            myInfo:null,
            signInMsg:null
        };

        this.signInAjax = this.signInAjax.bind(this);
    }

    signInAjax(reqDate){
        $.post(`${cfg.url}/user/login`,reqDate)
            .done(ret=>{
                console.log(ret)
                let {msg,status, token} = ret;
                if(status===1){

                }else{
                    this.setState({signInAjax: ret});
                }

            })
    }

    render(){

        let {signInAjax} = this;

        let {signInMsg} = this.state;

        return (
            <div className={S.layout}>
                <Nav/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render={
                    (props)=>(
                        <SignIn
                            {...{
                                signInAjax,
                                signInMsg
                            }

                            }
                        />
                    )
                }/>
                <Route exact path="/sign_up" component={SignUp}/>
                <Footer/>
            </div>
        );
    }
}*/
import {Route,Redirect} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home.js';
import SignUp from 'view/user/SignUp';
import SignIn from 'view/user/SignIn';

import cfg from 'config/config.json';

import S from './style.scss';

export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            myInfo: null,
            signInMsg: null,
            hasLoginReq: false

        };

        this.signInAjax = this.signInAjax.bind(this);
        this.clearLoginMsg = this.clearLoginMsg.bind(this);
        this.initMyInfo = this.initMyInfo.bind(this);
    }

    initMyInfo(myInfo){
        this.setState({myInfo});
    }

    clearLoginMsg(){
        this.setState({
            signInMsg:null,
        })
    }

    signInAjax(reqData){
        $.post(`${cfg.url}/user/login`, reqData)
            .done(ret=>{
                console.log(ret);
                let {status, userId} = ret;



                if(status===1){
                    this.initMyInfo(ret.userId);
                }else{
                    this.setState({signInMsg: ret});
                }

            });
    }

    render(){

        let {signInAjax,clearLoginMsg} = this;

        let {signInMsg,myInfo} = this.state;

        return (
            <div className={S.layout}>
                <Nav
                    {...{
                        myInfo
                        }}
                />
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render={
                    (props)=>(
                        <SignIn
                            {...{
                                signInAjax,
                                signInMsg,
                                clearLoginMsg
                            }}
                        />
                    )
                }/>
                <Route exact path="/sign_up" component={SignUp}/>
            </div>
        );
    }
}

