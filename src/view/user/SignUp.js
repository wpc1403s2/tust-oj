/**
 * Created by wpc on 2017/7/26.
 */
import SignUpPanel from 'components/user/SignUpPanel';
import EntryPanel from 'components/user/Panel';

export default class extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <EntryPanel >
                <SignUpPanel />
            </EntryPanel>
        );
    }
}
