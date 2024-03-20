import { Stories } from '../../componants/stories/Stories';
import { Posts } from '../../componants/posts/Posts';
import { Share } from '../../componants/share/Share';
import './home.scss';

export const Home=()=>{
    return (
        <div className="home">
            <Stories/>
            <Share/>
            <Posts/>
        </div>
    );
}