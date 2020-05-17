import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

/*
class Player extends Component {
    // constructor(props) {
    //   super(props);
    //   this.player = React.createRef();
    // }
    // componentDidMount () {
    //     this.player = this.getCurrentTime();
    // }
    render () {
        return(
            <div className = "player-test">
                <ReactPlayer className = "react-player"
                    // ref={this.player}
                    url='https://www.youtube.com/watch?v=uuGtrxDsrws'
                    playing
                    width= '50%'
                    height= '200px'
                />
                <div>
                    {this.player}
                </div>
    
            </div>
        )
    }  
}
*/

// var test2 = 2;
// var test = 0;
// var player_ref = 0;
// var temp = 0;
    
    // function recheck () {
    //     test1 = player_ref.current.getCurrentTime();
    //     test2 = 2;
    // }
    // function interval(){
    //     if (player_ref.current){
    //         test = player_ref.current.getCurrentTime();
    //         test = Math.floor(player_ref.current.getCurrentTime());
            
    //     }
        
    //     console.log(test);
    //     console.log(test2);
    //     if(test === test2){
    //         console.log(test);
    //         console.log(test2);
    //         temp = 1;
            // const element = (
            // <div>
            //     test@!$!$!#$%%@%@%#@%@#!!$!$#!$
            //     @!#@!#@!#@$!$#!$!$#!@$!@$@!$@!#!@#
            //     !@$@!$!@#!@#@!#@!#@!$!#$#!$#!$@!$!@
            // </div>
            // );
            // console.log ("sibal");
        //     return (
        //         <div className = "player-test">
        //             {/* <ReactPlayer className="react-player"
        //                 ref={player_ref}
        //                 url='https://www.youtube.com/watch?v=uuGtrxDsrws'
        //                 playing
        //                 width= '50%'
        //                 height= '200px'
        //             /> */}
        //             {/* { test1 = player_ref.current.getCurrentTime()} */}
        //             {/* <button onClick={setInterval(interval,1000)}> */}
        //                 {/* test */}
        //             {/* </button> */}
        //             {/* <button onClick={() => {
        //                 alert(player_ref.current.getCurrentTime());
        //             }}>
        //                 test
        //             </button> */}
        //             {/* {condRend()} */}
        //             <div>dfdfdsfds</div>
        //         </div>
        //     );
        // }
        // return(
        //     <div>
        //         <div className = "player-test">
        //             <ReactPlayer className="react-player"
        //                 ref={player_ref}
        //                 url='https://www.youtube.com/watch?v=uuGtrxDsrws'
        //                 playing
        //                 width= '50%'
        //                 height= '200px'
        //             />
                    {/* { test= player_ref.current.getCurrentTime()} */}
                    {/*<button onClick={()=>setInterval(interval,1000)}>
                        test
                    </button>
                    <button onClick={() => {
                        alert(player_ref.current.getCurrentTime());
                    }}>
                        test
                    </button>  */}
    //             </div>
    //         </div>
    //     )
    // };
    // interval()
    // return (
    //   <div>
    //     <button onClick = {() => interval()}>func </button>
    //   </div>
    // );
    // if (compint === 1){
    //     return (
    //         <div className = "player-test">
    //             <ReactPlayer className="react-player"
    //                 ref={player_ref}
    //                 url='https://www.youtube.com/watch?v=uuGtrxDsrws'
    //                 playing
    //                 width= '50%'
    //                 height= '200px'
    //             />
    //             {/* { test1 = player_ref.current.getCurrentTime()} */}
    //             <button onClick={setInterval(interval,1000)}>
    //                 test
    //             </button>
    //             {/* <button onClick={() => {
    //                 alert(player_ref.current.getCurrentTime());
    //             }}>
    //                 test
    //             </button> */}
    //             <div>
    //                 필터링 되었습니다.
    //             </div>
    //         </div>
    //     );
    // }
    // if(compint === 0) {
    //     {console.log(compint)}
    // function render(){
    //     sibural()
    //     return (
            
    //         <div className = "player-test">
    //             <ReactPlayer className="react-player"
    //                 ref={player_ref}
    //                 url='https://www.youtube.com/watch?v=uuGtrxDsrws'
    //                 playing
    //                 width= '50%'
    //                 height= '200px'
    //             />
    //             {/* { test1 = player_ref.current.getCurrentTime()} */}
    //             {/* <button onClick={setInterval(interval,1000)}>
    //                 test
    //             </button> */}
    //             {/* <button onClick={() => {
    //                 alert(player_ref.current.getCurrentTime());
    //             }}>
    //                 test
    //             </button> */}

    //             <div>
    //                 {temp}
    //             </div>
    //         </div>
    //     );  
    //     }   
    // return(
    //     <div>
    //         dddd
    //     </div>
    // )
    // }
    // setInterval(interval, 1000);
    // setInterval(recheck, 1000);

const Player = () => {
    const player_ref = useRef();
    const [condition, setCondition] = useState(false);
    const [time, setTime] = useState(0);
    useEffect(() => {
        const comp_sec = 3 // random number for test
        
        const interval_func = setInterval(() => { // this is timer func
            const cur_time = player_ref.current.getCurrentTime();
            
            if(parseInt(cur_time) === comp_sec) {
                setCondition(true);
                setTime(comp_sec);
                setTimeout(() => { 
                    setCondition(false);
                    setTime(0);
                }, 5000);
                clearInterval(interval_func) // clear interval
            }
        }, 1000)
    }, [])
    return(
        <div className = "player-test">
                <ReactPlayer className = "react-player"
                    ref={player_ref}
                    url='https://www.youtube.com/watch?v=uuGtrxDsrws'
                    playing
                    width= '50%'
                    height= '200px'
                />
                {condition ? <div>{time}</div> : null}
            </div>
    )
}
// ReactDOM.render(element, document.getElementById('root'));

export default Player;
