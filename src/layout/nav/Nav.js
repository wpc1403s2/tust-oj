/**
 * Created by wpc on 2017/7/11.
 */
import { Link, NavLink} from 'react-router-dom';
import S from './style.scss';

let propTypes={
	myInfo:PT.object
}

export default function Nav(prop) {

    let {myInfo} = props;

    let userLink = null;

    if(myInfo){
        userLink = (<NavLink
			to="/my_page"
			className={`item`}
			activeClassName="active"
		>
			<div className={S.dropDown}>
				<p>注销</p>

			</div>
			</NavLink>
			);
			}
	else{
    	userLink=[
			(
				<NavLink to="/sign_in"
						 className={`ui black basic button`}
						 activeClassName="active"
				>登录</NavLink>
			),
			(
				<NavLink to="/sign_up"
						 className={`ui black basic button`}
						 activeClassName="active"
				>注册</NavLink>
			)
		]
	}
			return (
			<div className={`${S.nav}`}>
				<div className="ui container">
					<div className="ui large secondary menu">
						<NavLink exact to="/"
								 className={`item`}
								 activeClassName={S.active}
						>首页</NavLink>
						<NavLink to="/help"
								 className={`item`}
								 activeClassName={S.active}
						>帮助文档</NavLink>
						<NavLink to="/news"
								 className={`item`}
								 activeClassName={S.active}
						>新闻</NavLink>

						<NavLink to="/discuss"
								 className={`item`}
								 activeClassName={S.active}
						>讨论</NavLink>
						<NavLink to="/competition"
								 className={`item`}
								 activeClassName={S.active}
						>竞赛</NavLink>
						<NavLink to="/test_library"
								 className={`item`}
								 activeClassName={S.active}
						>赛题</NavLink>
						<NavLink to="/notice"
								 className={`item`}
								 activeClassName={S.active}
						>公告</NavLink>
						<div className="right item">
							{userLink}
						</div>

					</div>
				</div>
				<div className={`sizer ${S.left}`}>
					<div className={`ui huge white header ${S.white}`}>TUST</div>
				</div>
			</div>

			);

			};
Nav.propTypes = propTypes;